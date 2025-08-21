

export const altimateAdminMiddleware = (req, res, next) => {
  if (!req.user || req.user.role !== "altimateAdmin") {
    return res.status(403).json({ message: "Access denied: AltimateAdmin only" });
  }
  next();
};
