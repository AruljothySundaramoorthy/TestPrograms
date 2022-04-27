// import fs from 'fs';
const fs = require("fs");

const path = './checkFileExis.js';

const getpath = (pathvalue) => {
    try {
        if (fs.existsSync(pathvalue)) {
            fs.existsSync(pathvalue) == true ? 'hi' : '~'
            console.log('exist', pathvalue)
            //file exists
        } else {
            console.log('not exist', pathvalue)
        }
    } catch (err) {
        console.log(err)
        // console.error(err);
    }
}

getpath(path)
getpath('./chech.js')