// Importing the 'fs' (File System) module to enable file operations
const fs = require('fs');

// Importing the 'chalk' library to add color to console output
const chalk = require('chalk');

// Defining a function to add a new note to the collection
const addNote = (title, body) => {
    // Loading existing notes from the file
    const notes = loadNotes();

    // Checking for duplicate notes with the same title using the Array find method
    const duplicateNote = notes.find((note) => note.title === title);

    // If no duplicate note is found, add the new note and save the updated notes
    if (!duplicateNote) {
        notes.push({
            title: title,
            body: body
        });
        // Save the updated notes to the file
        saveNotes(notes);
        // Display a success message in green
        console.log(chalk.green.inverse('New note added!'));
    } else {
        // If a duplicate note is found, display an error message in red
        console.log(chalk.red.inverse('Note title taken!'));
    }
};

// Defining a function to remove a note with a given title
const removeNote = (title) => {
    // Loading existing notes from the file
    const notes = loadNotes();

    // Filtering out the note with the specified title using the Array filter method
    const notesToKeep = notes.filter((note) => note.title !== title);

    // If a note was removed, save the updated notes and display a success message
    if (notes.length > notesToKeep.length) {
        // Save the updated notes to the file
        saveNotes(notesToKeep);
        // Display a success message in green
        console.log(chalk.green.inverse('Note removed!'));
    } else {
        // If no note was found with the specified title, display an error message in red
        console.log(chalk.red.inverse('No note found!'));
    }
};

// Defining a function to list all the notes
const listNotes = () => {
    // Loading existing notes from the file
    const notes = loadNotes();

    // Displaying a header for the list of notes in inverse style
    console.log(chalk.inverse('Your notes'));

    // Iterating through each note and printing its title
    notes.forEach((note) => {
        console.log(note.title);
    });
};

// Defining a function to read and display the content of a note with a given title
const readNote = (title) => {
    // Loading existing notes from the file
    const notes = loadNotes();

    // Finding the note with the specified title using the Array find method
    const note = notes.find((note) => note.title === title);

    // If the note is found, display its title and body; otherwise, display an error message in red
    if (note) {
        // Display the note title in inverse style
        console.log(chalk.inverse(note.title));
        // Display the note body
        console.log(note.body);
    } else {
        console.log(chalk.red.inverse('Note not found!'));
    }
};

// Defining a function to save the notes to the file
const saveNotes = (notes) => {
    // Converting the notes array to JSON format
    const dataJSON = JSON.stringify(notes);
    
    // Writing the JSON data to the 'notes.json' file using the File System writeFileSync method
    fs.writeFileSync('notes.json', dataJSON);
};

// Defining a function to load notes from the 'notes.json' file
const loadNotes = () => {
    try {
        // Reading the raw data from the 'notes.json' file using the File System readFileSync method
        const dataBuffer = fs.readFileSync('notes.json');

        // Converting the raw data to a string
        const dataJSON = dataBuffer.toString();

        // Parsing the JSON string to an array of notes
        return JSON.parse(dataJSON);
    } catch (e) {
        // If an error occurs (ex if file not found) return an empty array
        return [];
    }
};

// Exporting the functions to make them accessible in other modules
module.exports = {
    addNote: addNote,
    removeNote: removeNote,
    listNotes: listNotes,
    readNote: readNote
};