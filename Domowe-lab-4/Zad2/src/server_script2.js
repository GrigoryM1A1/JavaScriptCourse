import http from 'node:http';
import { URL } from 'node:url';
import fs from 'fs';
import { exec } from 'child_process';


const filename = './src/counter.txt';

/**
 * Helps to handle the case where sync option is chosen. Reads data from counter.txt file.
 * @returns {Integer} - counter - how many times our application was launched.
 * @author Grzegorz Piśkorski <piskorski@student.agh.edu.pl>
 */
function readCounterSync() {
    try {
        const data = fs.readFileSync(filename, 'utf-8');
        return parseInt(data, 10);
    } catch (error) {
        return 0;
    }
}

/**
 * Helps to handle the case where sync option is chosen. Writes to counter.txt the number of times we lanuched our app.
 * @param {Integer} counter - How many times our application has been launched.
 * @author Grzegorz Piśkorski <piskorski@student.agh.edu.pl>
 */
function writeCounterSync(counter) {
    fs.writeFileSync(filename, counter.toString());
}


/**
 * Handles case where async option is chosen. It helps to write everything in browser as soon as asynchronous code is finished.
 * @param {IncomingMessage} request - Input stream — contains data received from the browser, e.g,. encoded contents of HTML form fields. In this case it is actually unused.
 * @param {ServerResponse} response - Output stream — put in it data that you want to send back to the browser.
 * @author Grzegorz Piśkorski <piskorski@student.agh.edu.pl>
 */
function readAndWriteAsync(request, response) {
    fs.readFile(filename, 'utf-8', (err, data) => {
        data = parseInt(data, 10);
        data++;
        response.write(`Liczba uruchomien: ${data}`)
        response.end();
        if (err) throw err;
        fs.writeFile(filename, data.toString(), (err) => {
            if (err) throw err;
        });
    });
}

/**
 * Helps to hanlde "executing shell commands" case. It fires after all esynchronous calls of execute() are finished.
 * @param {ServerResponse} response - Output stream — put in it data that you want to send back to the browser.
 * @author Grzegorz Piśkorski <piskorski@student.agh.edu.pl>
 */
function finishResponse(response) {
    response.end();
}


let j = 0;
/**
 * Handles case where no option is chosen and there is a list of shell commands to execute.
 * @param {ListOfCommands} commands - List of input commands to execute.
 * @param {ServerResponse} response - Output stream — put in it data that you want to send back to the browser.
 * @author Grzegorz Piśkorski <piskorski@student.agh.edu.pl>
 */
function executeCommands(commands, response) {
    if (j < commands.length) {
        if (commands[j] === "") {;}
        else {
            exec(commands[j], (erro, stdout, stderr) => {
                console.error(stderr);
                let out = '';
                out += stdout.toString();            
                response.write(`
                    <!DOCTYPE html>
                    <html lang="en">
                        <head>
                            <meta charset="utf-8">
                            <meta name="viewport" content="width=device-width, initial-scale=1">
                            <title>Your first page</title>
                        </head>
                        <body>
                            <pre>${out}</pre>
                        </body>
                    </html>
                `);
                j++;
                if (j == 2 * commands.length) {
                    finishResponse(response);
                    j = 0;
                }
            });
            j++;
            executeCommands(commands, response);
        }
    }
    return;
}

/**
 * Handles incoming requests.
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

    if (url.pathname === '/' && request.method === 'GET') {
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
                    <h1>Second app</h1>
                    <form method="GET" action="/submit">
                        <select name="mode">
                            <option>--</option>
                            <option>sync</option>
                            <option>async</option>
                        </select>

                        <br>
                        <br>

                        <h3>Jeśli nie wybrałeś żadnej opcji to wpisz jakieś komendy systemowe (komendy oddzielamy enterem, ale przy ostatniej nie wciskamy go):</h3>
                        <textarea name="commands"></textarea>
                        <br>
                        <input type="submit">
                    </form>
                </main>
            </body>
        </html>
        `);
        response.end();
    } else if (url.pathname === '/submit' && request.method === 'GET') {
        try {
            fs.accessSync(filename, fs.constants.R_OK | fs.constants.W_OK);
        } catch (error) {
            console.error("No Read and Write access!");
            response.write("No Read and Write access!");
            response.end();
        }
        
        let mode = url.searchParams.get('mode');
        if (mode === 'sync') {
            let data = readCounterSync();
            data++;
            response.write(`Liczba uruchomien: ${data}`)
            writeCounterSync(data);
            response.end();
        } else if (mode === 'async') {
            readAndWriteAsync(request, response);
        } else if (mode === '--') {
            let commands = url.searchParams.get('commands');
            commands = commands.split('\n');
            executeCommands(commands, response);
        }
    } else {
        response.writeHead(501, { 'Content-Type': 'text/plain; charset=utf-8' });
        response.write('Error 501: Not implemented');
        response.end();
    }
}


const server = http.createServer(requestListener);
server.listen(8000);
console.log('The server was started on port 8000');
console.log('To stop the server, press "CTRL + C"');