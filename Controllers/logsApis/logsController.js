<<<<<<< HEAD
import systemLog from "../../Models/systemLog.js";


export const viewLogs = async (req, res) => {
  // typical admin UI needs pagination and filtering
  const { page = 1, limit = 50, action, performer } = req.query;
  const filter = {};
  if (action) filter.action = action;
  if (performer) filter.performedBy = performer;

  try {
    const logs = await systemLog.find(filter)
      .populate("performedBy", "username gmail role")
      .sort({ createdAt: -1 })
      .skip((page - 1) * limit)
      .limit(Number(limit));

    const total = await systemLog.countDocuments(filter);

    res.json({ success: true, total, page: Number(page), limit: Number(limit), logs });
  } catch (err) {
    res.status(500).json({ success: false, message: "Failed to fetch logs", error: err.message });
  }
};

=======
import systemLog from "../../Models/systemLog.js";


export const viewLogs = async (req, res) => {
  // typical admin UI needs pagination and filtering
  const { page = 1, limit = 50, action, performer } = req.query;
  const filter = {};
  if (action) filter.action = action;
  if (performer) filter.performedBy = performer;

  try {
    const logs = await systemLog.find(filter)
      .populate("performedBy", "username gmail role")
      .sort({ createdAt: -1 })
      .skip((page - 1) * limit)
      .limit(Number(limit));

    const total = await systemLog.countDocuments(filter);

    res.json({ success: true, total, page: Number(page), limit: Number(limit), logs });
  } catch (err) {
    res.status(500).json({ success: false, message: "Failed to fetch logs", error: err.message });
  }
};

>>>>>>> 0d63b00672bda2fa831c980a89e1892c9c48ad22
