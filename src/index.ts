import express from "express";
import bodyParser from "body-parser"
import serverConfig from "./config/serverConfig";


const app = express();

app.use(bodyParser.urlencoded());
app.use(bodyParser.json());
app.use(bodyParser.text());

app.listen(serverConfig.PORT || 3000, () => {
    console.log(`Server started at port ${serverConfig.PORT || 3000}`);
    
 
    
});
