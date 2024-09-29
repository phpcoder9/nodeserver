const {exec} = require('child_process');

exec('redis-server', (err, stdout, stderr) => {
    if (err) {
        console.error(`Error starting Redis: ${err}`);
        return;
    }
    console.log(`Redis output: ${stdout}`);
    console.error(`Redis error: ${stderr}`);
});