const fs = require("fs");
const input_notes = [];
let notes = [
  {
    duration: [],
    name: [],
    time: [],
  },
  {
    duration: [],
    name: [],
    time: [],
  },
  {
    duration: [],
    name: [],
    time: [],
  },
  {
    duration: [],
    name: [],
    time: [],
  },
];
let params = {
  match_per_name: 0.4, // どれくらい音高が一致してたら繰り返し判定にするか
  match_per_time: 0.8, // どれくらいリズムが一致してたら繰り返し判定にするか
};
let measure_repeating_time = null; // 何小節ごとに繰り返すか
let one_measure_repeating_notes = []; // 1小節ごとの繰り返しnoteデータ
let two_measure_repeating_notes = []; // 2小節ごとの繰り返しnoteデータ
let four_measure_repeating_notes = []; // 4小節ごとの繰り返しnoteデータ
const init = () => {
  notes = [
    {
      duration: [],
      name: [],
      time: [],
    },
    {
      duration: [],
      name: [],
      time: [],
    },
    {
      duration: [],
      name: [],
      time: [],
    },
    {
      duration: [],
      name: [],
      time: [],
    },
  ];
  measure_repeating_time = null;
};
const parse_json = async () => {
  await fs.readdir("./test_data", (err, files) => {
    files.forEach((file) => {
      if (file !== ".DS_Store") {
        input_notes.push(
          JSON.parse(fs.readFileSync(`./test_data/${file}`, "utf8"))
        );
      }
    });
  });
};
const scale_distin = () => {
  const scales = [
    ["C", "D", "E", "F", "G", "A", "B"], //c_maj
    ["C#", "D#", "F", "F#", "G#", "A#", "C"], //c_sharp_maj
    ["D", "E", "F#", "G", "A", "B", "C#"], //d_maj
    ["D#", "F", "G", "G#", "A#", "C", "D"], //d_sharp_maj
    ["E", "F#", "G#", "A", "B", "C#", "D#"], //e_maj
    ["F", "G", "A", "A#", "C", "D", "E"], //f_maj
    ["F#", "G#", "A#", "B", "C#", "D#", "F"], //f_sharp_maj
    ["G", "A", "B", "C", "D", "E", "F#"], //g_maj
    ["G#", "A#", "C", "C#", "D#", "F", "G"], //g_sharp_maj
    ["A", "B", "C#", "D", "E", "F#", "G#"], //a_maj
    ["A#", "C", "D", "D#", "F", "G", "A"], //a_sharp_maj
    ["B", "C#", "D#", "E", "F#", "G#", "A#"], //b_maj
  ];
  let keys_matched_degrees = [
    { value: 0, label: "c_maj" },
    { value: 0, label: "c_sharp_maj" },
    { value: 0, label: "d_maj" },
    { value: 0, label: "d_sharp_maj" },
    { value: 0, label: "e_maj" },
    { value: 0, label: "f_maj" },
    { value: 0, label: "f_sharp_maj" },
    { value: 0, label: "g_maj" },
    { value: 0, label: "g_sharp_maj" },
    { value: 0, label: "a_maj" },
    { value: 0, label: "a_sharp_maj" },
    { value: 0, label: "b_maj" },
  ];
  let names = [];
  input_notes[0].notes.forEach((notes_elem) => {
    names.push(notes_elem.name);
    scales.forEach((scales_elem, index) => {
      //12回
      scales_elem.forEach((scale) => {
        //7回
        if (scale == notes_elem.name.slice(0, -1)) {
          keys_matched_degrees[index].value++;
        }
      });
    });
  });
  let max_value = 0;
  let notes_scale = null;
  keys_matched_degrees.forEach((elem, index) => {
    if (max_value < elem.value) {
      max_value = elem.value;
      notes_scale = index;
    }
  });
  console.log(
    "この曲のスケールは" + keys_matched_degrees[notes_scale].label + "です"
  );
};
const combination_note = () => {
  Array.prototype.push.apply(notes[0].duration, notes[1].duration);
  Array.prototype.push.apply(notes[0].name, notes[1].name);
  Array.prototype.push.apply(notes[0].time, notes[1].time);
  // note[1]にnotes[2]と[3]を結合したのを代入
  Array.prototype.push.apply(notes[2].duration, notes[3].duration);
  Array.prototype.push.apply(notes[2].name, notes[3].name);
  Array.prototype.push.apply(notes[2].time, notes[3].time);
  notes[1] = notes[2];
  // notes[2]と[3]を初期化
  delete notes[2];
  delete notes[3];
};
const is_1_measure_repeating = () => {
  let time_matched_degrees = null; // timeの一致度
  let name_matched_degrees = null; // nameの一致度
  // 1小節ごとの繰り返しかどうか調べる
  // 音数が同じ
  notes[1].time.forEach((element, index) => {
    // リズムを一音ずつ比較
    if (element - 2 == notes[0].time[index]) {
      time_matched_degrees++;
    }
  });
  if (
    1 / params.match_per_time <= time_matched_degrees / notes[1].time.length ||
    time_matched_degrees / notes[1].time.length >= params.match_per_time
  ) {
    // 1小節目と2小節目のリズム一致時処理
    // 音高を1音ずつ比較
    notes[1].name.forEach((element, index) => {
      // リズムを一音ずつ比較
      if (element == notes[0].name[index]) {
        name_matched_degrees++;
      }
    });
    if (name_matched_degrees / notes[1].name.length >= params.match_per_name) {
      // 1小節ごとに繰り返す判定時の処理
      measure_repeating_time = 1;
    } else {
      // notes[0]と[1]を結合
      combination_note();
    }
  } else {
    // notes[0]と[1]を結合
    combination_note();
  }
};
const is_2_measure_repeating = () => {
  let time_matched_degrees = null; // timeの一致度
  let name_matched_degrees = null; // nameの一致度
  // 2小節ごとの繰り返しかどうか調べる
  notes[1].time.forEach((element, index) => {
    // リズムを一音ずつ比較
    if (element - 4 == notes[0].time[index]) {
      time_matched_degrees++;
    }
  });
  if (
    1 / params.match_per_time >= time_matched_degrees / notes[1].time.length ||
    time_matched_degrees / notes[1].time.length >= params.match_per_time
  ) {
    // 1小節目と3小節目のリズム一致時処理
    // 音高を1音ずつ比較
    notes[1].name.forEach((element, index) => {
      // リズムを一音ずつ比較
      if (element == notes[0].name[index]) {
        name_matched_degrees++;
      }
    });
    if (name_matched_degrees / notes[1].name.length >= params.match_per_name) {
      // 2小節ごとに繰り返す判定時の処理
      measure_repeating_time = 2;
    }
  }
};
const output = () => {
  let one_measure_repeating_notes_json = JSON.stringify(
    { notes: one_measure_repeating_notes },
    null,
    ""
  );
  let two_measure_repeating_notes_json = JSON.stringify(
    { notes: two_measure_repeating_notes },
    null,
    ""
  );
  let four_measure_repeating_notes_json = JSON.stringify(
    { notes: four_measure_repeating_notes },
    null,
    ""
  );
  fs.writeFileSync(
    "./notes/ one_measure_repeating_notes.json",
    one_measure_repeating_notes_json
  );
  fs.writeFileSync(
    "./notes/two_measure_repeating_notes.json",
    two_measure_repeating_notes_json
  );
  fs.writeFileSync(
    "./notes/four_measure_repeating_notes.json",
    four_measure_repeating_notes_json
  );
};
const measure_distin = () => {
  input_notes.forEach((elem_note) => {
    elem_note.notes.forEach((element) => {
      if (element.time < 2) {
        notes[0].duration.push(element.duration);
        notes[0].name.push(element.name);
        notes[0].time.push(element.time);
      } else if (element.time < 4) {
        notes[1].duration.push(element.duration);
        notes[1].name.push(element.name);
        notes[1].time.push(element.time);
      } else if (element.time < 6) {
        notes[2].duration.push(element.duration);
        notes[2].name.push(element.name);
        notes[2].time.push(element.time);
      } else {
        notes[3].duration.push(element.duration);
        notes[3].name.push(element.name);
        notes[3].time.push(element.time);
      }
    });
    is_1_measure_repeating();
    if (!measure_repeating_time) {
      is_2_measure_repeating();
    }
    if (measure_repeating_time === 1) {
      one_measure_repeating_notes.push(notes);
    } else if (measure_repeating_time === 2) {
      two_measure_repeating_notes.push(notes);
    } else {
      four_measure_repeating_notes.push(notes);
    }
    init();
  });
  console.log(
    "1小節ごとの繰り返し曲数" + one_measure_repeating_notes.length + "曲"
  );
  console.log(
    "2小節ごとの繰り返し曲数" + two_measure_repeating_notes.length + "曲"
  );
  console.log(
    "4小節ごとの繰り返し曲数" + four_measure_repeating_notes.length + "曲"
  );
  output();
};
const main = async () => {
  await parse_json();
  setTimeout(scale_distin, 200);
  setTimeout(measure_distin, 200);
};
main();
