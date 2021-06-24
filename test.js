(function () {
  //曲名：happy with you
  const input_notes = [
    {
      duration: 0.25,
      durationTicks: 48,
      midi: 68,
      name: "G#4",
      ticks: 0,
      time: 0,
      velocity: 0.7874015748031497,
    },
    {
      duration: 0.25,
      durationTicks: 48,
      midi: 68,
      name: "G#4",
      ticks: 72,
      time: 0.375,
      velocity: 0.7874015748031497,
    },
    {
      duration: 0.375,
      durationTicks: 72,
      midi: 75,
      name: "D#5",
      ticks: 144,
      time: 0.75,
      velocity: 0.7874015748031497,
    },
    {
      duration: 0.25,
      durationTicks: 48,
      midi: 75,
      name: "D#5",
      ticks: 240,
      time: 1.25,
      velocity: 0.7874015748031497,
    },
    {
      duration: 0.25,
      durationTicks: 48,
      midi: 63,
      name: "D#4",
      ticks: 312,
      time: 1.625,
      velocity: 0.7874015748031497,
    },
    {
      duration: 0.25,
      durationTicks: 48,
      midi: 67,
      name: "G4",
      ticks: 384,
      time: 2,
      velocity: 0.7874015748031497,
    },
    {
      duration: 0.25,
      durationTicks: 48,
      midi: 67,
      name: "G4",
      ticks: 456,
      time: 2.375,
      velocity: 0.7874015748031497,
    },
    {
      duration: 0.375,
      durationTicks: 72,
      midi: 68,
      name: "G#4",
      ticks: 528,
      time: 2.75,
      velocity: 0.7874015748031497,
    },
    {
      duration: 0.25,
      durationTicks: 48,
      midi: 68,
      name: "G#4",
      ticks: 624,
      time: 3.25,
      velocity: 0.7874015748031497,
    },
    {
      duration: 0.25,
      durationTicks: 48,
      midi: 70,
      name: "A#4",
      ticks: 696,
      time: 3.625,
      velocity: 0.7874015748031497,
    },
    {
      duration: 0.25,
      durationTicks: 48,
      midi: 68,
      name: "G#4",
      ticks: 768,
      time: 4,
      velocity: 0.7874015748031497,
    },
    {
      duration: 0.25,
      durationTicks: 48,
      midi: 68,
      name: "G#4",
      ticks: 840,
      time: 4.375,
      velocity: 0.7874015748031497,
    },
    {
      duration: 0.375,
      durationTicks: 72,
      midi: 75,
      name: "D#5",
      ticks: 912,
      time: 4.75,
      velocity: 0.7874015748031497,
    },
    {
      duration: 0.25,
      durationTicks: 48,
      midi: 75,
      name: "D#5",
      ticks: 1008,
      time: 5.25,
      velocity: 0.7874015748031497,
    },
    {
      duration: 0.25,
      durationTicks: 48,
      midi: 63,
      name: "D#4",
      ticks: 1080,
      time: 5.625,
      velocity: 0.7874015748031497,
    },
    {
      duration: 0.25,
      durationTicks: 48,
      midi: 70,
      name: "A#4",
      ticks: 1152,
      time: 6,
      velocity: 0.7874015748031497,
    },
    {
      duration: 0.25,
      durationTicks: 48,
      midi: 70,
      name: "A#4",
      ticks: 1224,
      time: 6.375,
      velocity: 0.7874015748031497,
    },
    {
      duration: 0.375,
      durationTicks: 72,
      midi: 72,
      name: "C5",
      ticks: 1296,
      time: 6.75,
      velocity: 0.7874015748031497,
    },
    {
      duration: 0.25,
      durationTicks: 48,
      midi: 73,
      name: "C#5",
      ticks: 1392,
      time: 7.25,
      velocity: 0.7874015748031497,
    },
    {
      duration: 0.25,
      durationTicks: 48,
      midi: 72,
      name: "C5",
      ticks: 1464,
      time: 7.625,
      velocity: 0.7874015748031497,
    },
  ];
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
    input_notes.forEach((element) => {
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
