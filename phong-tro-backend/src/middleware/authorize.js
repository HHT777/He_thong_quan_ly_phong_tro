const { rolesFor } = require("../config/roleAccess");

const authorize = (...roles) => {
  const allowedRoles = roles.flatMap((role) =>
    role.includes(".") ? rolesFor(role) : [role],
  );

  return (req, res, next) => {
    if (!req.user) {
      return res.status(401).json({
        success: false,
        message: "Chưa xác thực",
      });
    }

    if (!allowedRoles.includes(req.user.vai_tro)) {
      return res.status(403).json({
        success: false,
        message: "Bạn không có quyền truy cập chức năng này",
      });
    }

    next();
  };
};

module.exports = authorize;
