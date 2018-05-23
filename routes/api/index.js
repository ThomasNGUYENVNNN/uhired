const router = require("express").Router();
const usersRoutes = require("./users");
const resourcesRoutes = require("./resources");
const technologies = require("./technologies");

// Tehnology routes
router.use("/users", usersRoutes);
router.use("/resources", resourcesRoutes);
router.use("/technologies", technologies);

module.exports = router;
