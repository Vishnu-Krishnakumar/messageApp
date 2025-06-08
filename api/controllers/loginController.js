require("dotenv").config();
const bcrypt = require("bcryptjs");
const queries = require("../database/db");
const jwt = require("jsonwebtoken");
const { v4: uuidv4 } = require('uuid');

async function register(req, res) {
  const user = await createUser(req.body);
  console.log(user);
  let created = '';
  try {
    created = await queries.createUser(user);
    console.log(created);
    res.status(201).json({
      message:"Created user!"
    })
  } catch (error) { 
    if(error.code === "P2002"){
      res.status(400).json({
        message:"Someone with this email is already registered!",
        error: error,
      })
    }  
 }
}

async function login(req, res) {
    const found = await queries.userLookUp(req.body);
    if (found === null) return res.sendStatus(403);
    const user = {
      id: found.id,
      email: found.email,
    };
    console.log(user);
    if (found !== null) {
      try {
        jwt.sign({ user: user }, process.env.secret,{ expiresIn: '1h' }, (err, token) => {
          res.cookie("auth_jwt", token, {
            httpOnly: true,
            secure: true,
            sameSite: "None",
            maxAge: 60 * 60 * 1000,
          });
          res.json({
            token,
          });
        });
      } catch (error) {
        console.log(error);
        next(error);
      }
    } else res.sendStatus(403);
  }



async function createUser(body) {
  const hashedPassword = await bcrypt.hash(body.password, 10);
  
  const user = {
    firstname: body.firstname,
    lastname: body.lastname,
    email: body.email,
    password: hashedPassword,
  };
  return user;
}

module.exports ={
    register,
    login,
}