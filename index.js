import express from "express";
import bodyParser from "body-parser";
import { createReadStream } from "fs";
import http from "http";
import crypto from "crypto";
import m from "mongoose";
import UserModel from "./models/user.js";

import appSrc from "./app.js";
const User = UserModel(m);

const app = appSrc(
  express,
  bodyParser,
  createReadStream,
  crypto,
  http,
  m,
  User
);

app.listen(4321);

// app.listen(process.env.PORT);
