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
      OR:[
        {
          senderId:data.senderId,
          receiverId:data.receiverId,
        },
        {
          senderId:data.receiverId,
          receiverId:data.senderId,
        },
      ],
    },
    orderBy:{
      createdAt:'asc',
    }
  })
  const users = await prisma.user.findMany({
    where:{
      OR:[
        {
          id:data.senderId,
        },
        {
          id:data.receiverId,
        }
      ]
    }
  })

  let userMessages =[];
  const userMap = new Map();

  for(const user of users){
    userMap.set(user.id,user.username);
  }
  
  for(const message of messages){
    userMessages.push({
      userName:userMap.get(message.senderId),
      message:message.message,
      receiverId:message.receiverId,
      senderId:message.senderId,
    })
  }

  return {userMessages};
}

  module.exports ={
    createUser,
    createMessage,
    findMessages,
    userLookUp,
    userVerify,
  }