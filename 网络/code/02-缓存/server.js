const http = require('http')
const url = require('url')
const path = require('path')
const fs = require('fs')

http.createServer((req, res) => {
    let { pathname } = url.parse(req.url, true);
    console.log(pathname)
    let abs = path.join(__dirname, pathname);
    res.setHeader('Expires', new Date(Date.now() + 20000).toGMTString());
    fs.stat(path.join(__dirname, pathname), (err, stat) => {
        if(err) {
            res.statusCode = 404;
            res.end('not found')
            return
        }
        if(stat.isFile()) {
            fs.createReadStream(abs).pipe(res)
        }
    })
}).listen(3000)

