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
const output_key_index = 0; // 0だとc_maj
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
      "./mutation_data/two_measure_repeating_notes_diff.json",
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
        time: first_measure_time,
        pitch: first_measure_pitch,
      },
      {
        time: first_measure_time,
        pitch: first_measure_pitch,
      },
      {
        time: first_measure_time,
        pitch: first_measure_pitch,
      },
      {
        time: first_measure_time,
        pitch: first_measure_pitch,
      },
    ];
  } else if (input_notes_data_index == 1) {
    repeated_melody = [
      {
        time: first_measure_time,
        pitch: first_measure_pitch,
      },
      {
        time: first_measure_time,
        pitch: first_measure_pitch,
      },
    ];
  } else {
    repeated_melody = [
      {
        time: first_measure_time,
        pitch: first_measure_pitch,
      },
    ];
  }
  return repeated_melody;
};
const add_time_mutation = (spliced_time, mutation_base_data, index) => {
  let times_sum = 0;
  spliced_time.forEach((elem) => {
    times_sum += elem;
  });
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
    let random_measure_num = index;
    let max_of_random_note_num =
      input_notes_data[input_notes_data_index].notes[random_song_num][
        random_measure_num
      ].time.length;
    let min_of_random_note_num = Math.floor(
      input_notes_data[input_notes_data_index].notes[random_song_num][
        random_measure_num
      ].time.length * mutation_base_data
    );
    let random_note_num =
      Math.floor(
        Math.random() * (max_of_random_note_num - min_of_random_note_num)
      ) + min_of_random_note_num;
    // 何番目のnoteを取得するかの数字ゲット
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
      spliced_time.push(selected_time); //決定したtimeをtimesにpush
    }
  }
  return spliced_time;
};
const time_mutation = (repeated_melody) => {
  // 1小節ごとだったら4回まわる。2小節ごとだったら2回。4小節ごとだったら1回。
  // 1回目は回避する必要がある
  repeated_melody.forEach((elem_measure, index) => {
    let max_of_random_num = mutation_data[input_notes_data_index].notes.length;
    let random_num = Math.floor(Math.random() * max_of_random_num);
    let time_mutated_data = null;
    if (index !== 0) {
      if (
        mutation_data[input_notes_data_index].notes[random_num]
          .time_mutation_start_point[index]
      ) {
        // console.log(index + 1 + "小節目time変異開始");
        let mutation_base_data =
          mutation_data[input_notes_data_index].notes[random_num]
            .time_mutation_start_point[index];
        let mutation_start_point = Math.floor(
          elem_measure.time.length * mutation_base_data
        );
        let spliced_time = elem_measure.time.slice(0, elem_measure.time.length);
        spliced_time.splice(mutation_start_point);
        time_mutated_data = add_time_mutation(
          spliced_time,
          mutation_base_data,
          index
        );
        repeated_melody[index].time = time_mutated_data;
        // console.log("time変異後↓");
        // console.log(time_mutated_data);
      } else {
        // console.log(index + 1 + "小節目は変異しない");
      }
    }
  });
  return repeated_melody;
};
const add_pitch_mutation = (pitch, time_length, index, input_notes_data_index) => {
  // ひとつひとつの音高をみていく
  pitch.forEach((elem_pitch, pitch_index) => {
    // 指定繰り返し回数のmutation dataのlength取得
    let max_of_random_num = mutation_data[input_notes_data_index].notes.length;
    // mutation data内の使用する変異曲データ番号を決める
    let random_num = Math.floor(Math.random() * max_of_random_num);
    // ランダムでひとつ変異データをもってくる
    let max_of_random_pitch_num = mutation_data[input_notes_data_index].notes[random_num].name_diff[index].length
    let random_pitch_num = Math.floor(Math.random() * max_of_random_pitch_num);
    if(random_pitch_num !== 0) {
      pitch[pitch_index] = pitch[pitch_index] + mutation_data[input_notes_data_index].notes[random_num].name_diff[index][random_pitch_num];
    }
  })
  return pitch
}
const align_sound_count = (pitch, time_length, index, input_notes_data_index) => {
  // time_lengthとpitchの音数を合わせる
  if(pitch.length < time_length){
    // pitchのほうが音数少ない場合
    while(pitch.length < time_length){
      // どの曲からとるか決める乱数
      let max_of_random_num = input_notes_data.length;
      let random_num = Math.floor(Math.random() * max_of_random_num);
      // 曲のnameのどこからもってくるかきめる
      let max_of_random_name_num = input_notes_data[input_notes_data_index].notes[random_num][index].name.length
      let random_name_num = Math.floor(Math.random() * max_of_random_name_num);
      pitch.push(input_notes_data[input_notes_data_index].notes[random_num][index].name[random_name_num])
    }
  } else if (pitch.length > time_length) {
    while(pitch.length > time_length) {
      pitch.pop()
    }
  }
  return pitch
}
const pitch_mutation = (mutated_melody) => {
  mutated_melody.forEach((elem_measure, index) => {
    let max_of_random_num = mutation_data[input_notes_data_index].notes.length;
    let random_num = Math.floor(Math.random() * max_of_random_num);
    let pitch_mutated_data = null;
    if(index !== 0){
      let elem_pitch = elem_measure.pitch.slice()
      let time_length = elem_measure.time.length
      pitch_mutated_data = align_sound_count(elem_pitch, time_length, index, input_notes_data_index);
      if (
        mutation_data[input_notes_data_index].notes[random_num]
          .name_mutation_start_point[index] !== null
      ) {
        // 音高を変化させる
        pitch_mutated_data = add_pitch_mutation(elem_pitch, time_length, index, input_notes_data_index)
      }
      if(pitch_mutated_data){
        mutated_melody[index].pitch = pitch_mutated_data.slice()
      }
    }
  })
  // 1小節ごとだったら4回まわる。2小節ごとだったら2回。4小節ごとだったら1回。
  // 1回目は回避する必要がある
  return mutated_melody;
};
const generate_random_melody = (first_measure_time, first_measure_pitch) => {
  let repeated_melody = repeat_melody(first_measure_time, first_measure_pitch);
  // let random_melodyに代入する↓
  if (input_notes_data_index < 2) {
    let mutated_melody = time_mutation(repeated_melody);
    return pitch_mutation(mutated_melody);
  } else {
    return repeated_melody;
  }
};
const format_default_time = (default_time) => {
  let time_sum = 0
  let num4calc = 0
  if (input_notes_data_index === 0) {
    default_time.forEach((elem, i) => {
      time_sum += elem
      if (elem === 0) {
        default_time[i] = num4calc - time_sum
        num4calc += 2
        time_sum += default_time[i]
      }
    })
  } else if (input_notes_data_index === 1) {
    default_time.forEach((elem) => {
      time_sum += elem
      if (elem === 0) {
        default_time[i] = num4calc - time_sum
        num4calc += 4
        time_sum += default_time[i]
      }
    })
  }
  return default_time
}
const format_json = (default_melody) => {
  let default_time = []
  let default_pitch = []
  default_melody.forEach((elem) => {
    default_time = elem.time.concat(default_time)
    default_pitch = elem.pitch.concat(default_pitch)
  })
  default_time = format_default_time(default_time)
  console.log(default_time)
  // timeが0.5増えたらticksは96ふえる0.25→48
  // durationTicks = 96*2 * duration

  // 以下手順
  // timeからdurationとticksを算出
  // duration = time[n+1] - time[n]
  // 最後の音duration = 8 - timesum
  // durationからdurationTicksを算出
  // durationTicks = 96*2 * duration

  // pitchからmidiとnameを算出→出力するメロディーのキーを指定する変数が必要
  // pitchをstringに変換→マッピングでmidi数値算出
  let json_format = {
    header: {
      keySignatures: [],
      meta: [],
      name: '',
      ppq: 96,
      tempos: [
        {
          bpm: 120,
          ticks: 0
        }
      ],
      timeSignatures: [
        {
          ticks: 0,
          timeSignature: [
            4,
            4
          ],
          measures: 0
        }
      ]
    },
    tracks: [
      {
        channel: 0,
        controlChanges: {},
        pitchBends: [],
        instrument: {
          family:'piano',
          name: 'acoustic grand piano',
          number: 0
        },
        notes: [
          // ここにpushする
        ],
        endOfTrackTicks: 1536
      }
    ]
  }
  // timeからdurationとticksを算出
  // timeからduration算出して代入
  let duration = create_duration(default_time)
  let duration_ticks = create_duration_ticks(duration)
  let midi = create_midi(default_pitch)
  let name = create_name(default_pitch)
  let ticks = create_ticks(default_time)
  let time = create_time(default_time)
  // json_formatにまとめる
  default_time.forEach((e, i) => {
    json_format.tracks[0].notes.push({
      duration: duration[i],
      durationTicks: duration_ticks[i],
      midi: midi[i],
      name: name[i],
      ticks: ticks[i],
      time: time[i],
      velocity: 0.8
    })
  })
  return json_format
}
const create_duration = (default_time) => {
  let duration = []
  let time_sum = 0
  default_time.forEach((elem_time, index) => {
    time_sum += elem_time
    if (default_time.length - 1 === index) {
      duration.push(8 - time_sum)
    } else {
      // 余りの値
      let residual_num = default_time[index + 1]
      if (residual_num <= 0.125) {
        duration.push(0.125)
      } else if (residual_num <= 0.25) {
        duration.push(0.25)
      } else if (residual_num <= 0.375) {
        duration.push(0.375)
      } else {
        duration.push(0.5)
      }
    }
  })
  return duration
}
const create_duration_ticks = (duration) => {
  let durationTicks = []
  duration.forEach((elem_duration) => {
    durationTicks.push(96 * 2 * elem_duration)
  })
  return durationTicks
}
const create_midi = (default_pitch) => {
  let midi = []
  const key_mapping = [
    {
      num: -7,
      midi: 48
    },
    {
      num: -6,
      midi: 50
    },
    {
      num: -5,
      midi: 52
    },
    {
      num: -4,
      midi: 53
    },
    {
      num: -3,
      midi: 55
    },
    {
      num: -2,
      midi: 57
    },
    {
      num: -1,
      midi: 59
    },
    {
      num: 0,
      midi: 60
    },
    {
      num: 1,
      midi: 62
    },
    {
      num: 2,
      midi: 64
    },
    {
      num: 3,
      midi: 65
    },
    {
      num: 4
      ,
      midi: 67
    },
    {
      num: 5,
      midi: 69
    },
    {
      num: 6,
      midi: 71
    },
    {
      num: 7,
      midi: 72
    },
    {
      num: 8,
      midi: 74
    },
    {
      num: 9,
      midi: 76
    },
    {
      num: 10,
      midi: 77
    },
    {
      num: 11,
      midi: 79
    },
    {
      num: 12,
      midi: 81
    },
    {
      num: 13,
      midi: 83
    },
  ]
  let matched_index = 0
  default_pitch.forEach((elem_pitch) => {
    matched_index = key_mapping.findIndex((elem) => {
      return elem.num === elem_pitch
    })
    midi.push(key_mapping[matched_index].midi)
  })
  return midi
}
const create_name = (default_pitch) => {
  let name = []
  const keys = [
    ['C', 'D', 'E', 'F', 'G', 'A', 'B'] // c_maj
  ]
  const key_mapping = [
    { num: -7 }, { num: -6 }, { num: -5 }, { num: -4 },
    { num: -3 }, { num: -2 }, { num: -1 },
    { num: 0 }, { num: 1 }, { num: 2 }, { num: 3 },
    { num: 4 }, { num: 5 }, { num: 6 },
    { num: 7 }, { num: 8 }, { num: 9 }, { num: 10 },
    { num: 11 }, { num: 12 }, { num: 13 },
  ]
  let index_counter = 0
  key_mapping.forEach((elem, index) => {
    if (index === 7 || index === 14) {
      index_counter = 0
    }
    if (elem.num < 0) {
      elem.key = keys[output_key_index][index_counter] + '3'
    } else if (0 <= elem.num && elem.num <= 6) {
      elem.key = keys[output_key_index][index_counter] + '4'
    } else {
      elem.key = keys[output_key_index][index_counter] + '5'
    }
    index_counter++
  })
  let matched_index = 0
  default_pitch.forEach((elem_pitch) => {
    matched_index = key_mapping.findIndex((elem) => {
      return elem.num === elem_pitch
    })
    name.push(key_mapping[matched_index].key)
  })
  return name
}
const create_ticks = (default_time) => {
  let ticks = []
  let ticks_sum = 0
  default_time.forEach((elem_time) => {
    ticks_sum += elem_time * 2 * 96
    ticks.push(ticks_sum)
  })
  return ticks
}
const create_time = (default_time) => {
  let time = []
  let time_sum = 0
  default_time.forEach((elem_time) => {
    time.push(time_sum += elem_time)
  })
  return time
}
const output_json = (result) => {
  fs.writeFileSync('../json2midi/output.json', JSON.stringify(result))
}
const main = () => {
  input_notes();
  if (input_notes_data_index < 2) {
    input_mutation_data();
  }
  const first_measure_time = generate_first_measure_time();
  const first_measure_pitch = generate_first_measure_pitch(first_measure_time);
  // 最終結果代入
  const random_melody = generate_random_melody(first_measure_time, first_measure_pitch);
  const result = format_json(random_melody)
  output_json(result)
  return random_melody
};
main();





// 以下テストコード
const sound_count_test = () => {
  let err = false
  let n = 0;
  while(!err && n < 100){
    let result = main();
    n++;
    result.forEach((elem_measure) => {
      if(elem_measure.time.length !== elem_measure.pitch.length){
        err = true
        console.log("エラー！")
      }
    })
  }
  console.log("実行回数：" + n + "回")
}
// sound_count_test();