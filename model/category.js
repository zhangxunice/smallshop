import { Http } from "../utils/http"

class Category {
  static async getGirdCategory() {
    return await Http.request({
      url: '/category'
    })
  }
}

export {
  Category
}