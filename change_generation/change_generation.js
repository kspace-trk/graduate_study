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
// 書き出す
const fs = require('fs')

// テスト用に、適応度を定数としていれておく
// TODO のちにこれを標準入力で受け取れるようにする
const fitness_list = [4, 2, 1, 4, 2, 1, 5, 3]
// 繰り返し数
// 1小節ごとの繰り返しは0、2小節ごとは1、繰り返しなしは4。
const repeating_num = 0

// 個体群数
const pop_size = 8

// jsonファイルを取得する関数
const parse_json = () => {
  // json2midi配下のoutputN.jsonを全て読み込む
  const inputted_json_data_list = []
  let inputted_json_data
  for (let i = 1; i <= 8; i++) {
    inputted_json_data = JSON.parse(fs.readFileSync(`../json2midi/output${i}.json`, 'utf8'))
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
  console.log(divided_data_list[2])
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

const one_point_crossover = (ind1, ind2, crossover_point) => {
  const next_ind = []
  // console.log(ind1[0].slice(0, crossover_point))
  // console.log(ind2[0].slice(crossover_point, ind2[0].length))
  // console.log(crossover_point)
}

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
  let next_ind_data_list = []
  next_ind_data_list.push(one_point_crossover(ind1, ind2, crossover_point))
  
}

const main = () => {
  // 親個体群取得
  const ind_data_list = divide_repeating()
  // 選択する親個体のindex番号取得
  const { ind1_index, ind2_index} = select_ind()
  // 2つの親個体を交叉し、1つの子個体を生成。
  const next_ind_data_list = []
  const res = crossover(ind_data_list[ind1_index], ind_data_list[ind2_index])
  next_ind_data_list.push(res)
}

main ()