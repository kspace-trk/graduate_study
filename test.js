(function () {
  const fs = require("fs");
  //曲名：happy with you
  const input_notes = JSON.parse(
    fs.readFileSync(
      "./input_data/WildVibes_Vs_WildHearts_X_WINARTA_Feat._Arild_Aas_-_Happy_With_You.json",
      "utf8"
    )
  );
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
    recurring_match_degrees: 0.5, // どれくらい音高が一致してたら繰り返し判定にするか
  };

  let = recurring_times = null; // 4小節内の繰り返し回数
  const is_1_measure_repeating = () => {
    let time_matched_degrees = null; // timeの一致度
    let name_matched_degrees = null; // nameの一致度
    // 1小節ごとの繰り返しかどうか調べる
    if (notes[0].time.length == notes[1].time.length) {
      // 音数が同じ
      notes[1].time.forEach((element, index) => {
        // リズムを一音ずつ比較
        if (element - 2 == notes[0].time[index]) {
          time_matched_degrees++;
        }
      });
      if (time_matched_degrees == notes[1].time.length) {
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
          params.recurring_match_degrees
        ) {
          // 1小節ごとに繰り返す判定時の処理
          recurring_times = 4;
        } else {
          // notes[0]と[1]を結合
          Array.prototype.push.apply(notes[0].duration, notes[1].duration);
          Array.prototype.push.apply(notes[0].name, notes[1].name);
          Array.prototype.push.apply(notes[0].time, notes[1].time);
          // note[1]にnotes[2]と[3]を結合したのを代入
          Array.prototype.push.apply(notes[2].duration, notes[3].duration);
          Array.prototype.push.apply(notes[2].name, notes[3].name);
          Array.prototype.push.apply(notes[2].time, notes[3].time);
          notes[1] = notes[2];
          // notes[2]と[3]を初期化
          notes[2] = null;
          notes[3] = null;
        }
      }
    }
  };
  const is_2_measure_repeating = () => {
    let time_matched_degrees = null; // durationの一致度
    let name_matched_degrees = null; // nameの一致度
    // 2小節ごとの繰り返しかどうか調べる
    if (notes[0].time.length == notes[1].time.length) {
      // 音数が同じ
      notes[1].time.forEach((element, index) => {
        // リズムを一音ずつ比較
        if (element - 4 == notes[0].time[index]) {
          time_matched_degrees++;
        }
      });
      if (time_matched_degrees == notes[1].time.length) {
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
          params.recurring_match_degrees
        ) {
          // 1小節ごとに繰り返す判定時の処理
          recurring_times = 2;
        }
      }
    }
  };
  const distin = () => {
    input_notes.notes.forEach((element) => {
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
    is_2_measure_repeating();
    console.log(notes[0]);
    console.log(notes[1]);
    console.log("4小節内の繰り返し回数：" + recurring_times);
  };
  distin();
})();
