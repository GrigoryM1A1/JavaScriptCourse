// const http = require('node:http');
// const { URL } = require('node:url');

import http from 'node:http';
import { URL } from 'node:url';

/**
     * Handles incoming requests.
     *
     * @param {IncomingMessage} request - Input stream — contains data received from the browser, e.g,. encoded contents of HTML form fields.
     * @param {ServerResponse} response - Output stream — put in it data that you want to send back to the browser.
     * The answer sent by this stream must consist of two parts: the header and the body.
     * <ul>
     *  <li>The header contains, among others, information about the type (MIME) of data contained in the body.
     *  <li>The body contains the correct data, e.g. a form definition.
     * </ul>
     * @author Grzegorz Piśkorski <piskorski@student.agh.edu.pl>
*/

function requestListener(request, response) {
    console.log('--------------------------------------');
    console.log(`The relative URL of the current request: ${request.url}`);
    console.log(`Access method: ${request.method}`);
    console.log('--------------------------------------');
    // Create the URL object
    const url = new URL(request.url, `http://${request.headers.host}`);

    /* ******** */
    /* "Routes" */
    /* ******** */

    /* ---------------- */
    /* Route "GET('/')" */
    /* ---------------- */
    if (url.pathname === '/' && request.method === 'GET') {
        // Generating the form if the relative URL is '/', and the GET method was used to send data to the server'
        /* ************************************************** */
        // Setting a response body
        response.writeHead(200, { 'Content-Type': 'text/html' });
        response.write(`
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>Your first page</title>
  </head>
  <body>
    <main>
      <h1>First application</h1>
      <form method="POST" action="/">
        <label for="name">Give your name</label>
        <input name="name">
        <br>
        <input type="submit">
        <input type="reset">
      </form>
    </main>
  </body>
</html>`);
        /* ************************************************** */
        response.end(); // The end of the response — send it to the browser
    }

    /* ---------------------- */
    /* Route "GET('/submit')" */
    /* ---------------------- */
    else if (url.pathname === '/submit' && request.method === 'GET') {
        // Processing the form content, if the relative URL is '/submit', and the GET method was used to send data to the server'
        /* ************************************************** */
        // Creating an answer header — we inform the browser that the returned data is plain text
        response.writeHead(200, { 'Content-Type': 'text/plain; charset=utf-8' });
        /* ************************************************** */
        // Place given data (here: 'Hello <name>') in the body of the answer
        response.write(`Hello ${url.searchParams.get('name')}`); // "url.searchParams.get('name')" contains the contents of the field (form) named 'name'
        /* ************************************************** */
        response.end(); // The end of the response — send it to the browser
    }

    else if (url.pathname === '/' && request.method === 'POST') {
      // Processing the form content, if the relative URL is '/', and the POST method was used to send data to the server'
      /* ************************************************** */
      // Creating an answer header — we inform the browser that the returned data is plain text
      response.writeHead(200, { 'Content-Type': 'text/plain; charset=utf-8' });
      /* ************************************************** */
      // Place given data (here: 'Hello <name>') in the body of the answer
      let body = '';
      request.on('data', (chunk) => {
          body += chunk.toString();
      });
      request.on('end', () => {
          const name = body.split('=')[1];
          response.write(`Hello ${decodeURIComponent(name)}`);
          response.end();
      });
  }
  

    /* -------------------------- */
    /* If no route is implemented */
    /* -------------------------- */
    else {
        response.writeHead(501, { 'Content-Type': 'text/plain; charset=utf-8' });
        response.write('Error 501: Not implemented');
        response.end();
    }
}

/* ************************************************** */
/* Main block
/* ************************************************** */
const server = http.createServer(requestListener); // The 'requestListener' function is defined above
server.listen(8000);
console.log('The server was started on port 8000');
console.log('To stop the server, press "CTRL + C"');