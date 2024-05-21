import express from "express";
import * as pageController from "../controllers/pageController.js"


const router = express.Router();

router.route("/").get( pageController.getIndexPage)
router.route("/takvim").get(pageController.getaytakvimi)


export default router;






/* import express from "express";
import * as pageController from "../controllers/pageController.js"


const router = express.Router();

/**
 * @swagger
 * /:
 *  get:
 *      summary: Used for nowly get method is running or not
 *      description: again Used for nowly get method is running or not
 *      responses:
 *          200:
 *              description: Index page retrieved successfully
 
router.route("/").get( pageController.getIndexPage)


export default router; */