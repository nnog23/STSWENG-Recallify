const { Router } = require('express');
const cardsRouter = require('./cardsRouter.js');
const decksRouter = require('./decksRouter.js');

const router = Router();


router.get("/home", (req, res) => {
    res.redirect("/");
});

router.get("/homepage", (req, res) => {
    res.redirect("/");
});

router.use(cardsRouter);
router.use(decksRouter);

module.exports = router;