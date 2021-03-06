// 個体群数のjsonを読み込む
// inputted_json_data_listに全てまとめる
// 全て独自フォーマットに変える↓
  // 発音を1, 先行音維持を0, 休符を-1
  // 1小節64length
  // time0.125 = 1length
  // time / 0.125 = 音なり始めのindex番号(1が入る場所)
    // duration - 0.125 = なり続ける配列のlength(1のあとに0が入る個数)
  // 休符の数 = (notes[i+1].time - notes[i].time + notes[i].duration) / 0
// 評価値とメロディーjsonを紐づける
// 交叉
  // 交叉させる親個体を選択する(index番号でreturnする)
    // 親個体の選択確率 = 対象のfitness/fitnessの合計 (ルーレット選択)
  // 交叉点を決める
  // 交叉させてnext_ind_data_listに子個体を全て入れる
// 受け取った評価値から、ルーレット選択で親個体を選択
// 交叉点を決めて交叉
// 書き出すdemo
const fs = require('fs')

// テスト用に、適応度を定数としていれておく
// TODO のちにこれを標準入力で受け取れるようにする
const fitness_list = [3, 2, 4, 3, 4, 3, 3, 3]
// 繰り返し数
// 1小節ごとの繰り返しは0、2小節ごとは1、繰り返しなしは2。
const repeating_num = 0

// 個体群数
const pop_size = 8

// jsonファイルを取得する関数
const parse_json = () => {
  // json2midi配下のoutputN.jsonを全て読み込む
  const inputted_json_data_list = []
  let inputted_json_data
  for (let i = 1; i <= 8; i++) {
    inputted_json_data = JSON.parse(fs.readFileSync(`../json2midi/json/output${i}.json`, 'utf8'))
    inputted_json_data_list.push(inputted_json_data.tracks[0].notes)
  }
  return inputted_json_data_list
};

// 配列の中身を、0 or 1 or -1にする関数
const change_format = () => {
  // フォーマットされた全個体を格納する配列宣言
  const formatted_data_list = []
  const inputted_json_data_list = parse_json()
  inputted_json_data_list.forEach((inputted_json_data) => {
    // 格納する64length分の配列宣言
    let formatted_data = []
    formatted_data.length = 64
    let index = 0
    let zero_num = 0
    let rest_num = 0
    inputted_json_data.forEach((elem, i) => {
      index = elem.time / 0.125
      // 音のなり始めの場所にmidi数字をいれる
      formatted_data[index] = elem.midi
      // 音が継続してなっている部分に0をいれる
      zero_num = (elem.duration - 0.125) / 0.125
      for (let i = 0; i < zero_num; i++) {
        index++
        formatted_data[index] = 0
      }
      // 休符に-1を入れる
      if (inputted_json_data.length === i + 1) {
        // 一番最後だったら、残りを全て-1にする
        rest_num = (8 - elem.time + elem.duration) / 0.125
      } else {
        rest_num = (inputted_json_data[i + 1].time - elem.time + elem.duration) / 0.125
      }
      for (let i = 0; i < rest_num; i++) {
        index++
        formatted_data[index] = -1
      }
    });
    formatted_data_list.push(formatted_data)
  })
  return formatted_data_list
}

// 繰り返し小節ごとに配列を分ける関数
const divide_repeating = () => {
  const formatted_data_list = change_format()
  const divided_data_list = []
  if (repeating_num === 0) {
    // 1小節ごとの繰り返し
    formatted_data_list.forEach((formatted_data) => {
      const divided_data = []
      divided_data.push(formatted_data.slice(0, 16))
      divided_data.push(formatted_data.slice(16, 32))
      divided_data.push(formatted_data.slice(32, 48))
      divided_data.push(formatted_data.slice(48, 64))
      divided_data_list.push(divided_data)
    })
  } else if (repeating_num === 1) {
    // 2小節ごとの繰り返し
    formatted_data_list.forEach((formatted_data) => {
      const divided_data = []
      divided_data.push(formatted_data.slice(0, 31))
      divided_data.push(formatted_data.slice(32, 63))
      divided_data_list.push(divided_data)
    })
  } else {
    // 4小節ごとの繰り返し
    divided_data_list.push(formatted_data.slice())
  }
  return divided_data_list
}

// ルーレット選択する関数
// fitnessのindex番号をreturnする
const select_of_roulette = (fitness_list) => {
  const ind1_index = 0
  const ind2_index = 0
  // fitnessの合計値を代入する
  let fitness_sum = 0
  fitness_list.forEach((elem) => {
    fitness_sum += elem
  })
  // fitness_sum分のlengthを用意して、そのなかにfitnessをいれて確立で選択する
  let roulette_wheel = []
  fitness_list.forEach((elem, i) => {
    for(let j = 0; j < elem; j++) {
      roulette_wheel.push(i)
    }
  })
  // fitness_sumを最大値としてひとつランダムに選ぶ
  const selected_roulette_index = Math.floor(Math.random() * fitness_sum)
  return roulette_wheel[selected_roulette_index]
}

// 親個体選択関数
const select_ind = () => {
  const ind1_index = select_of_roulette(fitness_list)
  let ind2_index = select_of_roulette(fitness_list)
  while (ind1_index === ind2_index) {
    ind2_index = select_of_roulette(fitness_list)
  }
  return {
    ind1_index: ind1_index,
    ind2_index: ind2_index
  }
}

// 一点交叉関数
const one_point_crossover = (ind1, ind2, crossover_point) => {
  let next_ind = []
  ind1.forEach((elem_ind1, i) => {
    let sliced_elem_ind1 = elem_ind1.slice(0, crossover_point)
    let tmp = sliced_elem_ind1.concat(ind2[i].slice(crossover_point, ind2[0].length))
    next_ind.push(tmp)
  })
  return next_ind
}

// 交叉関数
const crossover = (ind1, ind2) => {
  // 交叉点算出
  let crossover_point = 0
  if (repeating_num === 0) {
    while (crossover_point === 0 || crossover_point == 16) {
      crossover_point = Math.floor(Math.random() * 16)
    }
  } else if (repeating_num === 1) {
    while (crossover_point === 0 || crossover_point == 32) {
      crossover_point = Math.floor(Math.random() * 32)
    }
  } else {
    while (crossover_point === 0 || crossover_point == 64) {
      crossover_point = Math.floor(Math.random() * 64)
    }
  }
  // 一点交叉
  let next_ind = one_point_crossover(ind1, ind2, crossover_point)
  return next_ind
}

const create_duration = (united_next_ind) => {
  let duration = []
  let counter = []
  let breakpoint = 0
  united_next_ind.forEach((elem, i) => {
    if (elem >= 1 && i !== 0) {
      counter.push(united_next_ind.slice(breakpoint, i))
      breakpoint = i
    } else if (i === united_next_ind.length - 1) {
      counter.push(united_next_ind.slice(breakpoint, i + 1))
    }
  })
  counter.forEach((elem) => {
    duration.push(elem.length * 0.125)
  })
  return duration
}

const create_duration_ticks = (duration) => {
  let duration_ticks = []
  duration.forEach((elem_duration) => {
    duration_ticks.push(96 * 2 * elem_duration)
  })
  return duration_ticks
}
const create_midi = (united_next_ind) => {
  let midi = []
  united_next_ind.forEach((elem) => {
    if (elem >= 1) {
      midi.push(elem)
    }
  })
  return midi
}

const create_name = (midi) => {
  let name = []
  const mapping = [
    {
      midi: 48,
      name: 'C3'
    },
    {
      midi: 49,
      name: 'C#3'
    },
    {
      midi: 50,
      name: 'D3'
    },
    {
      midi: 51,
      name: 'D#3'
    },
    {
      midi: 52,
      name: 'E3'
    },
    {
      midi: 53,
      name: 'F3'
    },
    {
      midi: 54,
      name: 'F#3'
    },
    {
      midi: 55,
      name: 'G3'
    },
    {
      midi: 56,
      name: 'G#3'
    },
    {
      midi: 57,
      name: 'A3'
    },
    {
      midi: 58,
      name: 'A#3'
    },
    {
      midi: 59,
      name: 'B3'
    },
    {
      midi: 60,
      name: 'C4'
    },
    {
      midi: 61,
      name: 'C#4'
    },
    {
      midi: 62,
      name: 'D4'
    },
    {
      midi: 63,
      name: 'D#4'
    },
    {
      midi: 64,
      name: 'E4'
    },
    {
      midi: 65,
      name: 'F4'
    },
    {
      midi: 66,
      name: 'F#4'
    },
    {
      midi: 67,
      name: 'G4'
    },
    {
      midi: 68,
      name: 'G#4'
    },
    {
      midi: 69,
      name: 'A4'
    },
    {
      midi: 70,
      name: 'A#4'
    },
    {
      midi: 71,
      name: 'B4'
    },
    {
      midi: 72,
      name: 'C5'
    },
    {
      midi: 73,
      name: 'C#5'
    },
    {
      midi: 74,
      name: 'D5'
    },
    {
      midi: 75,
      name: 'D#5'
    },
    {
      midi: 76,
      name: 'E5'
    },
    {
      midi: 77,
      name: 'F5'
    },
    {
      midi: 78,
      name: 'F#5'
    },
    {
      midi: 79,
      name: 'G5'
    },
    {
      midi: 80,
      name: 'G#5'
    },
    {
      midi: 81,
      name: 'A5'
    },
    {
      midi: 82,
      name: 'A#5'
    },
    {
      midi: 83,
      name: 'B5'
    },
    {
      midi: 84,
      name: 'C6'
    },
    {
      midi: 85,
      name: 'C#6'
    },
    {
      midi: 86,
      name: 'D6'
    },
    {
      midi: 87,
      name: 'D#6'
    },
    {
      midi: 88,
      name: 'E6'
    },
    {
      midi: 89,
      name: 'F6'
    },
    {
      midi: 90,
      name: 'F#6'
    },
    {
      midi: 91,
      name: 'G6'
    },
    {
      midi: 92,
      name: 'G#6'
    },
    {
      midi: 93,
      name: 'A6'
    },
    {
      midi: 94,
      name: 'A#6'
    },
    {
      midi: 95,
      name: 'B6'
    },
    {
      midi: 96,
      name: 'C7'
    },
    {
      midi: 97,
      name: 'C#7'
    },
    {
      midi: 98,
      name: 'D7'
    },
    {
      midi: 99,
      name: 'D#7'
    },
    {
      midi: 100,
      name: 'E7'
    },
    {
      midi: 101,
      name: 'F7'
    },
    {
      midi: 102,
      name: 'F#7'
    },
    {
      midi: 103,
      name: 'G7'
    },
    {
      midi: 104,
      name: 'G#7'
    },
    {
      midi: 105,
      name: 'A7'
    },
    {
      midi: 106,
      name: 'A#7'
    },
    {
      midi: 107,
      name: 'B7'
    },
  ]
  let matched_index = 0
  midi.forEach((elem_midi) => {
    matched_index = mapping.findIndex((elem_mapping) => {
      return elem_mapping.midi === elem_midi
    })
    name.push(mapping[matched_index].name)
  })
  return name
}

const create_time = (united_next_ind) => {
  let time = []
  let time_sum = 0
  united_next_ind.forEach((elem, i) => {
    if (elem >= 1) {
      time.push(i * 0.125)
    }
  })
  return time
}

const create_ticks = (time) => {
  let ticks = []
  time.forEach((elem_time) => {
    ticks.push(elem_time * 2 * 96)
  })
  return ticks
}

const format_to_json = (next_ind) => {
  let united_next_ind = []
  next_ind.forEach((elem) => {
    united_next_ind = united_next_ind.concat(elem)
  })
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
  let duration = create_duration(united_next_ind)
  let duration_ticks = create_duration_ticks(duration)
  let midi = create_midi(united_next_ind)
  let name = create_name(midi)
  let time = create_time(united_next_ind)
  let ticks = create_ticks(time)
  duration.forEach((e, i) => {
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

const output_json = (next_ind_json_list) => {
  next_ind_json_list.forEach((elem_next_ind_json, i) => {
    fs.writeFileSync(`../json2midi/json/output${i + 1}.json`, JSON.stringify(elem_next_ind_json))
  })
}

const main = () => {
  // 子個体群配列宣言
  const next_ind_data_list = []
  const next_ind_json_list = []
  // 親個体群取得
  const ind_data_list = divide_repeating()
  for (let i = 0; i < pop_size; i++) {
    // 選択する親個体のindex番号取得
    const { ind1_index, ind2_index} = select_ind()
    // 2つの親個体を交叉し、1つの子個体を生成。
    const res = crossover(ind_data_list[ind1_index], ind_data_list[ind2_index])
    next_ind_data_list.push(res)
    next_ind_json_list.push(format_to_json(res))
  }
  output_json(next_ind_json_list)
}

main ()