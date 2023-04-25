import fs from 'fs';
import { argv } from 'node:process';
import readline from 'readline'
import { exec } from 'child_process';
import { stderr, stdout } from 'process';


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


function readAndWriteAsync() {
    fs.readFile(filename, 'utf-8', (err, data) => {
        data = parseInt(data, 10);
        data++;
        console.log(`Liczba uruchomień: ${data}`);
        if (err) throw err;
        fs.writeFile(filename, data.toString(), (err) => {
            if (err) throw err;
        });
    });
}




function run(useAsync) {
    if (useAsync) {
        console.log('Async');
        readAndWriteAsync();
    } else {
        console.log('Sync');
        let counter = readCounterSync();
        counter++;
        console.log(`Liczba uruchomień: ${counter}`);
        writeCounterSync(counter);
    }
}


function getInput() {
    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout
    });

    rl.question("", input => {
        exec(input, (error, stdout, stderr) => {
            console.log(stdout);
            console.error(stderr);
            rl.close();
            getInput();
        });
    });
}



function main() {
    try {
        fs.accessSync(filename, fs.constants.R_OK | fs.constants.W_OK);
    } catch (error) {
        console.error("No Read and Write access!");
        return;
    }
    if (argv.includes('--sync')) {
        run(false);
    } else if (argv.includes('--async')) {
        run(true);
    } else if (argv.length < 3) {
        console.log("Wprowadź komendy - naciśnięcie Ctrl+C kończy działanie programu");
        getInput();
    }
}

main();