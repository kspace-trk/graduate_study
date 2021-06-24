(function () {
  const fs = require("fs");
  //曲名：happy with you
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
  const constructor = () => {
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
    const fs = require("fs");
    await fs.readdir("input_data", (err, files) => {
      files.forEach((file) => {
        if (file !== ".DS_Store") {
          input_notes.push(
            JSON.parse(fs.readFileSync(`input_data/${file}`, "utf8"))
          );
        }
      });
    });
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
      1 / params.match_per_time <=
        time_matched_degrees / notes[1].time.length ||
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
      if (
        name_matched_degrees / notes[1].name.length >=
        params.match_per_name
      ) {
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
      1 / params.match_per_time >=
        time_matched_degrees / notes[1].time.length ||
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
      if (
        name_matched_degrees / notes[1].name.length >=
        params.match_per_name
      ) {
        // 2小節ごとに繰り返す判定時の処理
        measure_repeating_time = 2;
      }
    }
  };
  const distin = () => {
    input_notes.forEach((elem_note) => {
      elem_note.notes.forEach((element) => {
        if (element.time < 2) {
          notes[0].duration.push(element.duration);
          notes[0].name.push(element.name);
          notes[0].time.push(element.time);
        } else if (element.time < 4) {
          notes[0].duration.push(element.duration);
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
      constructor();
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
  };
  const main = async () => {
    await parse_json();
    setTimeout(distin, 200);
  };
  main();
})();
