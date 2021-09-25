const { Midi } = require('@tonejs/midi')
const fs  = require('fs')

const filename = 'output.json';


const createMidiFromJson = (filename) => {
        const json = JSON.parse(fs.readFileSync(filename, 'utf8'));
        const midi2 = new Midi();
        midi2.fromJSON(json);
        fs.writeFileSync('output01' + '.mid', Buffer.from(midi2.toArray()))
        console.log('output01の書き出しが完了しました');
        return;
}

createMidiFromJson(filename);
