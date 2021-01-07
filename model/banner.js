import { Http } from "../utils/http"

class Banner {
  static async getHomeLocationB() {
    return await Http.request({
      url:'/banner'
    })
  }

  static async getHomeLocationG(){
    return await Http.request({
      url:'/bannerG'
    })
  }
}

export {
  Banner
}