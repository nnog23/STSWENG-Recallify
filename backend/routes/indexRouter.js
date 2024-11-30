const { Router } = require('express');
const cardsRouter = require('./cardsRouter.js');

const router = Router();


router.get("/home", (req, res) => {
    res.redirect("/");
});

router.get("/homepage", (req, res) => {
    res.redirect("/");
});

router.use(cardsRouter);

module.exports = router;