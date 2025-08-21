<<<<<<< HEAD
import multer from "multer";
import path from "path";
import fs from "fs";

function getFolderByItsMimeType(mimetype) {
  if (mimetype.startsWith("image/")) return "uploads/images";
  if (mimetype === "application/pdf") return "uploads/pdfs";
  if (mimetype === "application/msword") return "uploads/docs";
  if (
    mimetype ===
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
  )
    return "uploads/docs";
  if (mimetype === "application/vnd.ms-excel") return "uploads/excels";
  if (
    mimetype ===
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
  )
    return "uploads/excels";
  if (mimetype === "application/zip") return "uploads/zips";

  // ✅ Always fallback
  return "uploads/others";
}

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const dynamicFolder = getFolderByItsMimeType(file.mimetype);

    // ✅ Make sure all parent folders exist
    if (!fs.existsSync(dynamicFolder)) {
      fs.mkdirSync(dynamicFolder, { recursive: true }); // <--- fix
    }

    //otherwise, save the file
    cb(null, dynamicFolder);
  },

  filename: function (req, file, cb) {
    const dynamicFolder = getFolderByItsMimeType(file.mimetype);

    const ext = path.extname(file.originalname);
    const safeBaseName = path.basename(file.originalname, ext).replace(/\s+/g, "_");

    const finalName = `${file.fieldname}-${Date.now()}${ext}`;

    const filePath = path.join(dynamicFolder, finalName);

    if (fs.existsSync(filePath)) {
      // ❗️ Correct: just pass the error — no `false`
      return cb(new Error("File already exists"));
    }

     //otherwise, save the file
    cb(null, finalName);
  },
});

const upload = multer({ storage });

export default upload;


=======
import multer from "multer";
import path from "path";
import fs from "fs";

function getFolderByItsMimeType(mimetype) {
  if (mimetype.startsWith("image/")) return "uploads/images";
  if (mimetype === "application/pdf") return "uploads/pdfs";
  if (mimetype === "application/msword") return "uploads/docs";
  if (
    mimetype ===
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
  )
    return "uploads/docs";
  if (mimetype === "application/vnd.ms-excel") return "uploads/excels";
  if (
    mimetype ===
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
  )
    return "uploads/excels";
  if (mimetype === "application/zip") return "uploads/zips";

  // ✅ Always fallback
  return "uploads/others";
}

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const dynamicFolder = getFolderByItsMimeType(file.mimetype);

    // ✅ Make sure all parent folders exist
    if (!fs.existsSync(dynamicFolder)) {
      fs.mkdirSync(dynamicFolder, { recursive: true }); // <--- fix
    }

    //otherwise, save the file
    cb(null, dynamicFolder);
  },

  filename: function (req, file, cb) {
    const dynamicFolder = getFolderByItsMimeType(file.mimetype);

    const ext = path.extname(file.originalname);
    const safeBaseName = path.basename(file.originalname, ext).replace(/\s+/g, "_");

    const finalName = `${file.fieldname}-${Date.now()}${ext}`;

    const filePath = path.join(dynamicFolder, finalName);

    if (fs.existsSync(filePath)) {
      // ❗️ Correct: just pass the error — no `false`
      return cb(new Error("File already exists"));
    }

     //otherwise, save the file
    cb(null, finalName);
  },
});

const upload = multer({ storage });

export default upload;


>>>>>>> 0d63b00672bda2fa831c980a89e1892c9c48ad22
