const { Midi } = require('@tonejs/midi')
const fs  = require('fs')

const filename = 'output.json';


const createMidiFromJson = (filename) => {
        console.log(filename);
        const json = JSON.parse(fs.readFileSync(filename, 'utf8'));
        const midi2 = new Midi();
        midi2.fromJSON(json);
        fs.writeFileSync(filename + '.mid', Buffer.from(midi2.toArray()))
        return;
}

function createMidiRaw(){
        let midi = new Midi()
        const track = midi.addTrack()
        track.addNote({midi: 60, time: 0, duration: 0.2})
        fs.writeFileSync( 'output.midi' , Buffer.from( midi.toArray()))
}

// createMidiRaw();
createMidiFromJson(filename);