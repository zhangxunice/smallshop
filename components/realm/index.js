const { FanceGroup } = require("../models/fence-group")
const { Judger } = require("../models/judger")

// components/realm/index.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    spu: Object
  },

  observers: {
    'spu': function (spu) {
      if (!spu) {
        return
      }
      const fenceGroup=new FanceGroup(spu)

      //调用循环的方式与调用矩阵转置的方式获取，两种方式选一种即可，推荐转置方法
      fenceGroup.initFences()
      // fenceGroup.initFences1()

      const judger=new Judger(fenceGroup)
      this.bindInitData(fenceGroup)

    }
  },

  /**
   * 组件的初始数据
   */
  data: {

  },

  /**
   * 组件的方法列表
   */
  methods: {
    bindInitData(fenceGroup){
      this.setData({
        fences:fenceGroup.fences
      })
    }
  }
})
