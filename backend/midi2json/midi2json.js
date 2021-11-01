const { Midi } = require('@tonejs/midi')
const fs  = require('fs')

const midi2json = () => {
  fs.readdir('../initial_generation/input_midi_data', (err, files) => {
    files.forEach((fileName) => {
      if (fileName !== '.DS_Store') {
        const res = fs.readFileSync(`../initial_generation/input_midi_data/${fileName}`)
        const midi = new Midi(res)
        const outputName = fileName.replace('.mid', '').replace(/ /g, '_') + '.json'
        fs.writeFileSync(`../initial_generation/input_data/${outputName}`, JSON.stringify(midi, undefined, 2))
        console.log(fileName)
      }
    })
  })
}

midi2json();
