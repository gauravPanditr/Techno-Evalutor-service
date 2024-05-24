import express from "express";
import bodyParser from "body-parser";
import serverConfig from "./config/serverConfig";

import SampleWorker from "./workers/Sampleworker";
import runCpp from "./container/runCpp";


const app = express();



app.use(bodyParser.urlencoded());
app.use(bodyParser.json());
app.use(bodyParser.text());

app.listen(serverConfig.PORT || 3000, () => {
    console.log(`Server started at port ${serverConfig.PORT || 3000}`);

     SampleWorker('SampleQueue');

     const userCode = `
  
     class Solution {
       public:
       vector<int> permute() {
           vector<int> v;
           v.push_back(10);
           return v;
       }
     };
   `;
 
   const code = `
   #include<iostream>
   #include<vector>
   #include<stdio.h>
   using namespace std;
   
   ${userCode}
 
   int main() {
 
     Solution s;
     vector<int> result = s.permute();
     for(int x : result) {
       cout<<x<<" ";
     }
     cout<<endl;
     return 0;
   }
   `;
 
 const inputCase = `10
 `;
 
  runCpp(code,inputCase);
   

 
 });
     
     



    

