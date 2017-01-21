import express from "express";
import validate from "express-validation";
import Joi from "joi";
import linkCtrl from "../controllers/links";

const router = express.Router();

const validations = {
    create: {
        body: {
            url: Joi.string().uri().required()
        }
    }
};

router.route("/")
    /** POST /links - Create new link */
    .post(validate(validations.create), linkCtrl.create);

router.route("/:linkId")
    /** GET /links/:linkId - Get link */
    .get(linkCtrl.get)

    /** DELETE /links/:linkId - Delete link */
    .delete(linkCtrl.remove);

router.param("linkId", linkCtrl.load);

export default router;