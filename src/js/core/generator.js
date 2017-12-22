// 生成数独解决方案
const Toolkit = require("./toolkit");

module.exports = class Generator {

  generate() {
    while (!this.internalGenerate()) {
      // TODO
      console.warn("try again");
    }
  }

  internalGenerate() {
    this.matrix = Toolkit.matrix.makeMatrix();
    this.orders = Toolkit.matrix.makeMatrix()
        .map(row => row.map((v, i) => i))
        .map(row => Toolkit.matrix.shuffle(row));


    for (let n = 1; n <= 9; n++) {
      if (!this.fillNumber(n)) {
        return false;
      }
      this.fillNumber(n);
    }
    return true;
  }

  fillNumber(n) {
    return this.fillRow(n, 0);
  }

  fillRow(n, rowIndex) {
    if (rowIndex > 8) {
      return true;
    }

    const row = this.matrix[rowIndex];
    const orders = this.orders[rowIndex];
    // TODO 随机选择列
    for (let i = 0; i < 9; i++) {
      const colIndex = orders[i];
      // 如果这个位置已经有值，跳过
      if (row[colIndex]) {
        continue;
      }

      // console.log("1"+ rowIndex);
      // console.log("2"+ colIndex);

      // 检查这个位置是否可以填n
      if (!Toolkit.matrix.checkFillable(this.matrix, n, rowIndex, colIndex)) {
        continue;
      }

      row[colIndex] = n;

      // 去下一行填写n，如果没填进去，就继续寻找当前行下一个位置
      if (!this.fillRow(n, rowIndex + 1)) {
        row[colIndex] = 0;
        continue;
      }

      return true;
    }

    return false;
  }
}


