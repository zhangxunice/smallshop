import { Http } from "../utils/http"

class Paging {

  start
  count
  req  //请求对象，包含url，data，method
  locker = false
  url  //原始最初传进来的url,防止后面处理url时重复拼接
  moreData = true
  accumulator = []  //分页累加得到的数据

  constructor(req, count = 10, start = 0) {
    this.start = start
    this.count = count
    this.req = req
    this.url = req.url
  }

  async getMoreData() {
    //判断是否还有更多数据，没有则不调用
    if (!this.moreData) {
      return
    }

    //判断数据锁 
    if (!this._getLocker()) {
      //被锁住，不进行请求
      return
    }

    //发送请求
    const data = await this._actualGetData()

    //释放锁
    this._releaseLocker()

    return data
  }

  /**
   * 请求数据
   */
  async _actualGetData() {
    this._getCurrentReq()
    let paging = await Http.request(this.req)
    paging=paging[0]
    if (!paging) {
      return null
    }

    //没数据
    if (paging.total === 0) {
      return {
        empty: true,      //是否为空
        items: [],        //本次请求的数
        moreData: false,  //是否最后一页
        accumulator: []   //分页累加得到的数据
      }
    }

    this.moreData = this._moreData(paging.total_page, paging.page)
    if (this.moreData) {
      this.start += this.count
    }
    this._accumulator(paging.items)
    return {
      empty: false,
      items: paging.items,
      moreData: this.moreData,
      accumulator: this.accumulator
    }

  }

  /**
   * 分页数据累加
   */
  _accumulator(items) {
    this.accumulator = this.accumulator.concat(items)
  }

  /**
   * 判断是否最后一页
   */
  _moreData(totalPage, currentPage) {
    return currentPage < totalPage - 1
  }

  /**
   * 处理请求对象
   */
  _getCurrentReq() {
    //处理url
    let url = this.url
    const parms = `start=${this.start}&count=${this.count}`  //将要拼接在url后面的参数

    if (url.includes('?')) {
      //情况1：/getdata
      url += '&' + parms
    } else {
      //情况2：/getdata?name='t-1'
      url += '?' + parms
    }
    this.req.url = url
  }

  /**
   * 获取锁
   */
  _getLocker() {
    //当locker为true，代表锁住，返回false，不让请求数据
    if (this.locker) {
      return false
    }
    //没有锁住，则可以进行请求数据，将要请求数据，将其锁住
    //返回true，代表可以进行请求
    this.locker = true
    return true
  }

  /**
   * 释放锁
   */
  _releaseLocker() {
    this.locker = false
  }

}

export {
  Paging
}