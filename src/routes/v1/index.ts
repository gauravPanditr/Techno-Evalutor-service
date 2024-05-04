import express from "express";
import submissionRouter from "./sumbissionRoute";

const v1Router = express.Router();

v1Router.use('/submission',submissionRouter);

v1Router.get('/',()=>{});

export default v1Router;