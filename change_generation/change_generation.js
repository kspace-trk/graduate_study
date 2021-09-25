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
  // 交叉させてind_data_listに子個体を全て入れる
// 受け取った評価値から、ルーレット選択で親個体を選択
// 交叉点を決めて交叉
// 書き出す
const fs = require('fs')

// テスト用に、適応度を定数としていれておく
// TODO のちにこれを標準入力で受け取れるようにする
const fitness = [4, 2, 1, 4, 2, 1, 5, 3]

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
      // 音のなり始めの場所に1をいれる
      formatted_data[index] = 1
      // 音が継続してなっている部分に0をいれる
      zero_num = elem.duration - 0.125
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

const select_of_roulette = () => {
  const ind1_index = 0
  const ind2_index = 0
  // fitnessの合計値を代入する
  // const fitness_sum = 
}

const main = async () => {
  console.log(change_format())
}

main ()