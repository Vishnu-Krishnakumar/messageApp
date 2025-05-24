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

async function createMessage(message){
  const created = await prisma.message.create({
    data:{
      message:message.message,
      sender:message.sender,
      receiever:message.receiver,
    }
  })
  return created;
}

async function findMessages(data){
  const messages = await prisma.message.findMany({ 
    data:{
      where:{
        receiver: data.id, 
      }
    }
  })
}

  module.exports ={
    createUser,
    createMessage,
    findMessages,
    userLookUp,
  }