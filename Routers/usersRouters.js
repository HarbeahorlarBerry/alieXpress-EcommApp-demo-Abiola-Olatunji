import { Router as _Router } from "express";
import { createUser, getAllUsers, getAUser, editUser, deleteUser, getByqueryParams, editProfile } from "../Controllers/usersApis/barrel.js";
import { authMiddleware, adminMiddleware, altimateAdminMiddleware  } from "../Middlewares/authMiddleware.js";
import { viewLogs } from "../Controllers/logsApis/logsController.js";

const Router = _Router();


//post

Router.post('/user/create', createUser) ;

//get
Router.get("/users", authMiddleware, getAllUsers);
Router.get('/user/:id/', getAUser);
Router.get("/userByquery", getByqueryParams);

// Example: Only ultimate admins can see special logs
Router.get("/system/logs", authMiddleware, altimateAdminMiddleware, viewLogs);


//put
Router.put("/user/update/:id", authMiddleware, editUser);
Router.put("/profile/update/:id", authMiddleware, editProfile);

//delete
Router.delete("/user/delete/:id", authMiddleware, deleteUser);

// Example: Only admins can delete users
Router.delete("/user/:id", authMiddleware, adminMiddleware, deleteUser);


export default Router;