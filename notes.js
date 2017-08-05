const fs = require('fs');

const title = {
  describe: 'Title of note',
  demand: true,
  alias: 't'
};

const body = {
  describe: 'Body of note',
  demand: true,
  alias: 'b'
};

function loadNotes() {
  try {
    notes = JSON.parse(fs.readFileSync('notes.json'));
    return notes;
  } catch(e) {
    return [];
  }
}

function saveNotes(notes) {
  fs.writeFileSync('notes.json', JSON.stringify(notes));
}

function add(title, body) {
  let notes = loadNotes();

  let note = { title, body };

  let duplicateNotes = notes.filter((note) => note.title === title);

  if ( duplicateNotes.length === 0 ) {
    notes.push(note);
    saveNotes(notes);
    return note;
  }
};

function getAll() {
  return loadNotes();
}

function getSingle(title) {
  let notes = loadNotes();
  let queriedNote = notes.find((note) => note.title === title);
  return queriedNote;
}

function removeSingle(title) {
  let notes = loadNotes();
  let updatedNotes = notes.filter((note) => note.title !== title );
  saveNotes(updatedNotes);

  return notes.length !== updatedNotes.length;
}

function print(header, note) {
  console.log(`\n${header}`);
  console.log('-----------\n');
  console.log(`Title: ${note.title}`);
  console.log(`Body: ${note.body}`);
  console.log('-----------\n');
}

module.exports = {
  title,
  body,
  add,
  getAll,
  getSingle,
  removeSingle,
  print
};
