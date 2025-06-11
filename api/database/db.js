const { PrismaClient, Prisma } = require("@prisma/client");
const prisma = new PrismaClient();
const bcrypt = require("bcryptjs");
require("dotenv").config();

async function createUser(user) {

  const created = await prisma.User.create({
    data:{
      username:user.email,
      email: user.email,
      password: user.password,
    },
  });

  return created;
}

async function userLookUp(user) {
  const found = await prisma.user.findFirst({
    where: {
      email: user.email,
    },
  });
  const match = await bcrypt.compare(user.password, found.password);
  if (match) return found;
  else return null;
}
async function userVerify(user) {
  const found = await prisma.user.findUnique({
    where: {
      email: user.email,
    },
  });
  console.log(found);
  return found;
}

async function createMessage(message){
  const created = await prisma.message.create({
    data:{
      message:message.message,
      senderId:message.senderId,
      receiverId:message.receiverId,
    }
  })
  return created;
}

async function findMessages(data){
  const messages = await prisma.message.findMany({ 
    where:{
      senderId: data.senderId,
      receiverId: data.receiverId, 
    }
  })
  return messages;
}

  module.exports ={
    createUser,
    createMessage,
    findMessages,
    userLookUp,
    userVerify,
  }