import { combination } from './../../utils/util'

class SkuCode {

  code
  spuId
  totalSeqments = []

  constructor(code) {
    this.code = code
    this._splitToSegments()
  }

  _splitToSegments() {
    const spuAndSpec = this.code.split("$")
    this.spuId = spuAndSpec[0]
    const specCodeArr = spuAndSpec[1].split("#")
    //排列组合出所有路径
    const len = specCodeArr.length
    for (let i = 1; i <= len; i++) {
      const seqment = combination(specCodeArr, i);
      const newSeqment = seqment.map(seqs => {
        return seqs.join("#")
      })
      this.totalSeqments = this.totalSeqments.concat(newSeqment)
    }

  }
}

export {
  SkuCode
}