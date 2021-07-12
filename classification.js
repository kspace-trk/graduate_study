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
let one_measure_repeating_notes_diff = [];
let two_measure_repeating_notes_diff = [];
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
  await fs.readdir("./input_data", (err, files) => {
    files.forEach((file) => {
      if (file !== ".DS_Store") {
        input_notes.push(
          JSON.parse(fs.readFileSync(`./input_data/${file}`, "utf8"))
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
  input_notes.forEach((element) => {
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
    element.notes.forEach((notes_elem) => {
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
    let notes_scale = null; // 曲のスケール番号
    keys_matched_degrees.forEach((elem, index) => {
      if (max_value < elem.value) {
        max_value = elem.value;
        notes_scale = index;
      }
    });
    name_conversion(element, scales[notes_scale]);
  });
};
const calc_base_name_num = (notes) => {
  let tmp = 0;
  notes.forEach((elem) => {
    tmp += Number(elem.name.slice(-1));
  });
  return parseInt(tmp / notes.length);
};
const name_conversion = (element, scale) => {
  // notes_scaleの値を使ってnameをstringからintにする
  let base_name_num = calc_base_name_num(element.notes); //基準となる音高の数値を算出
  element.notes.forEach((elem_input_notes) => {
    let sliced_name = elem_input_notes.name.slice(0, -1); // 音高のアルファベット
    let sliced_name_num = elem_input_notes.name.slice(-1); // 音高の数字
    scale.forEach((elem_scale, index) => {
      if (elem_scale == "C") {
        //nameがCを経由した場合、sliced_name_numを-1して、1オクターブ上判定を防ぐ
        sliced_name_num--;
      }
      if (sliced_name == elem_scale && base_name_num == sliced_name_num) {
        elem_input_notes.name = index;
      } else if (sliced_name == elem_scale && base_name_num > sliced_name_num) {
        elem_input_notes.name = index * -1;
        // -6を-1に、-5を-2に、-3を-4など、マイナス領域の上下を入れ替える
        elem_input_notes.name = (7 + elem_input_notes.name) * -1;
      } else if (sliced_name == elem_scale) {
        elem_input_notes.name = index + 7;
      }
    });
  });
};
const combination_note = () => {
  if (measure_repeating_time !== 4) {
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
  } else {
    // 全てのnotesを[0]に結合
    Array.prototype.push.apply(notes[0].duration, notes[1].duration);
    Array.prototype.push.apply(notes[0].name, notes[1].name);
    Array.prototype.push.apply(notes[0].time, notes[1].time);
    delete notes[1];
  }
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
    } else {
      measure_repeating_time = 4;
      combination_note();
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
    "./notes/one_measure_repeating_notes.json",
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
const calc_time_defferencial = (elem_song, compartion) => {
  let time_diff = [];
  // 音数は同じ
  if (compartion == 1) {
    // 1小節目と2小節目の比較
    elem_song[0].time.forEach((elem_one_measure_note, index) => {
      let tmp = null;
      tmp = elem_one_measure_note - (elem_song[1].time[index] - 2);
      if (tmp < 0) {
        tmp = tmp * -1;
      }
      time_diff.push(tmp);
    });
  } else if (compartion == 2) {
    // 1小節目と3小節目の比較
    elem_song[0].time.forEach((elem_one_measure_note, index) => {
      let tmp = null;
      tmp = elem_one_measure_note - (elem_song[2].time[index] - 4);
      if (tmp < 0) {
        tmp = tmp * -1;
      }
      time_diff.push(tmp);
    });
  } else if (compartion == 3) {
    // 1小節目と3小節目の比較
    elem_song[0].time.forEach((elem_one_measure_note, index) => {
      let tmp = null;
      tmp = elem_one_measure_note - (elem_song[3].time[index] - 6);
      if (tmp < 0) {
        tmp = tmp * -1;
      }
      time_diff.push(tmp);
    });
  }
  return time_diff;
};
const calc_name_defferencial = (elem_song, compartion) => {
  let name_diff = [];
  // 音数は同じ
  if (compartion == 1) {
    // 1小節目と2小節目の比較
    elem_song[0].name.forEach((elem_one_measure_note, index) => {
      let tmp = null;
      if (elem_one_measure_note > elem_song[1].name[index]) {
        tmp = elem_song[1].name[index] - elem_one_measure_note;
      } else {
        tmp = elem_one_measure_note - elem_song[1].name[index];
      }
      name_diff.push(tmp);
    });
  } else if (compartion == 2) {
    // 1小節目と3小節目の比較
    elem_song[0].name.forEach((elem_one_measure_note, index) => {
      let tmp = null;
      if (
        elem_one_measure_note < elem_song[2].name[index] &&
        elem_song[2].name[index] < 0
      ) {
        // 両方とも負の数かつ比較対象の値のほうが小さい場合
        tmp = elem_one_measure_note - elem_song[2].name[index];
      } else {
        // 両方とも正の数の場合
        tmp = elem_song[2].name[index] - elem_one_measure_note;
      }
      name_diff.push(tmp);
    });
  } else if (compartion == 3) {
    // 1小節目と3小節目の比較
    elem_song[0].name.forEach((elem_one_measure_note, index) => {
      let tmp = null;
      if (
        elem_one_measure_note < elem_song[3].name[index] &&
        elem_song[3].name[index] < 0
      ) {
        // 両方とも負の数かつ比較対象の値のほうが小さい場合
        tmp = elem_one_measure_note - elem_song[3].name[index];
      } else {
        // 両方とも正の数の場合
        tmp = elem_song[3].name[index] - elem_one_measure_note;
      }
      name_diff.push(tmp);
    });
  }
  return name_diff;
};
const check_time_mutation_start_point = (elem_song, compartion) => {
  let tmp = null;
  let time_mutation_start_point = null;
  if (compartion == 1) {
    elem_song[0].time.forEach((elem_one_measure_note, index) => {
      if (elem_one_measure_note !== elem_song[1].time[index] - 2 && !tmp) {
        tmp = index / elem_song[0].time.length;
        time_mutation_start_point = Math.round(tmp * 100) / 100;
      }
    });
  }
  if (compartion == 2) {
    elem_song[0].time.forEach((elem_one_measure_note, index) => {
      if (elem_one_measure_note !== elem_song[2].time[index] - 4 && !tmp) {
        tmp = index / elem_song[0].time.length;
        time_mutation_start_point = Math.round(tmp * 100) / 100;
      }
    });
  }
  if (compartion == 3) {
    elem_song[0].time.forEach((elem_one_measure_note, index) => {
      if (elem_one_measure_note !== elem_song[2].time[index] - 6 && !tmp) {
        tmp = index / elem_song[0].time.length;
        time_mutation_start_point = Math.round(tmp * 100) / 100;
      }
    });
  }
  return time_mutation_start_point;
};
const calc_mutation_start_point = (elem_song, note_diff, repeating_time) => {
  let compartion = null;
  if (elem_song[0].time.length === elem_song[1].time.length) {
    // 1小節目と2小節目の音数が一致したときの処理
    // 差分を測る
    compartion = 1;
    note_diff.time_diff.push(calc_time_defferencial(elem_song, compartion));
    note_diff.name_diff.push(calc_name_defferencial(elem_song, compartion));
    note_diff.time_mutation_start_point.push(
      check_time_mutation_start_point(elem_song, compartion)
    );
  } else {
    // 1小節目と2小節目の音数が一致しなかったときの処理
    // 差分は測らずに、変異タイミングだけ測る
    compartion = 1;
    note_diff.time_diff.push([]);
    note_diff.name_diff.push([]);
    note_diff.time_mutation_start_point.push(
      check_time_mutation_start_point(elem_song, compartion)
    );
  }
  if (repeating_time == 1) {
    if (elem_song[0].time.length === elem_song[2].time.length) {
      // 1小節目と3小節目の音数が一致したときの処理
      // 差分を測る
      compartion = 2;
      note_diff.time_diff.push(calc_time_defferencial(elem_song, compartion));
      note_diff.name_diff.push(calc_name_defferencial(elem_song, compartion));
      note_diff.time_mutation_start_point.push(
        check_time_mutation_start_point(elem_song, compartion)
      );
    } else {
      // 1小節目と3小節目の音数が一致しなかったときの処理
      // 差分は測らずに、変異タイミングだけ測る
      compartion = 2;
      note_diff.time_diff.push([]);
      note_diff.name_diff.push([]);
      note_diff.time_mutation_start_point.push(
        check_time_mutation_start_point(elem_song, compartion)
      );
    }
    if (elem_song[0].time.length === elem_song[3].time.length) {
      // 1小節目と4小節目の音数が一致したときの処理
      // 差分を測る
      compartion = 3;
      note_diff.time_diff.push(calc_time_defferencial(elem_song, compartion));
      note_diff.name_diff.push(calc_name_defferencial(elem_song, compartion));
      note_diff.time_mutation_start_point.push(
        check_time_mutation_start_point(elem_song, compartion)
      );
    } else {
      // 1小節目と4小節目の音数が一致しなかったときの処理
      // 差分は測らずに、変異タイミングだけ測る
      compartion = 3;
      note_diff.time_diff.push([]);
      note_diff.name_diff.push([]);
      note_diff.time_mutation_start_point.push(
        check_time_mutation_start_point(elem_song, compartion)
      );
    }
  }
  return note_diff;
};
const calc_note_diff = () => {
  one_measure_repeating_notes.forEach((elem_song) => {
    let repeating_time = 1;
    let note_diff = {
      duration_diff: [
        [], // 1小節目の空配列
      ],
      name_diff: [
        [], // 1小節目の空配列
      ],
      time_diff: [
        [], // 1小節目の空配列
      ],
      time_mutation_start_point: [null],
    };
    // 変異開始地点をone_measure_repeating_note_diff以下に入れる
    note_diff.time_mutation_start_point = calc_mutation_start_point(
      elem_song,
      note_diff,
      repeating_time
    ).time_mutation_start_point;
    // 全曲を1つの配列にまとめるために、1曲1曲one_measure_repeating_notes_diffにpushする
    one_measure_repeating_notes_diff.push(note_diff);
  });
  two_measure_repeating_notes.forEach((elem_song) => {
    let repeating_time = 2;
    let note_diff = {
      duration_diff: [
        [], // 1小節目の空配列
      ],
      name_diff: [
        [], // 1小節目の空配列
      ],
      time_diff: [
        [], // 1小節目の空配列
      ],
      time_mutation_start_point: [null],
    };
    // 変異開始地点をone_measure_repeating_note_diff以下に入れる
    note_diff.time_mutation_start_point = calc_mutation_start_point(
      elem_song,
      note_diff,
      repeating_time
    ).time_mutation_start_point;
    // 全曲を1つの配列にまとめるために、1曲1曲one_measure_repeating_notes_diffにpushする
    two_measure_repeating_notes_diff.push(note_diff);
  });
};
const output_diff = () => {
  // one_measure_repeating_notes_diffとtwo_measure_repeating_notes_diffをjsonに書き出す
  let one_measure_repeating_notes_diff_json = JSON.stringify(
    { notes: one_measure_repeating_notes_diff },
    null,
    ""
  );
  let two_measure_repeating_notes_diff_json = JSON.stringify(
    { notes: two_measure_repeating_notes_diff },
    null,
    ""
  );
  fs.writeFileSync(
    "./mutation_data/one_measure_repeating_notes_diff.json",
    one_measure_repeating_notes_diff_json
  );
  fs.writeFileSync(
    "./mutation_data/two_measure_repeating_notes_diff.json",
    two_measure_repeating_notes_diff_json
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
  calc_note_diff();
  output_diff();
};
const main = async () => {
  await parse_json();
  setTimeout(scale_distin, 200);
  setTimeout(measure_distin, 200);
};
main();
