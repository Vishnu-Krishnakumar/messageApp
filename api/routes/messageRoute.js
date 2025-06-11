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
messageRoutes.post(
  "/directMessage",
  auth.passport.authenticate("jwt",{session:false}),
  messageController.directMessage
);
messageRoutes.post(
  "/retrieveHistory",
  auth.passport.authenticate("jwt",{session:false}),
  messageController.retrieveHistory
)

module.exports = messageRoutes;