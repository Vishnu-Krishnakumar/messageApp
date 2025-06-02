const {Router} = require ("express");
const messageRoutes = Router();
const auth = require("../auth/auth");
const messageController = require("../controllers/messageController")

messageRoutes.get("/connect",messageController.connectUsers);
messageRoutes.get(
  "/test",
  auth.passport.authenticate("jwt",{session:false}),
  messageController.test 
);
module.exports = messageRoutes;