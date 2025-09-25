import express from "express";
import path from "path";

const router = express.Router();

// working dir is 
//    server/
// NOT
//    server/src/
// so ../ accordingly :)


// ==========[ ROUTING ] ==========
router.get("/", (req, res) => {
    let fileName = path.resolve("../dist/index.html");
    res.sendFile(fileName);
});
// ==========[ ROUTING ] ==========


export default router;
