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
// const fs = require('fs')

// テスト用に、適応度を定数としていれておく
// TODO のちにこれを標準入力で受け取れるようにする
// const fitness_list = [3, 2, 4, 3, 4, 3, 3, 3]
// 繰り返し数
// 1小節ごとの繰り返しは0、2小節ごとは1、繰り返しなしは2。
const repeating_num = 0

// 個体群数
const pop_size = 8

// キー
// Cmaj = 0, Dmaj = 1 ...
const key_of_melody = 0

// 登場する最大のmidi値
let max_midi_value

// 突然変異確率 (現状298行目)
// const mutation_prob = 10

// jsonファイルを取得する関数
const parse_json = (indList) => {
  // json2midi配下のoutputN.jsonを全て読み込む
  const inputted_json_data_list = []
  let inputted_json_data
  for (let i = 0; i < pop_size; i++) {
    inputted_json_data = indList[i]
    inputted_json_data_list.push(inputted_json_data.tracks[0].notes)
  }
  return inputted_json_data_list
}

// 配列の中身を、midi数値 or 0にする関数
const change_format = (indList) => {
  // フォーマットされた全個体を格納する配列宣言
  const formatted_data_list = []
  const inputted_json_data_list = parse_json(indList)
  for (let i = 0; i < pop_size; i++) {
    const inputted_json_data = inputted_json_data_list[i]
    // 格納する64length分の配列宣言
    const formatted_data = []
    formatted_data.length = 64
    let index = 0
    let zero_num = 0
    let rest_num = 0
    for (let i = 0; i < inputted_json_data.length; i++) {
      index = inputted_json_data[i].time / 0.125
      // 音のなり始めの場所にmidi数字をいれる
      formatted_data[index] = inputted_json_data[i].midi
      // 音が継続してなっている部分に0をいれる
      zero_num = (inputted_json_data[i].duration - 0.125) / 0.125
      for (let i = 0; i < zero_num; i++) {
        index++
        formatted_data[index] = 0
      }
      // 休符に-1を入れる
      if (inputted_json_data.length === i + 1) {
        // 一番最後だったら、残りを全て-1にする
        rest_num = (8 - inputted_json_data[i].time + inputted_json_data[i].duration) / 0.125
      } else {
        rest_num = (inputted_json_data[i + 1].time - inputted_json_data[i].time + inputted_json_data[i].duration) / 0.125
      }
      for (let i = 0; i < rest_num; i++) {
        index++
        formatted_data[index] = -1
      }
    }
    formatted_data_list.push(formatted_data)
  }
  return formatted_data_list
}

// 繰り返し小節ごとに配列を分ける関数
const divide_repeating = (indList) => {
  const formatted_data_list = change_format(indList)
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
const select_of_roulette = async (fitness_list) => {
  const ind1_index = 0
  const ind2_index = 0
  // fitnessの合計値を代入する
  let fitness_sum = 0
  await Promise.all(
    fitness_list.map((elem) => {
      fitness_sum += elem
      return 0
    })
  )
  // fitness_sum分のlengthを用意して、そのなかにfitnessをいれて確立で選択する
  const roulette_wheel = []
  await Promise.all(
    fitness_list.map((elem, i) => {
      for (let j = 0; j < elem; j++) {
        roulette_wheel.push(i)
      }
      return 0
    })
  )
  // fitness_sumを最大値としてひとつランダムに選ぶ
  const selected_roulette_index = Math.floor(Math.random() * fitness_sum)
  return roulette_wheel[selected_roulette_index]
}

// 親個体選択関数
const select_ind = async (fitness_list) => {
  const ind1_index = await select_of_roulette(fitness_list)
  let ind2_index = await select_of_roulette(fitness_list)
  while (ind1_index === ind2_index) {
    ind2_index = await select_of_roulette(fitness_list)
  }
  return {
    ind1_index: ind1_index,
    ind2_index: ind2_index
  }
}

// 一点交叉関数
const one_point_crossover = async (ind1, ind2, crossover_point) => {
  const next_ind = []
  await Promise.all(
    ind1.map((elem_ind1, i) => {
      const sliced_elem_ind1 = elem_ind1.slice(0, crossover_point)
      const tmp = sliced_elem_ind1.concat(ind2[i].slice(crossover_point, ind2[0].length))
      next_ind.push(tmp)
      return 0
    })
  )
  return next_ind
}

// 二点交差
const two_point_crossover = async (ind1, ind2, crossover_point1, crossover_point2) => {
  console.log(crossover_point1 + '&' + crossover_point2)
  const next_ind = []
  await Promise.all(
    ind2.map((elem_ind2, i) => {
      const sliced_elem_ind2 = elem_ind2.slice(crossover_point1, crossover_point2)
      const sliced_elem_ind1_1 = ind1[i].slice(0, crossover_point1)
      const sliced_elem_ind1_2 = ind1.slice(crossover_point2, ind1[i].length)
      const tmp = sliced_elem_ind1_1.concat(sliced_elem_ind2, sliced_elem_ind1_2)
      next_ind.push(tmp)
      return 0
    })
  )
  console.log(next_ind)
  return next_ind
}

// 突然変異
const mutation = (next_ind_measure) => {
  // 突然変異した値が、この中に入っていればOK
  // 入っていなければ、不協和音になるのでやり直し
  const key_bind_list = {
    C: [],
    D: [],
    E: [],
    F: [],
    G: [],
    A: [],
    B: []
  }
  const maj_rule = [2, 2, 1, 2, 2, 2, 1]
  const base_midi_num = 48
  let current_midi_num = base_midi_num
  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < maj_rule.length; j++) {
      key_bind_list.C.push(current_midi_num)
      current_midi_num = current_midi_num + maj_rule[j]
    }
  }
  // ±1〜3変動させる
  // 1〜3をランダムで取得
  let mutation_value = Math.floor(Math.random() * 3) + 1
  // 1 or -1
  let plus_or_minus
  // 0だったら-1、1だったら1
  if (Math.floor(Math.random() * 2) === 0) {
    plus_or_minus = -1
  } else {
    plus_or_minus = 1
  }
  // ±1〜5の値が入る
  mutation_value = mutation_value * plus_or_minus

  // [64, 0, 65, 0, 0, 74 + 3, 0, 0, 67, 0, 0, 65, 0, 0, 0, -1]
  // ↑こんなことがしたい

  // 音数とindex番号を格納するオブジェクト
  const sound_point = {
    times: 0,
    index: []
  }
  // 計測
  for (let i = 0; i < next_ind_measure.length; i++) {
    if (next_ind_measure[i] > 0) {
      sound_point.times++
      sound_point.index.push(i)
    }
  }
  // 変異(上下)させる音を決定させる
  const mutation_target_index = Math.floor(Math.random() * sound_point.times)
  // sound_point.index[mutation_target_index]が、変異対象音のindex番号
  const mutated_next_ind = next_ind_measure.slice()
  mutated_next_ind[sound_point.index[mutation_target_index]] = mutated_next_ind[sound_point.index[mutation_target_index]] + mutation_value
  // 不協和音じゃなくなるまで繰り返す
  let tmp = mutated_next_ind[sound_point.index[mutation_target_index]]
  console.log(key_bind_list.C)
  const is_harmony = key_bind_list.C.includes(tmp)
  if (!is_harmony) {
    tmp = tmp + plus_or_minus
    mutated_next_ind[sound_point.index[mutation_target_index]] = tmp
    return mutated_next_ind
  } else {
    return mutated_next_ind
  }
}

// 交叉関数
const crossover = async (ind1, ind2) => {
  // 交叉点算出
  const crossover_point = []
  // N点交叉用に、交叉点をたくさん生成して配列に入れる
  let rand_num = 0
  // 何点交叉するか
  const crossover_point_num = 2
  for (let i = 0; i < crossover_point_num; i++) {
    if (repeating_num === 0) {
      while (crossover_point.includes(rand_num) || rand_num === 0 || rand_num === 16) {
        rand_num = Math.floor(Math.random() * 16)
      }
      crossover_point.push(rand_num)
    } else if (repeating_num === 1) {
      while (crossover_point.includes(rand_num) || rand_num === 0 || rand_num === 32) {
        rand_num = Math.floor(Math.random() * 32)
      }
      crossover_point.push(rand_num)
    } else {
      while (crossover_point.includes(rand_num) || rand_num === 0 || rand_num === 64) {
        rand_num = Math.floor(Math.random() * 64)
      }
      crossover_point.push(rand_num)
    }
  }
  crossover_point.sort((a, b) => a - b)

  // 一点交叉
  const next_ind = await one_point_crossover(ind1, ind2, crossover_point[0])

  // 二点交差
  // const next_ind = await two_point_crossover(ind1, ind2, crossover_point[0], crossover_point[1])
  const max_mutation = Math.floor(Math.random() * 100)
  // 突然変異確率 mutation_num%
  const mutation_num = 5
  // 突然変異
  if (mutation_num < max_mutation) {
    const mutated_next_ind = []
    for (let i = 0; i < next_ind.length; i++) {
      const mutated_next_ind_measure = mutation(next_ind[i])
      mutated_next_ind.push(mutated_next_ind_measure)
    }
    return mutated_next_ind
  }
  return next_ind
}

const create_duration = (united_next_ind) => {
  const duration = []
  const counter = []
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
  const duration_ticks = []
  duration.forEach((elem_duration) => {
    duration_ticks.push(96 * 2 * elem_duration)
  })
  return duration_ticks
}
const create_midi = (united_next_ind) => {
  const midi = []
  united_next_ind.forEach((elem) => {
    if (elem > 1) {
      midi.push(elem)
    }
  })
  return midi
}

const create_name = (midi) => {
  const name = []
  const mapping = [
    {
      midi: 37,
      name: 'C2'
    },
    {
      midi: 38,
      name: 'C#2'
    },
    {
      midi: 39,
      name: 'D2'
    },
    {
      midi: 40,
      name: 'D#2'
    },
    {
      midi: 41,
      name: 'E2'
    },
    {
      midi: 42,
      name: 'F2'
    },
    {
      midi: 43,
      name: 'F#2'
    },
    {
      midi: 44,
      name: 'G2'
    },
    {
      midi: 45,
      name: 'G#2'
    },
    {
      midi: 46,
      name: 'A2'
    },
    {
      midi: 47,
      name: 'B2'
    },
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
    }
  ]
  let matched_index = 0
  for (let i = 0; i < midi.length; i++) {
    console.log(midi[i])
    matched_index = mapping.findIndex((elem_mapping) => {
      return elem_mapping.midi === midi[i]
    })
    name.push(mapping[matched_index].name)
  }
  return name
}

const create_time = (united_next_ind) => {
  const time = []
  const time_sum = 0
  united_next_ind.forEach((elem, i) => {
    if (elem >= 1) {
      time.push(i * 0.125)
    }
  })
  return time
}

const create_ticks = (time) => {
  const ticks = []
  time.forEach((elem_time) => {
    ticks.push(elem_time * 2 * 96)
  })
  return ticks
}

const format_to_json = async (next_ind) => {
  let united_next_ind = []
  await Promise.all(
    next_ind.map((elem) => {
      united_next_ind = united_next_ind.concat(elem)
      return 0
    })
  )
  const json_format = {
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
          family: 'piano',
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
  const duration = create_duration(united_next_ind)
  const duration_ticks = create_duration_ticks(duration)
  const midi = create_midi(united_next_ind)
  const name = create_name(midi)
  const time = create_time(united_next_ind)
  const ticks = create_ticks(time)
  await Promise.all(
    duration.map((dummy, i) => {
      json_format.tracks[0].notes.push({
        duration: duration[i],
        durationTicks: duration_ticks[i],
        midi: midi[i],
        name: name[i],
        ticks: ticks[i],
        time: time[i],
        velocity: 0.8
      })
      return 0
    })
  )
  return json_format
}

const main = async (indList, fitness_list) => {
  // 子個体群配列宣言
  const next_ind_data_list = []
  const next_ind_json_list = []
  // 親個体群取得
  const ind_data_list = await divide_repeating(indList)
  console.log(ind_data_list)
  for (let i = 0; i < pop_size; i++) {
    // 選択する親個体のindex番号取得
    const { ind1_index, ind2_index } = await select_ind(fitness_list)
    // 2つの親個体を交叉し、1つの子個体を生成。
    const res = await crossover(ind_data_list[ind1_index], ind_data_list[ind2_index])
    next_ind_data_list.push(res)
    const res_format = await format_to_json(res)
    next_ind_json_list.push(res_format)
  }
  // output_json(next_ind_json_list)
  // console.log(next_ind_json_list)
  return next_ind_json_list
}

export default {
  main
}
