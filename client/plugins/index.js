import axios from 'axios'
const hoge = async () => {
  const res = await axios.get('@/traningData')
  console.log(res)
}

export default {
  hoge
}
