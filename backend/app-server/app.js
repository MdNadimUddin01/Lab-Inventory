// import { error } from "console";
// import  {init}  from "./src/server/app-server"
const server = require("../app-server/src/server/app-server");

async function main(){

    await server.init();
}

main().catch(error => console.log(error.message))