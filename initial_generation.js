const fs = require("fs");
let one_measure_repeating_notes = []; // 1小節ごとの繰り返しnoteデータ
let two_measure_repeating_notes = []; // 2小節ごとの繰り返しnoteデータ
let four_measure_repeating_notes = []; // 4小節ごとの繰り返しnoteデータ
const input_notes = () => {
  one_measure_repeating_notes.push(
    JSON.parse(
      fs.readFileSync("./notes/one_measure_repeating_notes.json", "utf8")
    )
  );
  two_measure_repeating_notes.push(
    JSON.parse(
      fs.readFileSync("./notes/two_measure_repeating_notes.json", "utf8")
    )
  );
  four_measure_repeating_notes.push(
    JSON.parse(
      fs.readFileSync("./notes/four_measure_repeating_notes.json", "utf8")
    )
  );
};
const main = () => {
  input_notes();
};
main();
