const fs = require("fs");
let one_measure_repeating_notes = {}; // 1小節ごとの繰り返しnoteデータ
let two_measure_repeating_notes = []; // 2小節ごとの繰り返しnoteデータ
let four_measure_repeating_notes = []; // 4小節ごとの繰り返しnoteデータ
const times = []; //生成したリズムデータ
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
const select_time = () => {
  let times_sum = 0;
  let random_song_num_4_first_note = Math.floor(
    Math.random() * one_measure_repeating_notes.notes.length
  );
  times.push(
    one_measure_repeating_notes.notes[random_song_num_4_first_note][0].time[0]
  ); //最初の音決定
  while (times_sum < 2) {
    let random_song_num = Math.floor(
      Math.random() * one_measure_repeating_notes.notes.length
    );
    let random_measure_num = Math.floor(Math.random() * 3);
    let random_note_num = Math.floor(
      Math.random() *
        one_measure_repeating_notes.notes[random_song_num][random_measure_num]
          .time.length
    );
    while (random_note_num == 0) {
      random_note_num = Math.floor(
        Math.random() *
          one_measure_repeating_notes.notes[random_song_num][random_measure_num]
            .time.length
      );
    }
    let selected_time = null;
    if (
      one_measure_repeating_notes.notes[random_song_num][random_measure_num]
        .time[random_note_num] !== 0
    ) {
      selected_time =
        one_measure_repeating_notes.notes[random_song_num][random_measure_num]
          .time[random_note_num] -
        one_measure_repeating_notes.notes[random_song_num][random_measure_num]
          .time[random_note_num - 1];
    }
    times_sum += selected_time;
    if (times_sum + selected_time < 2) {
      times.push(selected_time); //決定したtimeをtimesにpush
    }
  }
  console.log(times);
};
const main = () => {
  input_notes();
  select_time();
};
main();
