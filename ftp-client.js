const ftp = require("basic-ftp")
const axios = require('axios').default;
const fs = require("fs");
example()

async function example() {

    const data = await axios.get('http://pdvpmtasgaon.edu.in/uploads/dptcomputer/Let%20us%20c%20-%20yashwantkanetkar.pdf', {

        responseType: 'blob',
    });
    console.log(data)
    const client = new ftp.Client()
    client.ftp.verbose = true
    try {
        await client.access({
            host: "localhost",
            port: 2552,
            user: "arul",
            password: "2552"
        })
        console.log(await client.list())
        const readable = fs.createReadStream(data.data);
        // Instructions for reading data
        // readable.on('readable', async () => {
        //     let chunk;

        //     // Using while loop and calling
        //     // read method
        //     while (null !== (chunk = readable.read())) {

        //         // Displaying the chunk
        //         console.log(`read: ${chunk}`);
        //         await client.uploadFrom(chunk, '/data.pdf')
        //     }
        // });

        // await client.downloadTo("README_COPY.md", "README_FTP.md")
    }
    catch (err) {
        console.log(err)
    }
    client.close()
}


// const Client = require('ssh2-sftp-client');

// const client = new Client();
// let configdata = {
//     host: 'localhost',
//     port: '2552',
//     username: 'arul',
//     password: '2552',
// };
// async function conenctclient() {
//     await client.connect({
//         ...configdata,
//         retries: 5,
//         readyTimeout: 15000,
//         keepaliveInterval: 15000,
//     });
//     console.log(await client.list())
// }


// conenctclient()