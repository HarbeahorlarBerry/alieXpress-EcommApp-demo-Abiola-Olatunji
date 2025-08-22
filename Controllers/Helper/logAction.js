import systemLog from "../../Models/systemLog.js";

export const logAction = async (req, action, details = "", meta = {}) => {
  try {
    await systemLog.create({
      action,
      performedBy: req.user ? req.user._id : null,
      details,
      ipAddress: req.headers["x-forwarded-for"]?.split(",")[0].trim() || req.ip,
      meta
    });
  } catch (error) {
    // IMPORTANT: don't throw — logging failures shouldn't break the main flow
    console.error("Failed to write system log:", error.message);
  }
};
