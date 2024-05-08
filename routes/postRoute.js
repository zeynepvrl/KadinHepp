import express from "express";
import *as postController from "../controllers/postController.js"
const router = express.Router();

router.route('/createPost').post(postController.postCreate)
router.route('/:category').get(postController.getPostbyLocandCategory)
router.route('/update/:id').put(postController.postUpdate)
router.route('/delete/:id').delete(postController.postDelete)
router.route('/get/Userpost').get(postController.getActiveUserPosts)

export default router