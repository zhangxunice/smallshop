import { SkuCode } from "./skucode";

class Judger {

  fenceGroup
  pathDict = []

  constructor(fenceGroup) {
    this.fenceGroup = fenceGroup
    this.initPathDict()
  }

  initPathDict() {
    this.fenceGroup.skuList.forEach(s => {
      const skuCode = new SkuCode(s.code)
      this.pathDict = this.pathDict.concat(skuCode.totalSeqments)
    });
    console.log(this.pathDict)
  }
}

export {
  Judger
}