const fs = require('fs'),
      yargs = require('yargs'),
      _ = require('lodash');

const notes = require('./notes'),
      title = notes.title,
      body = notes.body;

const argv = yargs
  .command('add', 'Add a note.', {
    title,
    body
  })
  .command('list', 'List existing notes.')
  .command('read', 'Print an existing note.', {
    title
  })
  .command('remove', 'Remove an existing note.', {
    title
  })
  .help()
  .argv;

let command = argv._[0];

switch ( command ) {
  case 'add':
    var note = notes.add(argv.title, argv.body);

    if ( note ) {
      notes.print(`${argv.title} note added.`, note);
    } else {
      console.log(`Note with title '${argv.title}' already exists!`);
    }

    break;
  case 'list':
    var anyNotes = notes.getAll();

    if ( anyNotes ) {
      let allNotes = anyNotes;

      console.log(`Printing ${allNotes.length} note(s)...\n`);

      allNotes.forEach((note, i) => {
        notes.print(`Note #${i + 1}`, note);
      });
    } else {
      console.log('No notes yet!');
    }

    break;
  case 'read':
    var note = notes.getSingle(argv.title);

    if ( note ) {
      notes.print(`'${argv.title}' found!`, note);
    } else {
      console.log(`'${argv.title}' not found!`);
    }

    break;
  case 'remove':
    var note = notes.removeSingle(argv.title);

    if ( note ) {
      console.log(`'${argv.title}' note was removed.`);
    } else {
      console.log(`'${argv.title}' not found!`);
    }

    break;
  default:
    console.log('Command not recognized.');
    break;
}
