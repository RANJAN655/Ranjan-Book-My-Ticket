import apierror from "../../common/utils/api.error.js";
import { verifyAccessToken } from "../../common/utils/jwt.utils.js";
import User from "./auth.model.js";

const authonation = async (req, res, next) => {
  try {
    let token;

    // Get tokenn.. from header  cookies
    if (req.headers.authorization?.startsWith("Bearer ")) {
      token = req.headers.authorization.split(" ")[1];
    } else if (req.cookies?.accessToken) {
      token = req.cookies.accessToken;
    }

    if (!token) {
      return next(apierror.unauthorized("Not authorized"));
    }

    const decode = verifyAccessToken(token);

    const user = await User.findById(decode.id);
    if (!user) {
      return next(apierror.unauthorized("User no longer exists"));
    }

    // Attach user to request
    req.user = {
      id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
    };

    next();
  } catch (err) {
    next(err);
  }
};

const authorize = (...roles) => {
  return (req, res, next) => {
    try {
      if (!req.user) {
        return next(apierror.unauthorized("Not authenticated"));
      }

      if (!roles.includes(req.user.role)) {
        return next(apierror.forbidden("Access denied"));
      }

      next();
    } catch (err) {
      next(err);
    }
  };
};

export { authorize, authonation };
