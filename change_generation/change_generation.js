// jsonを読み込む
// 独自フォーマットに変える
// 発音を1, 先行音維持を0, 休符を-1
// 1小節64length
// time0.125 = 1length
// time / 0.125 = 音なり始めのindex番号(1が入る場所)
  // duration - 0.125 = なり続ける配列のlength(1のあとに0が入る個数)
// 休符の数 = (notes[i+1].time - notes[i].time + notes[i].duration) / 0.125
// 評価値とメロディーjsonを紐づける
// 受け取った評価値から、ルーレット選択で親個体を選択
// 交叉点を決めて交叉
// 書き出す
const fs = require('fs')
const parse_json = async () => {
  const inputted_json = await JSON.parse(fs.readFileSync('../json2midi/output.json', 'utf8'))
  return inputted_json.tracks[0].notes
};

const change_format = async () => {
  const formatted_json = []
  formatted_json.length = 64
  const inputted_json = await parse_json()
  let index = 0
  let zero_num = 0
  let rest_num = 0
  inputted_json.forEach((elem, i) => {
    index = elem.time / 0.125
    // 音のなり始めの場所に1をいれる
    formatted_json[index] = 1
    // 音が継続してなっている部分に0をいれる
    zero_num = elem.duration - 0.125
    for (let i = 0; i < zero_num; i++) {
      index++
      formatted_json[index] = 0
    }
    // 休符に-1を入れる
    if (inputted_json.length === i + 1) {
      // 一番最後だったら、残りを全て-1にする
      rest_num = (8 - elem.time + elem.duration) / 0.125
    } else {
      rest_num = (inputted_json[i + 1].time - elem.time + elem.duration) / 0.125
    }
    for (let i = 0; i < rest_num; i++) {
      index++
      formatted_json[index] = -1
    }
  });
  console.log(formatted_json)
}

const main = () => {
  change_format()
}

main ()