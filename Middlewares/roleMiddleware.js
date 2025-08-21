<<<<<<< HEAD


export const altimateAdminMiddleware = (req, res, next) => {
  if (!req.user || req.user.role !== "altimateAdmin") {
    return res.status(403).json({ message: "Access denied: AltimateAdmin only" });
  }
  next();
};
=======


export const altimateAdminMiddleware = (req, res, next) => {
  if (!req.user || req.user.role !== "altimateAdmin") {
    return res.status(403).json({ message: "Access denied: AltimateAdmin only" });
  }
  next();
};
>>>>>>> 0d63b00672bda2fa831c980a89e1892c9c48ad22
