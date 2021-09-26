const { Midi } = require('@tonejs/midi')
const fs  = require('fs')
const pop_size = 8


const createMidiFromJson = () => {
  for (let i = 0; i < pop_size; i++) {
    const json = JSON.parse(fs.readFileSync(`./json/output${i + 1}.json`, 'utf8'));
    const midi2 = new Midi();
    midi2.fromJSON(json);
    fs.writeFileSync(`./midi/output${i + 1}` + '.mid', Buffer.from(midi2.toArray()))
    console.log(`output${i + 1}の書き出しが完了しました`)
  }
  return;
}

createMidiFromJson();
