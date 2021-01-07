import { Paging } from '../utils/paging'

class SpuPaging {

  static getLatestPaging() {
    return new Paging({
      url: '/latest'
    }, 5)
  }

}

export {
  SpuPaging
}