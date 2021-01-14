/**
 * 矩阵相关操作类
 */

class Matrix {

  matrix

  constructor(matrix) {
    this.matrix = matrix
  }

  /**
   * 获取矩阵的列数
   */
  getColsNumber() {
    return this.matrix[0].length
  }

  /**
   * 获取矩阵的行数
   */
  getRowsNumber() {
    return this.matrix.length
  }

  each(callback) {
    for (let j = 0; j < this.getColsNumber(); j++) {
      for (let i = 0; i < this.getRowsNumber(); i++) {
        const element = this.matrix[i][j]
        callback(element, i, j)
      }
    }
  }

  /**
   * 矩阵转置
   */
  transpose() {
    let desArr = []
    for (let j = 0; j < this.getColsNumber(); j++) {
      desArr[j] = []
      for (let i = 0; i < this.getRowsNumber(); i++) {
        desArr[j][i] = this.matrix[i][j]
      }
    }
    return desArr
  }
}

export {
  Matrix
}