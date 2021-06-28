const fs = require("fs");
let measure_repeating_time = null; //1小節ごとの繰り返しは0, 2小節ごとの繰り返しは1, 4小節ごとの繰り返しは2
let one_measure_repeating_notes = {}; // 1小節ごとの繰り返しnoteデータ
let two_measure_repeating_notes = {}; // 2小節ごとの繰り返しnoteデータ
let four_measure_repeating_notes = {}; // 4小節ごとの繰り返しnoteデータ
const input_notes_data = [
  one_measure_repeating_notes,
  two_measure_repeating_notes,
  four_measure_repeating_notes,
];
const times = []; //生成したリズムデータ
const input_notes = () => {
  input_notes_data[0] = JSON.parse(
    fs.readFileSync("./notes/one_measure_repeating_notes.json", "utf8")
  );
  input_notes_data[1] = JSON.parse(
    fs.readFileSync("./notes/one_measure_repeating_notes.json", "utf8")
  );
  input_notes_data[2] = JSON.parse(
    fs.readFileSync("./notes/one_measure_repeating_notes.json", "utf8")
  );
  one_measure_repeating_notes = input_notes_data[0];
};
const select_time = (measure_repeating_time) => {
  let times_sum = 0;
  let random_song_num_4_first_note = Math.floor(
    Math.random() * input_notes_data[measure_repeating_time].notes.length
  );
  times.push(
    input_notes_data[measure_repeating_time].notes[
      random_song_num_4_first_note
    ][0].time[0]
  ); //最初の音決定
  let max_times_sum = null;
  if (measure_repeating_time == 0) {
    max_times_sum = 2;
  } else if (measure_repeating_time == 1) {
    max_times_sum = 4;
  } else if (measure_repeating_time == 2) {
    max_times_sum = 8;
  }
  while (times_sum < max_times_sum) {
    let random_song_num = Math.floor(
      Math.random() * input_notes_data[0].notes.length
    );
    let random_measure_num = Math.floor(Math.random() * 3);
    let random_note_num = Math.floor(
      Math.random() *
        input_notes_data[measure_repeating_time].notes[random_song_num][
          random_measure_num
        ].time.length
    );
    while (random_note_num == 0) {
      random_note_num = Math.floor(
        Math.random() *
          input_notes_data[measure_repeating_time].notes[random_song_num][
            random_measure_num
          ].time.length
      );
    }
    let selected_time = null;
    if (
      input_notes_data[measure_repeating_time].notes[random_song_num][
        random_measure_num
      ].time[random_note_num] !== 0
    ) {
      selected_time =
        input_notes_data[measure_repeating_time].notes[random_song_num][
          random_measure_num
        ].time[random_note_num] -
        input_notes_data[measure_repeating_time].notes[random_song_num][
          random_measure_num
        ].time[random_note_num - 1];
    }
    times_sum += selected_time;
    if (times_sum + selected_time < max_times_sum) {
      times.push(selected_time); //決定したtimeをtimesにpush
    }
  }
  console.log(times);
};
const main = () => {
  input_notes();
  measure_repeating_time = 0;
  select_time(measure_repeating_time);
};
main();
