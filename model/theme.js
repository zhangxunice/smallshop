import { Http } from "../utils/http"

class Theme {

  static locationA = 't-1'
  static locationE = 't-2'

  themes = []

  async getThemes() {
    this.themes = await Http.request({
      url: '/themes'
    })
  }

  getHomeLocationA() {
    return this.themes.find(t => t.name === 't-1')
  }

  getHomeLocationE() {
    return this.themes.find(t => t.name === 't-2')
  }

  getHomeLocationF() {
    return this.themes.find(t => t.name === 't-3')
  }

  getHomeLocationH() {
    return this.themes.find(t => t.name === 't-4')
  }

  static getHomeLocationESpu(){
    return Http.request({
      url:'/with_spu'
    })
  }
}

export {
  Theme
}