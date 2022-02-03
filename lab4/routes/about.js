const path = require("path");
const fs = require("fs/promises");

/*
 * @function serveAbout
 * @description Retrieves the about.html page from the staticFiels Directory
 *              and sends it back. If there was any issue, it returns an INTERNAL SERVER ERROR
 * @returns void but sends back a response.
 */
const serveAbout = function (req, res) {
    if(req.method !== "GET"){
        res.writeHead(405);
        res.end();
    }
    let path = req.app.staticFilesDirectory;

    return fs.readFile(path + '/about.html').then(function(data){
        res.writeHead(200);
        res.write(data);
        res.end();
        req.app.cache[req.url] = {
            result: data,
            cachedAtMs: Date.now()
        }
    }).catch(function(e){
        console.log(e)
        res.writeHead(500);
        res.end();
    })

};

module.exports = serveAbout;
