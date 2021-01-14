import { Fence } from "./fence"
import { Matrix } from "./matrix"

class FanceGroup {

  spu
  skuList = []
  fences

  constructor(spu) {
    this.spu = spu
    this.skuList = spu.sku_list
  }

  /**
   * 使用循环
   */
  initFences1() {
    const matrix = this._createMatrix(this.skuList)
    let fences = []
    let currentJ = -1   //标识是否开启了新列
    matrix.each((element, i, j) => {
      //获取到的j与当前currentJ不同，则表示已经遍历到下一列
      if (currentJ != j) {
        currentJ = j
        fences[j] = this._createFence()
      }
      //将每个element的value加入到一个fence中
      fences[j].pushValueTitle(element.value)
    })
  }

  /**
   * 使用矩阵转置方式
   */
  initFences() {
    const matrix = this._createMatrix(this.skuList)
    let fences = []
    let AT = matrix.transpose()
    AT.forEach(r => {
      const fence = new Fence(r)
      fence.init()
      fences.push(fence)
    })
    this.fences = fences
    console.log(fences)
  }

  /**
   * 构建二维数组矩阵
   */
  _createMatrix(skuList) {
    let m = []
    skuList.forEach(sku => {
      m.push(sku.specs)
    })
    return new Matrix(m)
  }

  /**
   * 构建fence实例
   */
  _createFence(element) {
    const fence = new Fence()
    return fence
  }
}

export {
  FanceGroup
}