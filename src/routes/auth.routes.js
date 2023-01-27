import { Router } from 'express';
import { signIn, signUp } from '../controllers/auth.controller';
import { signInBodyValidation, userSchemaValidation } from '../middlewares/auth.middleware';

const router = Router();


router.post("/sign-up", userSchemaValidation, signUp);
router.post("/sign-in", signInBodyValidation, signIn);

export default router;
