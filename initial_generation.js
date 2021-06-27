const fs = require("fs");
let one_measure_repeating_notes = {}; // 1小節ごとの繰り返しnoteデータ
let two_measure_repeating_notes = []; // 2小節ごとの繰り返しnoteデータ
let four_measure_repeating_notes = []; // 4小節ごとの繰り返しnoteデータ
const input_notes = () => {
  one_measure_repeating_notes = JSON.parse(
    fs.readFileSync("./notes/one_measure_repeating_notes.json", "utf8")
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
const calc_notes_num = () => {
  let notes_nums = [];
  one_measure_repeating_notes.notes.forEach((elem_song) => {
    elem_song.forEach((elem_notes) => {
      notes_nums.push(elem_notes.name.length);
    });
  });
  return notes_nums[Math.floor(Math.random() * notes_nums.length)];
};
const main = () => {
  input_notes();
  console.log("音数：" + calc_notes_num());
};
main();
