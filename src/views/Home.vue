<template>
  <el-image
    style="width: 20px; height: 20px"
    :src="url"
    :preview-src-list="srcList"
    :hide-on-click-modal="true"
  >
  </el-image>
  <div class="wrapper">
    <div class="btn">
      <el-input size="mini" v-model="n" placeholder="请输入......" />
      <el-button type="primary" round @click="First"
        >五种方法计算第n个斐波那契数</el-button
      >
      <el-button type="primary" round @click="Second"
        >迭代算法寻找不超过环境的最大斐波那契数</el-button
      >
      <el-button type="primary" round @click="Third"
        >递归算法寻找不超过环境的最大斐波那契数</el-button
      >
      <el-button type="primary" round @click="Five"
        >根据第三步计算的序号n,是否能在一分钟完成</el-button
      >
      <el-button type="primary" round @click="Six"
        >递归算法30s内计算出的最大斐波那契数</el-button
      >
      <el-button type="primary" round @click="Seven"
        >公式快速计算第n个斐波那契数</el-button
      >
    </div>
    <div class="show">
      <h1>算法过程展示区域</h1>
      <h2>{{ out }}</h2>
      <div class="select" v-if="select">
        <div>
          <div>迭代</div>
          <div>改进迭代</div>
          <div>递归</div>
          <div>矩阵</div>
          <div>公式</div>
        </div>
        <div>
          <el-progress
            v-for="item in timelist"
            :key="item"
            :text-inside="true"
            :stroke-width="24"
            :percentage="item"
            status="success"
          />
        </div>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent, ref } from 'vue'
import img from '../assets/1.png'
import { ElMessage, ElLoading } from 'element-plus'
import { timeEnd } from 'console'
export default defineComponent({
  setup() {
    const url = ref(img)
    const srcList = ref([img])
    const n = ref()
    let out = ref<string | number>()
    let timelist = ref<number[]>([])
    let select = ref<boolean>(false)
    let endtime: number[] = []
    /**
     * 迭代
     */
    const Iteration = (n: number) => {
      if (n < 2) return n
      let arr = [0, 1]
      for (let i = 2; i <= n; i++) {
        arr[i] = (arr[i - 1] + arr[i - 2]) % 1000000007
      }
      endtime[0] = performance.now()
      return arr[arr.length - 1]
    }
    /**
     * 增强迭代
     */
    const EnhanceIteration = (n: number) => {
      if (n < 1) {
        return 0
      } else if (n <= 2) {
        return 1
      } else {
        let n1 = 1,
          n2 = 1
        let tmp: number
        for (let i = 3; i < n; ++i) {
          tmp = n1 + n2
          n1 = n2
          n2 = tmp
        }
        endtime[1] = performance.now()
        return n2
      }
    }
    /**
     * 矩阵
     */
    const Matrix = (n: number) => {
      if (n < 2) {
        return n
      }
      const q = [
        [1, 1],
        [1, 0],
      ]
      const res = pow(q, n - 1)
      endtime[3] = performance.now()
      return res[0][0]
    }
    const pow = (a: number[][], n: number) => {
      let ret = [
        [1, 0],
        [0, 1],
      ]
      while (n > 0) {
        if ((n & 1) === 1) {
          ret = multiply(ret, a)
        }
        n >>= 1
        a = multiply(a, a)
      }
      return ret
    }

    const multiply = (a: number[][], b: number[][]) => {
      const c = new Array(2).fill(0).map(() => new Array(2).fill(0))
      for (let i = 0; i < 2; i++) {
        for (let j = 0; j < 2; j++) {
          c[i][j] =
            (BigInt(a[i][0]) * BigInt(b[0][j]) +
              BigInt(a[i][1]) * BigInt(b[1][j])) %
            BigInt(1000000007)
        }
      }
      return c
    }
    /**
     * 公式
     */
    const GeneralTermFormula = (n: number) => {
      const sqrt5 = Math.sqrt(5)
      const fibN = Math.pow((1 + sqrt5) / 2, n) - Math.pow((1 - sqrt5) / 2, n)
      endtime[4] = performance.now()
      return Math.round(fibN / sqrt5)
    }
    /**
     * 递归
     */
    const Recursion = (n: number): number => {
      if (n == 1 || n == 2) {
        return 1
      }
      endtime[2] = performance.now()
      return Recursion(n - 2) + Recursion(n - 1)
    }
    /**
     * 2.
     */
    const First = () => {
      if (n.value == undefined || n.value == null) return
      timelist.value = []
      select.value = true
      let array = [
        Iteration,
        EnhanceIteration,
        Recursion,
        Matrix,
        GeneralTermFormula,
      ]
      array.forEach((item) => {
        let start = performance.now()
        item.call(null, n.value)
        timelist.value.push(start)
      })
      timelist.value.forEach((item, index) => {
        timelist.value[index] = (endtime[index] - item) * 100
      })
      timelist.value[2] /= 100000
      ElMessage({
        message: '执行成功',
        type: 'success',
      })
    }
    /**
     * 3.迭代算法寻找不超过编程环境能够支持的的最大斐波那契数是第几个
     */
    const Second = () => {
      let a = 1,
        b = 1,
        c = 2
      let count = 3
      for (; b < c; ) {
        //一旦达到编程环境最大斐波那契数，便会产生内存溢出，从而变成一个负数，到此循环结束
        a = b
        b = c
        c = a + b
        count++
      }
      out.value = count
      ElMessage({
        message: '执行成功',
        type: 'success',
      })
      return count
    }
    /**
     * 4.利用递归
     */
    const Third = (n: number) => {
      const loading = ElLoading.service({
        lock: true,
        text: 'Loading',
        background: 'rgba(0, 0, 0, 0.1)',
      })
      let end = 1
      let i = 1
      while (end > 0) {
        end = Recursion(i)
        console.log(end, i)
        out.value = i
        i++
      }
      out.value = i
      loading.close()
      ElMessage({
        message: '执行成功',
        type: 'success',
      })
    }
    /**
     * 5.
     */
    const Five = () => {
      const n = 50
      const time1 = new Date().getTime()
      Iteration(n)
      const time2 = new Date().getTime()
      ElMessage({
        message: '执行成功',
        type: 'success',
      })
      if (time2 - time1 > 60 * 1000) {
        out.value = '一分钟内无法完成'
        return
      }
      out.value = '一分钟内可以完成'
    }
    /**
     * 6.
     */
    const Six = () => {
      const time1 = new Date().getTime()
      let endtime = 0
      let r1 = 1,
        r2
      let i = 1
      let j = 1
      while (endtime < time1 + 30 * 1000) {
        endtime = new Date().getTime()
        i++
        Recursion(i)
        r1 = i
      }
      const time2 = new Date().getTime()
      while (endtime < time2 + 30 * 1000) {
        endtime = new Date().getTime()
        j++
        EnhanceIteration(j)
        r2 = j
      }
      out.value = `递归：${r1} —— 迭代：${r2}`
    
      ElMessage({
        message: '执行成功',
        type: 'success',
      })
    }
    /**
     * 7.
     */
    const Seven = () => {
      const loading = ElLoading.service({
        lock: true,
        text: 'Loading',
        background: 'rgba(0, 0, 0, 0.1)',
      })
      for (var i = 1; ; i++) {
        let r1 = GeneralTermFormula(i)
        let r2 = EnhanceIteration(i)
        if (r1 != r2) break
      }
      out.value = i
      loading.close()
      ElMessage({
        message: '执行成功',
        type: 'success',
      })
    }
    return {
      url,
      srcList,
      n,
      out,
      select,
      timelist,
      First,
      Second,
      Third,
      Five,
      Six,
      Seven,
    }
  },
})
</script>
<style lang="less" scoped>
.wrapper {
  display: grid;
  grid-template-columns: 50% 50%;
  gap: 10px;
  padding: 20px;
}
.btn {
  display: grid;
  align-items: center;
  gap: 10px;
  justify-items: center;
}
.show {
  border: 1px solid;
  border-radius: 10px;
}
.select {
  margin:10px;
  display: grid;
  grid-template-columns: 10% 80%;
  gap: 10px;
}
</style>
