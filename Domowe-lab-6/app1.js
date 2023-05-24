import express from 'express';
import morgan from 'morgan';
import { encodeXML } from 'entities';

const app = express();

app.set('views', './views');
app.set('view engine', 'pug');
app.locals.pretty = app.get('env') === 'development';
/* ************************************************ */
app.use(morgan('dev'));
app.use(express.urlencoded({ extended: false }));
/* ************************************************ */
app.get('/', function (request, response) {
    response.render('index');
});

app.all('/submit', function (req, res) {
    let name = req.method === 'GET' ? req.query.name : req.body.name;
    console.log(name + " w app1.js");
    // Return the greeting in the format preferred by the WWW client
    switch (req.accepts(['html', 'text', 'json', 'xml'])) {
        case 'json':
            // Send the JSON greeting
            res.type('application/json');
            res.json({ welcome: `Hello '${name}'` });
            console.log(`\x1B[32mThe server sent a JSON document to the browser using the '${req.method}' method\x1B[0m`);
            break;

        case 'xml':
            // Send the XML greeting
            name = name !== undefined ? encodeXML(name) : '';
            res.type('application/xml');
            res.send(`<welcome>Hello '${name}'</welcome>`);
            console.log(`\x1B[32mThe server sent an XML document to the browser using the '${req.method}' method\x1B[0m`);
            break;

        default:
            // Send the text plain greeting
            res.type('text/plain');
            res.send(`Hello '${name}'`);
            console.log(`\x1B[32mThe server sent a plain text to the browser using the '${req.method}' method\x1B[0m`);
    }
});
/* ************************************************ */
app.listen(8000, function () {
    console.log('The server was started on port 8000');
    console.log('To stop the server, press "CTRL + C"');
});


/*
Wykonania komend curl:

curl --include http://localhost:8000/submit?name=Jane%20Doe%20R%C3%B3%C5%BCa ; echo
HTTP/1.1 200 OK
X-Powered-By: Express
Content-Type: text/plain; charset=utf-8
Content-Length: 23
ETag: W/"17-kdz0dx7nTsdGkaVQqD1gUiHFcFM"
Date: Wed, 17 May 2023 10:02:47 GMT
Connection: keep-alive
Keep-Alive: timeout=5

Hello 'Jane Doe Róża'curl: (3) URL using bad/illegal format or missing URL
curl: (6) Could not resolve host: echo


curl --include --header "Accept: application/json" http://localhost:8000/submit?name=Jane%20Doe%20R%C3%B3%C5%BCa ; echo
HTTP/1.1 200 OK
X-Powered-By: Express
Content-Type: application/json; charset=utf-8
Content-Length: 37
ETag: W/"25-XcP3SI7/xxIn9wyaZQzp2iYULT8"
Date: Wed, 17 May 2023 10:04:12 GMT
Connection: keep-alive
Keep-Alive: timeout=5

{"welcome":"Hello 'Jane Doe Róża'"}curl: (3) URL using bad/illegal format or missing URL
curl: (6) Could not resolve host: echo


curl --include --header "Accept: application/xml"  http://localhost:8000/submit?name=Jane%20Doe%20R%C3%B3%C5%BCa ; echo
HTTP/1.1 200 OK
X-Powered-By: Express
Content-Type: application/xml; charset=utf-8
Content-Length: 51
ETag: W/"33-EkrZ5QNpBrQdYdYfryjKd4w8H9I"
Date: Wed, 17 May 2023 10:05:04 GMT
Connection: keep-alive
Keep-Alive: timeout=5

<welcome>Hello 'Jane Doe R&#xf3;&#x17c;a'</welcome>curl: (3) URL using bad/illegal format or missing URL
curl: (6) Could not resolve host: echo


curl --include --request POST --data 'name=Jane%20Doe%20R%C3%B3%C5%BCa' http://localhost:8000/submit ; echo
HTTP/1.1 200 OK
X-Powered-By: Express
Content-Type: text/plain; charset=utf-8
Content-Length: 17
ETag: W/"11-/Bv3H3GiIaXI+gNubzzZiA+0p7s"
Date: Wed, 17 May 2023 10:05:48 GMT
Connection: keep-alive
Keep-Alive: timeout=5

Hello 'undefined'curl: (3) URL using bad/illegal format or missing URL
curl: (6) Could not resolve host: echo


curl --include --request POST --header "Accept: application/json" --data 'name=Jane%20Doe%20R%C3%B3%C5%BCa' http://localhost:8000/submit ; echo
HTTP/1.1 200 OK
X-Powered-By: Express
Content-Type: application/json; charset=utf-8
Content-Length: 31
ETag: W/"1f-RJuEeF/VQFdpYKGdBRdCUnsD8CI"
Date: Wed, 17 May 2023 10:06:42 GMT
Connection: keep-alive
Keep-Alive: timeout=5

{"welcome":"Hello 'undefined'"}curl: (3) URL using bad/illegal format or missing URL
curl: (6) Could not resolve host: echo


curl --include --request POST --header "Accept: application/xml"  --data 'name=Jane%20Doe%20R%C3%B3%C5%BCa' http://localhost:8000/submit ; echo
HTTP/1.1 200 OK
X-Powered-By: Express
Content-Type: application/xml; charset=utf-8
Content-Length: 27
ETag: W/"1b-S2lrUfcgkPfhDVGDLcOsdFtkpVs"
Date: Wed, 17 May 2023 10:07:19 GMT
Connection: keep-alive
Keep-Alive: timeout=5

<welcome>Hello ''</welcome>curl: (3) URL using bad/illegal format or missing URL
curl: (6) Could not resolve host: echo
*/