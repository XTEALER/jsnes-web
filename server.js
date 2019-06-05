
const express = require('express');
const path = require('path');
const app = express();
let otherRequests = 0;
let appRequests = 0;
let errRequests = 0;

app.enable('trust proxy');
app.use((req, res, next) => {
    
    let reqUrl = req.url.split('/');
    
    console.log('\nCLIENT IP: ' + req.ip + "\nPARSED URL: " + reqUrl);

    if(reqUrl[1] === 'index.html' || reqUrl[1] === 'index' || (reqUrl[0] === '' && reqUrl[1] === ''))
    {
        appRequests++;
        console.log('APP REQUESTS ' + appRequests);
        res.sendFile(path.join(__dirname, 'index.html'));
    } else if(reqUrl[2] === 'js')
    {
        otherRequests++;
        console.log('OTHER REQUESTS: ' + otherRequests + '\nURL:' + req.url);
        res.sendFile(path.join(__dirname, 'static', 'js', reqUrl[3]));
    } else if(reqUrl[2] === 'css')
    {
        otherRequests++;
        console.log('OTHER REQUESTS: ' + otherRequests + '\nURL:' + req.url);
        res.sendFile(path.join(__dirname, 'static', 'css', reqUrl[3]));
    } else if(reqUrl[1] === 'roms')
    {
        otherRequests++;
        console.log('OTHER REQUESTS: ' + otherRequests + '\nURL:' + req.url);
        res.sendFile(path.join(__dirname, 'roms', reqUrl[2]));
    } else if(reqUrl[1] === 'run') 
    {
        otherRequests++;
        console.log('OTHER REQUESTS: ' + otherRequests + '\nURL:' + req.url);
        res.sendFile(path.join(__dirname, 'index.html'));
    } else
    {
        errRequests++;
        console.log('NOT FOUND: ' + errRequests + '\nURL:' + req.url + '\nIP: ' + req.ip);
        res.status(404).send('<html><head><title>Not found</title></head><body<h1>Page not found</h1><hr></body></html>');
    }
});

app.listen(3000);
