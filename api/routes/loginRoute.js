const { Router } = require("express");
const loginRoutes = Router();
const userController = require("../controllers/loginController");
const auth = require("../auth/auth");
const validation = require("../validation/validation")

loginRoutes.post("/register",validation, userController.register);
loginRoutes.post("/login", userController.login);


module.exports =loginRoutes;