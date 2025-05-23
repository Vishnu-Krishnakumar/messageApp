const { PrismaClient, Prisma } = require("@prisma/client");
const prisma = new PrismaClient();
const bcrypt = require("bcryptjs");
require("dotenv").config();

async function createUser(user) {
  const created = await prisma.user.create({
    data:{
      firstname: user.firstname,
      lastname: user.lastname,
      email: user.email,
      password: user.password,
      author: user.author,
    },
  });
  return created;
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
  }