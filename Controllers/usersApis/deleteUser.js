import User from "../../Models/usersSchema.js";
import { logAction } from "../Helper/logAction.js";

// Delete User Controller
export const deleteUser = async (req, res) => {
  const { id } = req.params; // Target user ID
  const { _id, role } = req.user; // Logged-in user info

  try {
    // Find the user to delete first
    const userToDelete = await User.findById(id);
    if (!userToDelete) {
      return res.status(404).json({ message: "User not found" });
    }

    // Authorization Logic
    if (
      id === String(_id) || // Self-delete
      role === "altimateAdmin" || // CEO power
      (role === "admin" && id !== String(_id)) // Admin can delete others
    ) {
      // Prevent Admin from deleting AltimateAdmin
      if (role === "admin" && userToDelete.role === "altimateAdmin") {
        return res.status(403).json({
          message: "Admin cannot delete an AltimateAdmin account",
        });
      }

      // Perform deletion
      await User.findByIdAndDelete(id);

      // Log the action
      await logAction(
        req,
        "User Deleted",
        `Deleted user: ${userToDelete.username} (${userToDelete._id})`
      );

      return res.status(200).json({ message: "User deleted successfully" });
    } else {
      return res
        .status(401)
        .json({ message: "You are not authorized to delete this user" });
    }
  } catch (error) {
    console.error("Delete User Error:", error);
    return res.status(500).json({ message: "Error deleting user" });
  }
};



// export const deleteUser = async (req, res) => {
//     const { id } = req.params
//     const {_id, admin} = req.user
//     if (id === _id || admin === true) {
//         try {
//             await User.findByIdAndDelete(id)
           
//            res.status(200).json({mess: 'User deleted successfully'})
//        } catch (error) {
//            res.status(500).json(error)
//        }
//     } else {
//       return res.status(401).json({ message: "You are not authorized to delete this user" })
//     }
   
// }