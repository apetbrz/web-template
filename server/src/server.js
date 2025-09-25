import cors from "cors";
import express from "express";
import fs from "fs";
import https from "https";

import appRouter from "./routes.js";


const app = express();

// ==========[ PORT ] ==========
let port;

if (process.env.NODE_ENV == "DEV")
    port = 3000;
else
    port = 4001;
// ==========[ PORT ] ==========


// ==========[ CORS? ] ==========
let corsOrigin;

if (process.env.NODE_ENV == "DEV")
    corsOrigin = "*"
else
    corsOrigin = "CHANGEME";

const corsOptions = {
    origin: [corsOrigin]
};

app.use(cors(corsOptions));
// ==========[ CORS? ] ==========


// ==========[ HTTPS? ] ==========
var server;
if (process.env.NODE_ENV == "DEV") {
    console.log("IS_DEV environment, no HTTPS");
    server = app;
}
else {
    console.log("production environment, HTTPS");
    const key = fs.readFileSync(import.meta.dirname + "/secret/selfsigned.key");
    const cert = fs.readFileSync(import.meta.dirname + "/secret/selfsigned.crt");
    const certOptions = {
        key: key,
        cert: cert
    };
    server = https.createServer(certOptions, app);
}
// ==========[ HTTPS? ] ==========


// ==========[ ROUTING ] ==========
app.use("/", appRouter);
app.use("/assets", express.static("../dist/assets"));
// ==========[ ROUTING ] ==========


// ==========[ STARTUP ] ==========
let main = async () => {
    server.listen(port, () => {
        console.log("server started on port " + port + "\n\n");
    });
}
// ==========[ STARTUP ] ==========


main();
