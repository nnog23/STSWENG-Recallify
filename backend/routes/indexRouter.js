import { Router } from 'express';
import cardsRouter from './cardsRouter.js';


const router = Router();



router.get("/home", (req, res) => {
    res.redirect("/");
});

router.get("/homepage", (req, res) => {
    res.redirect("/");
});

router.use(cardsRouter);


export default router;