import ApiResponse from "../../common/utils/api.response.js";
import Apierror from "../../common/utils/api.error.js";
import * as service from "./auth.service.js";

// const register = async (req, res) => {
//   try {
//     const user = await service.register(req.body);

//     ApiResponse.created(res, "registeration success", user);

//   } catch (error) {
//     console.error("REGISTER ERROR:", error);

//     res.status(400).json({
//       success: false,
//       error: error.message || "Something went wrong"
//     });
//   }
// };

const register = async (req, res) => {
  try {
    const { user } = await service.register(req.body);
    ApiResponse.created(
      res,
      "Registration successful. Please verify your email.",
      user,
    );
  } catch (error) {
    res.status(400).json({
      success: false,
      error: error.message,
    });
  }
};

const logout = async (req, res) => {
  await service.logOut(req.user.id);
  res.clearCookie("refreshtoken");
  ApiResponse.ok(res, "Logout Success");
};
const getMe = async (req, res) => {
  const user = await service.getMe(req.user.id);
  ApiResponse.ok(res, "user Profile", user);
};

const verifyEmail = async (req, res) => {
  await service.verifyEmail(req.params.token);
  // Apierror.badRequest("Invalid or expired verification token");
  ApiResponse.ok(res, "Email verified successfully");
};

const login = async (req, res) => {
  try {
    const { user, accessToken, refreshToken } = await service.login(req.body);

    // 🍪 Access token cookie
    res.cookie("accessToken", accessToken, {
      httpOnly: true,
      secure: false, // true in production (HTTPS)
      maxAge: 7 * 60 * 60 * 1000,
    });

    // 🍪 Refresh token cookie (RAW)
    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: false,
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    // 📦 Response
    ApiResponse.ok(res, "Login successful", {
      user,
      accessToken,
      refreshToken,
    });
  } catch (err) {
    console.error("LOGIN ERROR:", err);

    res.status(500).json({
      message: err?.message || "Something went wrong",
    });
  }
};

export { register, login, logout, getMe, verifyEmail };
