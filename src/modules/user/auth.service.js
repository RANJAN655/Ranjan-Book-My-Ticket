import Apierror from "../../common/utils/api.error.js";
// import ApiResponse from "../../common/utils/api.response.js";
import {
  generateAccessToken,
  generateRefreshToken,
  generateResetToken,
  verifyAccessToken,
  verifyRefreshToken,
} from "../../common/utils/jwt.utils.js";

import User from "./auth.model.js";
import crypto from "crypto";
import {
  sendVerificationEmail,
  sendResetPasswordEmail,
} from "../../common/config/email.js";



const hasevalue = (token) =>
  crypto.createHash("sha256").update(token).digest("hex");

const register = async ({ name, email, password, role }) => {
  const exist = await User.findOne({ email }).select("+password");

  if (exist) throw Apierror.conflict("Email already exists");

  const { rawToken, hashedToken } = generateResetToken();

  const user = await User.create({
    name,
    email,
    password,
    role,
    verificationToken : hashedToken,
     verificationTokenExpires: Date.now() + 10 * 60 * 1000,
  });

  //   email varifyEmail

  try {
    await sendVerificationEmail(email, rawToken);
  } catch (err) {
    console.error("Failed to send verification email:", err.message);
  }

  const userObj = user.toObject();
  delete userObj.verificationToken;
  delete userObj.password;

  return { user: userObj };
};


const login = async ({ email, password }) => {
  const user = await User.findOne({ email }).select("+password +refreshtoken");

  if (!user) throw Apierror.unauthorized("Unauthorized user");

  const isMatch = await user.comparePassword(password);
  if (!isMatch) throw Apierror.unauthorized("Invalid email and password");

  const accessToken = generateAccessToken({
    id: user._id,
    role: user.role,
  });

  // RAW refresh token
  const refreshToken = generateRefreshToken({
    id: user._id,
  });
  //store HASH in DB
  const hashed = hasevalue(refreshToken);
  user.refreshtoken = hashed;

  await user.save({ validateBeforeSave: false });

  const userObj = user.toObject();
  delete userObj.password;

  return {
    user: userObj,
    accessToken,
    refreshToken, 
  };
};

const referce = async ({ token }) => {
  if (!token) throw Apierror.unauthorized("token is required");
  const decode = verifyRefreshToken(token);

  const user = await User.findById(decode._id).select("+refreshtoken");

  if (!user) throw Apierror.unauthorized("user is not found");

  const hashe = hasevalue(token);

  if (hashe !== user.refreshtoken)
    throw Apierror.unauthorized("user is not authorize");

  const accessToken = generateAccessToken({ id: user._id, role: user.role });


  return { accessToken };
};

const logOut = async (userId) => {
  
  await User.findByIdAndUpdate(userId, { refreshtoken: null });
};

const forgetPassword = async ({ email }) => {
  const user = await User.findOne({ email }).select(
    "+password",
    "resetPasswordtoken",
    "resetpasswordExpires",
  );
  if (!user) throw Apierror.unauthorized("invalid email");

  const { rawToken, hashToken } = generateResetToken();

  user.resetPasswordtoken = hashToken;
  user.resetpasswordExpires = Date.now() + 3600000;

  // send to email and save in db

  await user.save({ validateBeforeSave: false });
};




const verifyEmail = async (token) => {
  const trimmed = String(token).trim();

  if (!trimmed) {
    throw Apierror.badRequest("Invalid or expired verification token");
  }

  const hashedToken = hasevalue(trimmed);

  const user = await User.findOneAndUpdate(
    {
      verificationToken: hashedToken,
      verificationTokenExpires: { $gt: Date.now() }, // ✅ expiry check
    },
    {
      $set: { isVerified: true },
      $unset: {
        verificationToken: 1,
        verificationTokenExpires: 1,
      },
    },
    { returnDocument: "after" }
  );

  if (!user) {
    throw Apierror.badRequest("Invalid or expired verification token");
  }

  return user;
};
const getMe = async (userId) => {
  const user = await User.findById(userId);
  if (!user) throw Apierror.unauthorized("user not found");
  return user;
};

export { register, login, referce, logOut, forgetPassword, getMe ,verifyEmail};
