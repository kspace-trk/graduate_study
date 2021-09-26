const { Midi } = require('@tonejs/midi')
const fs  = require('fs')

const filename = 'output3d.json';


const createMidiFromJson = (filename) => {
        const json = JSON.parse(fs.readFileSync(filename, 'utf8'));
        const midi2 = new Midi();
        midi2.fromJSON(json);
        fs.writeFileSync('output1' + '.mid', Buffer.from(midi2.toArray()))
        console.log('output1の書き出しが完了しました');
        return;
}

createMidiFromJson(filename);
