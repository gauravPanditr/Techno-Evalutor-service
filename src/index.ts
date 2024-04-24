import express from "express";
import serverConfig from "./config/serverConfig";

const app = express();

app.listen(serverConfig.PORT || 3000, () => {
    console.log(`Server started at port ${serverConfig.PORT || 3000}`);
    console.log("Hello");
    
});
