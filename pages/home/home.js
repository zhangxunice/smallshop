// pages/home/home.js
import { config } from '../../config/config'
import { Activity } from '../../model/activity'
import { Banner } from '../../model/banner'
import { Category } from '../../model/category'
import { SpuPaging } from '../../model/spu-paging'
import { Theme } from '../../model/theme'

Page({

  /**
   * 页面的初始数据
   */
  data: {
    topTheme: null,
    banner: null,
    gird: [],
    activity: null,
    themeE: null,
    themeSpu: [],
    themeF: null,
    bannerG: null,
    themeH: null,
    spuPaging: null,
    loadingType:"loading"
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    this.initData()
    this.initBottomSpuList()
  },

  async initData() {
    const theme = new Theme()
    await theme.getThemes()
    const themeA = theme.getHomeLocationA()
    const bannerB = await Banner.getHomeLocationB()
    const category = await Category.getGirdCategory()
    const activityD = await Activity.getHomeLocationD()

    const themeE = theme.getHomeLocationE()
    let themeSpu = []
    if (themeE.online) {
      const data = await Theme.getHomeLocationESpu()
      if (data) {
        themeSpu = data.spu_list.splice(0, 8)
      }
    }

    const themeF = theme.getHomeLocationF()
    const bannerG = await Banner.getHomeLocationG()
    const themeH = theme.getHomeLocationH()

    this.setData({
      topTheme: themeA,
      banner: bannerB,
      gird: category,
      activity: activityD,
      themeE,
      themeSpu,
      themeF,
      bannerG,
      themeH
    })
  },

  async initBottomSpuList() {
    const spuPaging = await SpuPaging.getLatestPaging()
    const data = await spuPaging.getMoreData()
    if (!data) {
      return
    }
    wx.lin.renderWaterFlow(data.items)
    this.setData({
      spuPaging
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  async onReachBottom() {
    const data = await this.data.spuPaging.getMoreData()
    if (!data) {
      return
    }
    wx.lin.renderWaterFlow(data.items)
    if(!data.moreData){
      this.setData({
        loadingType:"end"
      })
    }
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})