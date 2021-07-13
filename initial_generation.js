const fs = require("fs");
let one_measure_repeating_notes = {}; // 1小節ごとの繰り返しnoteデータ
let two_measure_repeating_notes = {}; // 2小節ごとの繰り返しnoteデータ
let four_measure_repeating_notes = {}; // 4小節ごとの繰り返しnoteデータ
let input_notes_data = [
  one_measure_repeating_notes,
  two_measure_repeating_notes,
  four_measure_repeating_notes,
];
let one_measure_repeating_mutation_data = {}; // 1小節ごとの繰り返し変異データ
let two_measure_repeating_mutation_data = {}; // 2小節ごとの繰り返し変異データ
let four_measure_repeating_mutation_data = {}; // 4小節ごとの繰り返し変異データ
let mutation_data = [
  one_measure_repeating_mutation_data,
  two_measure_repeating_mutation_data,
  four_measure_repeating_mutation_data,
];
let input_notes_data_index = 0; //1小節ごとの繰り返しは0, 2小節ごとの繰り返しは1, 4小節ごとの繰り返しは2
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
};
const input_mutation_data = () => {
  mutation_data[0] = JSON.parse(
    fs.readFileSync(
      "./mutation_data/one_measure_repeating_notes_diff.json",
      "utf8"
    )
  );
  mutation_data[1] = JSON.parse(
    fs.readFileSync(
      "./mutation_data/one_measure_repeating_notes_diff.json",
      "utf8"
    )
  );
  mutation_data[2] = JSON.parse(
    fs.readFileSync(
      "./mutation_data/one_measure_repeating_notes_diff.json",
      "utf8"
    )
  );
};
const select_time = (input_notes_data_index) => {
  let times = [];
  let times_sum = 0;
  let random_song_num_4_first_note = Math.floor(
    Math.random() * input_notes_data[input_notes_data_index].notes.length
  );
  times.push(
    input_notes_data[input_notes_data_index].notes[
      random_song_num_4_first_note
    ][0].time[0]
  ); //最初の音決定
  let max_times_sum = null;
  if (input_notes_data_index == 0) {
    max_times_sum = 2;
  } else if (input_notes_data_index == 1) {
    max_times_sum = 4;
  } else if (input_notes_data_index == 2) {
    max_times_sum = 8;
  }
  while (times_sum < max_times_sum) {
    let random_song_num = Math.floor(
      Math.random() * input_notes_data[0].notes.length
    );
    let random_measure_num = Math.floor(Math.random() * 3);
    let random_note_num = Math.floor(
      Math.random() *
        input_notes_data[input_notes_data_index].notes[random_song_num][
          random_measure_num
        ].time.length
    );
    while (random_note_num == 0) {
      random_note_num = Math.floor(
        Math.random() *
          input_notes_data[input_notes_data_index].notes[random_song_num][
            random_measure_num
          ].time.length
      );
    }
    let selected_time = null;
    if (
      input_notes_data[input_notes_data_index].notes[random_song_num][
        random_measure_num
      ].time[random_note_num] !== 0
    ) {
      selected_time =
        input_notes_data[input_notes_data_index].notes[random_song_num][
          random_measure_num
        ].time[random_note_num] -
        input_notes_data[input_notes_data_index].notes[random_song_num][
          random_measure_num
        ].time[random_note_num - 1];
    }
    times_sum += selected_time;
    if (times_sum + selected_time < max_times_sum) {
      times.push(selected_time); //決定したtimeをtimesにpush
    }
  }
  return times;
};
const select_pitch = (input_notes_data_index, notes_num) => {
  const pitch = [];
  [...Array(notes_num)].forEach(() => {
    const random_note_num = Math.floor(
      Math.random() * input_notes_data[input_notes_data_index].notes.length
    );
    const ranodm_name_num = Math.floor(
      Math.random() *
        input_notes_data[input_notes_data_index].notes[random_note_num][0].name
          .length
    );

    pitch.push(
      input_notes_data[input_notes_data_index].notes[random_note_num][0].name[
        ranodm_name_num
      ]
    );
  });
  return pitch;
};
const generate_first_measure_time = () => {
  const first_measure_time = select_time(input_notes_data_index); //リズム算出
  return first_measure_time;
};
const generate_first_measure_pitch = (first_measure_time) => {
  const notes_num = first_measure_time.length; //音数算出
  const first_measure_pitch = select_pitch(input_notes_data_index, notes_num); //音高データ
  return first_measure_pitch;
};
const repeat_melody = (first_measure_time, first_measure_pitch) => {
  let repeated_melody = [];
  if (input_notes_data_index == 0) {
    repeated_melody = [
      {
        time: [first_measure_time],
        pitch: [first_measure_pitch],
      },
      {
        time: [first_measure_time],
        pitch: [first_measure_pitch],
      },
      {
        time: [first_measure_time],
        pitch: [first_measure_pitch],
      },
      {
        time: [first_measure_time],
        pitch: [first_measure_pitch],
      },
    ];
  } else if (input_notes_data_index == 1) {
    repeated_melody = [
      {
        time: [first_measure_time],
        pitch: [first_measure_pitch],
      },
      {
        time: [first_measure_time],
        pitch: [first_measure_pitch],
      },
    ];
  } else {
    repeated_melody = [
      {
        time: [first_measure_time],
        pitch: [first_measure_pitch],
      },
    ];
  }
  return repeated_melody;
};
const time_mutation = (repeated_melody) => {
  // 1小節ごとだったら4回まわる。2小節ごとだったら2回。4小節ごとだったら1回。
  // 1回目は回避する必要がある
  repeated_melody.forEach((elem_measure, index) => {
    let max_of_random_num = mutation_data[input_notes_data_index].notes.length;
    let random_num = Math.floor(Math.random() * max_of_random_num);
    if (index !== 0) {
      if (
        mutation_data[input_notes_data_index].notes[random_num]
          .time_mutation_start_point[index]
      ) {
        console.log("変異する");
      } else {
        console.log("変異しない");
      }
    }
  });
};
const generate_random_melody = (first_measure_time, first_measure_pitch) => {
  let repeated_melody = repeat_melody(first_measure_time, first_measure_pitch);
  let random_melody = time_mutation(repeated_melody);
};
const main = () => {
  input_notes();
  input_mutation_data();
  const first_measure_time = generate_first_measure_time();
  const first_measure_pitch = generate_first_measure_pitch(first_measure_time);
  // 最終結果代入
  const random_melody = generate_random_melody(
    first_measure_time,
    first_measure_pitch
  );
};
main();
