import { Router } from "express";
import { authRoutesValidation } from "../middlewares/auth.middleware.js";


const router = Router();

router.use(authRoutesValidation)
router.get("/products", getProducts);

export default router;