import http from 'node:http';
import { URL } from 'node:url';
import fs from 'fs';
import { exec } from 'child_process';


const filename = './src/counter.txt';


function readCounterSync() {
    try {
        const data = fs.readFileSync(filename, 'utf-8');
        return parseInt(data, 10);
    } catch (error) {
        return 0;
    }
}


function writeCounterSync(counter) {
    fs.writeFileSync(filename, counter.toString());
}


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


function finishResponse(response) {
    response.end();
}


let j = 0;
function executeCommands(commands, response) {
    if (j < commands.length) {
        if (commands[j] === "") {;}
        else {
            exec(commands[j], (erro, stdout, stderr) => {
                // console.log(stdout);
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
    }
}


const server = http.createServer(requestListener);
server.listen(8000);
console.log('The server was started on port 8000');
console.log('To stop the server, press "CTRL + C"');