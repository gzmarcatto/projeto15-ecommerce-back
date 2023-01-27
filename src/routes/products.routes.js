import { Router } from "express";
import { getProducts } from "../controllers/products.controller.js";
// import { authRoutesValidation } from "../middlewares/auth.middleware.js";


const router = Router();

// router.use(authRoutesValidation)
router.get("/products", getProducts);

export default router;