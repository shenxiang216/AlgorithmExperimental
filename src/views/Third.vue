<template>
  <div>
    <el-image
      style="width: 20px; height: 20px"
      v-for="item in srcList"
      :key="item"
      :src="item"
      :preview-src-list="srcList"
      :hide-on-click-modal="true"
    >
    </el-image>
    <div class="wrapper">
      <div class="btn">
        <div>
          <span> 容积：</span
          ><el-input-number v-model="volume" :min="1" size="small" />
          <span> 重量：</span
          ><el-input-number v-model="weight" :min="1" size="small" />
          <span> 价格：</span
          ><el-input-number v-model="price" :min="1" size="small" />
          <el-button type="primary" round @click="addRes">添加物品</el-button>
        </div>
        <div>
          背包容积：{{ volume }} [<span
            v-for="(item, index) in list"
            :key="index"
            >{物品{{ index + 1 }}价值:{{ item.price }}重量:{{
              item.weight
            }}}</span
          >]
        </div>
        <el-button type="primary" round @click="fracKnapsack"
          >贪心算法求解分数背包问题并分析时间复杂度</el-button
        >
        <el-button type="primary" round @click="Greedy01"
          >贪心算法求解0-1背包问题</el-button
        >
        <el-button type="primary" round @click="Force01"
          >蛮力法求解0-1背包问题并分析时间复杂度</el-button
        >
        <el-button type="primary" round @click="zeroOneKnapsack"
          >动态规划求解0-1背包问题并分析时间复杂度</el-button
        >
        <el-button type="primary" round @click="optimize"
          >记忆法改进动态规划</el-button
        >
      </div>
      <div class="show">算法过程展示区域</div>
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent, ref } from 'vue'
import img3_1 from '../assets/3.1.png'
import img3_2 from '../assets/3.2.png'
interface IList {
  weight: number
  price: number
}
interface ICost extends IList {
  cost: number
  flag: number
}
export default defineComponent({
  setup() {
    const srcList = ref([img3_1, img3_2])
    const weight = ref<number>(1)
    const price = ref<number>(1)
    const volume = ref<number>(1)
    let list = ref<IList[]>([])
    /**
     * 处理输入
     */
    const addRes = () => {
      list.value.push({
        weight: weight.value,
        price: price.value,
      })
    }


    // 算法区域

    /**
     * 贪心算法解决分数背包问题
     * */
    const fracKnapsack = () => {
      let arr: ICost[] = []
      list.value.map((item) => {
        arr.push({ ...item, cost: item.price / item.weight, flag: 0 })
      })

      arr.sort((a, b) => {
        return b.cost - a.cost
      })
      let left = volume.value
      for (let i = 0; i < arr.length; i++) {
        if (left <= 0) break
        if (left >= arr[i].weight) {
          left -= arr[i].weight
          arr[i].flag = arr[i].weight
        } else if (left < arr[i].weight) {
          left = 0
          arr[i].flag = left
        }
      }
      console.log(arr)
    }

    /**
     * 贪心算法求解0-1背包问题
     */
    const Greedy01 = () => {
      let arr: ICost[] = []
      list.value.map((item) => {
        arr.push({ ...item, cost: item.price / item.weight, flag: 0 })
      })

      arr.sort((a, b) => {
        return b.cost - a.cost
      })
      let left = volume.value
      for (let i = 0; i < arr.length; i++) {
        if (left <= 0) break
        if (left >= arr[i].weight) {
          left -= arr[i].weight
          arr[i].flag = 1
        }
      }
      console.log(arr)
    }

    /**
     * 蛮力法求01背包问题
     */
    const Force01 = () => {
      const outputResult = (
        weights: number[],
        vals: number[],
        visit: boolean[],
        currWeight: number,
        seq: number[]
      ) => {
        console.log('当前背包的重量是：', currWeight)
        let sumVal = 0
        for (let i = 0; i < weights.length; ++i) if (visit[i]) sumVal += vals[i]
        console.log('当前背包的总价值为：', sumVal)
        console.log('当前结果集(编号)是：', seq)
        console.log('\n-----------------------------')
      }
      const dfs = (
        weights: number[],
        vals: number[],
        visit: boolean[],
        currWeight: number,
        seq: number[]
      ) => {
        for (let i = 0; i < weights.length; ++i) {
          if (!visit[i]) {
            if (currWeight + weights[i] > volume.value) continue
            visit[i] = true
            seq.push(i) //将当前步加入到序列中
            dfs(weights, vals, visit, currWeight + weights[i], seq) //基于当前状态深度遍历
            seq.splice(
              seq.findIndex((_) => _ === i),
              1
            ) //从序列中删除
            visit[i] = false
          }
        }

        outputResult(weights, vals, visit, currWeight, seq)
        return
      }
      let weights: number[] = [],
        vals: number[] = [],
        visit: boolean[] = []
      let seq: number[] = []
      list.value.map((item, index) => {
        weights.push(item.weight)
        vals.push(item.price)
        visit[index] = false
      })
      dfs(weights, vals, visit, 0, seq)
    }

    /**
     * 动态规划求解0-1背包问题
     * */
    const zeroOneKnapsack = () => {
      let weight: number[] = []
      let value: number[] = []
      let size = volume.value
      list.value.map((item) => {
        weight.push(item.weight)
        value.push(item.price)
      })
      const len = weight.length,
        dp = Array.from({ length: len + 1 }).map(() => Array(size + 1).fill(0))

      for (let i = 1; i <= len; i++) {
        for (let j = 0; j <= size; j++) {
          if (weight[i - 1] <= j) {
            dp[i][j] = Math.max(
              dp[i - 1][j],
              value[i - 1] + dp[i - 1][j - weight[i - 1]]
            )
          } else {
            dp[i][j] = dp[i - 1][j]
          }
        }
      }

      console.table(dp)

      return dp[len][size]
    }

    /**
     * 优化版动态规划解决0-1背包问题
     * @param V	背包容量
     * @param N	物品种类
     * @param weight 物品重量
     * @param value	物品价值
     */
    const optimize = () => {
      let weight: number[] = []
      let value: number[] = []
      let size = volume.value
      list.value.map((item) => {
        weight.push(item.weight)
        value.push(item.price)
      })
      const len = weight.length
      let dp = Array(size + 1).fill(0)
      for (let i = 1; i <= len; i++) {
        for (let j = size; j >= weight[i - 1]; j--) {
          dp[j] = Math.max(dp[j], value[i - 1] + dp[j - weight[i - 1]])
        }
      }
      console.table(dp)
    }
    return {
      srcList,
      volume,
      weight,
      price,
      list,
      addRes,
      fracKnapsack,
      Greedy01,
      Force01,
      zeroOneKnapsack,
      optimize,
    }
  },
})
</script>
<style lang="less" scoped>
.wrapper {
  display: grid;
  grid-template-columns: 45% 55%;
  padding: 10px;
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
</style>
