const router = require("express").Router();
const usersRoutes = require("./users");
const scrapeRoutes = require("./scrape.js");
const resourcesRoutes = require("./resources");
const jobsRoutes = require("./jobs");
const accomplishmentsRoutes = require("./accomplishments");
const technologiesRoutes = require("./technologies");

router.use("/users", usersRoutes);
router.use("/scrape", scrapeRoutes);
router.use("/resources", resourcesRoutes);
router.use("/jobs", jobsRoutes);
router.use("/accomplishments", accomplishmentsRoutes);
router.use("/technologies", technologiesRoutes);

module.exports = router;
