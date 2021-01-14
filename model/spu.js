import { Http } from '../utils/http'

class Spu {

  static async getDetail() {
    return await Http.request({
      url: '/maoyi'
    })
  }

}

export {
  Spu
}