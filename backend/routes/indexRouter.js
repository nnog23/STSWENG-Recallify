import { Router } from 'express';
import cardsRouter from './cardsRouter.js';

const router = Router();


router.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});


router.get("/home", (req, res) => {
    res.redirect("/");
}); 

router.get("/homepage", (req, res) => {
    res.redirect("/");
});


router.use(cardsRouter);


// Export the router
export default router;;