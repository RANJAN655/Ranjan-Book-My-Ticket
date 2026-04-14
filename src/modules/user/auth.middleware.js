import apierror from "../../common/utils/api.error.js";
import { verifyAccessToken } from "../../common/utils/jwt.utils.js";
import User from "./auth.model.js";

const authonation = async (req, res, next) => {
  let token;

  if (req.headers.authorization?.startsWith("Bearer")) {
    token = req.headers.authorization.split(" ")[1];
  } else if (req.cookies?.accessToken) {
    token = req.cookies.accessToken;
  }

  if (!token) throw apierror.unauthorized("Not authorized");

  const decode = verifyAccessToken(token);

  const user = await User.findById(decode.id);
  if (!user) throw apierror.unauthorized("User no longer exists");

  req.user = {
    id: user._id,
    name: user.name,
    email: user.email,
    role: user.role,
  };

  next();
};

const authorize = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      throw apierror.unauthorized("only customer ... can book seat")
    }
    next();
  };
};

export { authorize, authonation };
