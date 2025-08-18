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

export default Router;