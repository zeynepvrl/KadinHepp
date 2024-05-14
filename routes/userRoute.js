import express from "express";
import *as userController from "../controllers/userController.js"   
const router = express.Router();


router.route('/register').post(userController.userCreate)          // localhost... user/router adrese post isteği gidecek       Bu adres register.ejs deki formun action işleminde çalışacak
router.route("/login").post(userController.userLogin)  
router.route("/getActiveUser").get(userController.getActiveUser)   
router.route("/editMyProfile").put(userController.userEdit)

export default router