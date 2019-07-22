/*
Encrypted data files stored locally
Name
Password
Location
File Location of output files
*/
const readingFolder = './test';
const fs = require("fs");
const readline = require('readline');
const sane = require('sane');
const net = require('net');

console.log("Starting lightning strike:")
const location = "Stag Hill";
const latitude = 51.243749;
const longitude = -0.589723;

console.log("Checking details \n")
if(validDetails(true)) {
    console.log("Details correct, starting DB and client\n")
    // Starting DB (console log when started)
    startClient();
} else {
    console.log("Your details have either not been taken or configured incorrectly, the configuration client will be run\n")
}

function validDetails(value) {
    return value;
}

function startClient(){
    console.log("Client running\n")
    var watcher = sane(readingFolder, {glob: ['**/*.txt']});

    watcher.on('ready', () => console.log('Waiting for new data reading'));
    watcher.on('add', async(filepath, root, stat) => {
        console.log('New reading', filepath);
        var fileData = await parseData(root+'/'+filepath);
        sendData(fileData);
    });
    watcher.on('delete', (filepath, root) => {
        console.log('File deleted', filepath);
    });
    watcher.on('change', (filepath, root, stat) => {
        console.log('File changed', filepath);
    });
}

async function parseData(filepath) {
    return new Promise((resolve, reject) => {
        const fileStream = fs.createReadStream(filepath);
        var fileData = {
            dateTime : null,
            location : location,
            longitude : longitude,
            latitude : latitude,
            readingData : []
        }
          
        const rl = readline.createInterface({
            input: fileStream,
            crlfDelay: Infinity
        });
        
        rl.on('line', function (line){
            if (line.includes("t0 =")){
                fileData.dateTime = line.split(/(= )/)[2].split(/,/)[0];
            } else {
                var tabSeperated = line.split('\t');
                fileData.readingData.push(tabSeperated[0]);
            }
        });

        rl.on('close', () => {
            resolve(fileData);
        });        
    })
}

function sendData(fileData){
    var client = new net.Socket();

    client.connect(10337, 'localhost', () => {
        client.write(JSON.stringify(fileData));
    })

    console.log('Data sent');
}