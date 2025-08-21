<<<<<<< HEAD
import  router  from "express";
import upload from "../Middlewares/fileuploadMiddleware.js";

const Router = router();

Router.post("/uploadFile", upload.single("profilePic"), (req, res) => {
    console.log(req.file);
    
    if (req.file) {
        res.status(200).json({
            message: "File uploaded successfully",
            file: req.file,
        });
    } else {
        res.status(400).json({
            message: "No file uploaded"
        });
    }
});

=======
import  router  from "express";
import upload from "../Middlewares/fileuploadMiddleware.js";

const Router = router();

Router.post("/uploadFile", upload.single("profilePic"), (req, res) => {
    console.log(req.file);
    
    if (req.file) {
        res.status(200).json({
            message: "File uploaded successfully",
            file: req.file,
        });
    } else {
        res.status(400).json({
            message: "No file uploaded"
        });
    }
});

>>>>>>> 0d63b00672bda2fa831c980a89e1892c9c48ad22
export default Router;