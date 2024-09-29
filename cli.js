
const fs = require('fs');
const path = require('path');
const { Command } = require('commander');

const program = new Command();

program
  .command('make:event <event_name>')
  .description('Create a new event listener class')
  .action((eventName) => {
    createEventListener(eventName);
  });

function createEventListener(eventName) {
  const listenerDirectory = path.join(__dirname, 'events', 'listeners');
  
  if (!fs.existsSync(listenerDirectory)) {
    fs.mkdirSync(listenerDirectory, { recursive: true });
  }

  // Define the file name and path
  const listenerFileName = `${eventName.charAt(0).toUpperCase() + eventName.slice(1)}Listener.js`;
  const listenerFilePath = path.join(listenerDirectory, listenerFileName);

  if (fs.existsSync(listenerFilePath)) {
    console.log(`Listener ${listenerFileName} already exists.`);
    return;
  }

  const listenerContent = `
class ${eventName.charAt(0).toUpperCase() + eventName.slice(1)}Listener {
    handle(data) {
        console.log('${eventName} event received with data:', data);
        // Add your custom logic here
    }
}

module.exports = ${eventName.charAt(0).toUpperCase() + eventName.slice(1)}Listener;
`;

  fs.writeFileSync(listenerFilePath, listenerContent.trim());

  console.log(`Listener ${listenerFileName} created successfully.`);
}

program.parse(process.argv);
