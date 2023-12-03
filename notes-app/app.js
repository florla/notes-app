// Importing the 'chalk' library 
const chalk = require('chalk');

// Importing the 'yargs' library 
const yargs = require('yargs');

// Importing the 'notes' module containing functions for note-related operations
const notes = require('./notes.js');

// Customizing the yargs version
yargs.version('1.1.0');

// Creating an 'add' command
yargs.command({
    command: 'add',
    describe: 'Add a new note',

    // Configuring the command-line options for 'add' command
    builder: {
        title: {
            describe: 'Title of the note',
            demandOption: true, // The title is required
            type: 'string' // The title should be of string type
        },
        body: {
            describe: 'Body content of the note',
            demandOption: true, // The body is required
            type: 'string' // The body should be of string type
        }
    },

    // Handling the 'add' command
    handler(argv) {
        // Invoking the 'addNote' function from the 'notes' module with command-line arguments
        notes.addNote(argv.title, argv.body);
    }
});

// Creating a 'remove' command
yargs.command({
    command: 'remove',
    describe: 'Remove a note',

    // Configuring the command-line options for 'remove' command
    builder: {
        title: {
            describe: 'Title of the note to be removed',
            demandOption: true, // The title is required
            type: 'string' // The title should be of string type
        }
    },
    //builder property is used to define the expected options and their configurations for a particular command. These options are additional parameters that users can provide when invoking a command.

    // Handling the 'remove' command
    handler(argv) {
        // Invoking the 'removeNote' function from the 'notes' module with command-line arguments
        notes.removeNote(argv.title);
    }
    //handler property is part of the command configuration and is responsible for specifying the function that will be executed when a particular command is invoked.
});

// Creating a 'list' command
yargs.command({
    command: 'list',
    describe: 'List all your notes',

    // Handling the 'list' command
    handler() {
        // Invoking the 'listNotes' function from the 'notes' module
        notes.listNotes();
    }
});

// Creating a 'read' command
yargs.command({
    command: 'read',
    describe: 'Read the content of a note',

    // Configuring the command-line options for 'read' command
    builder: {
        title: {
            describe: 'Title of the note to be read',
            demandOption: true, // The title is required
            type: 'string' // The title should be of string type
        }
    },

    // Handling the 'read' command
    handler(argv) {
        // Invoking the 'readNote' function from the 'notes' module with command-line arguments
        notes.readNote(argv.title);
    }
});

// Parsing the command-line arguments using yargs
// Uses the yargs library to execute the appropriate commands based on input
yargs.parse();