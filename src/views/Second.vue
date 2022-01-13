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
        <el-input
          size="mini"
          v-model="n"
          placeholder="请输入数组各个元素，以空格作为隔"
          @input="Handle"
        />
        <el-input size="mini" v-model="target" placeholder="请输入目标元素" />
        <el-button type="primary" round @click="btn1">判断排序状态</el-button>
        <el-button type="primary" round @click="btn2"
          >顺序检索并统计出现次数</el-button
        >
        <el-button type="primary" round @click="btn3"
          >多种方法检索并统计出现次数</el-button
        >
        <el-button type="primary" round @click="btn4"
          >二分或者三分查找最大值并统计比较比较次数</el-button
        >
        <el-button type="primary" round @click="btn5"
          >多种方法寻找最小元素并统计比较次数</el-button
        >
      </div>
      <div class="show">
        算法过程展示区域
        {{ out }}
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent, ref } from 'vue'
import img2_1 from '../assets/2.1.png'
import img2_2 from '../assets/2.2.png'
export default defineComponent({
  setup() {
    const srcList = ref([img2_1, img2_2])
    const n = ref<string>('')
    const arr = ref<number[]>([])
    const target = ref<number>(0)
    const out = ref<string>('')

    // 处理输入数组
    const Handle = () => {
      arr.value = n.value.split(' ').map(Number)
    }

    //判断数组是否为升序
    const isUpSort = (array: number[]) => {
      for (let i = 0; i < array.length - 1; i++) {
        if (array[i] > array[i + 1]) {
          return false
        }
      }
      return true
    }

    //判断数组是否为降序
    const isDownSort = (array: number[]) => {
      for (let i = 0; i < array.length - 1; i++) {
        if (array[i] < array[i + 1]) {
          return false
        }
      }
      return true
    }

    //得到数组最大值下标
    const getMaxIndex = (arr: number[]) => {
      //得到数组最大值的下标
      let max = arr[0]
      let max_index = 0
      for (let x = 1; x < arr.length; x++) {
        //注意这里不要越界
        if (arr[x] > max) {
          max = arr[x]
          max_index = x
        }
      }
      return max_index
    }

    //得到数组最小值下标
    const getMinIndex = (arr: number[]) => {
      //得到数组最小值的下标
      let min = arr[0]
      let min_index = 0
      for (let x = 1; x < arr.length; x++) {
        //注意这里不要越界
        if (arr[x] < min) {
          min = arr[x]
          min_index = x
        }
      }
      return min_index
    }

    //判断数组为何种类型算法
    const arraySortAlgorithm = (arr: number[]) => {
      let result = 0 //乱码序号
      let maxIndex = getMaxIndex(arr) //得到最大值数组下标
      let minIndex = getMinIndex(arr) //得到最小值数组下标
      if (maxIndex == arr.length - 1 && minIndex == 0) {
        if (isUpSort(arr)) {
          console.log('为升序数组')
          result = 1
        } else {
          console.log('为乱序数组')
        }
      } else if (maxIndex == 0 && minIndex == arr.length - 1) {
        if (isDownSort(arr)) {
          console.log('为降序数组')
          result = 2
        } else {
          console.log('为乱序数组')
        }
      } else if (0 < minIndex && minIndex < arr.length - 1) {
        let downArr = [minIndex + 1]
        for (let i = 0; i < minIndex + 1; i++) {
          downArr[i] = arr[i]
        }
        let upArr = [arr.length - minIndex]
        for (let i = 0; i < arr.length - minIndex; i++) {
          upArr[i] = arr[minIndex + i]
        }
        if (isDownSort(downArr) && isUpSort(upArr)) {
          console.log('为先降序后升序数组')
          result = 3
        } else {
          console.log('为乱序数组')
        }
      } else if (0 < maxIndex && maxIndex < arr.length - 1) {
        let upArr = [maxIndex + 1]
        for (let i = 0; i < maxIndex + 1; i++) {
          upArr[i] = arr[i]
        }
        let downArr = [arr.length - maxIndex]
        for (let i = 0; i < arr.length - maxIndex; i++) {
          downArr[i] = arr[maxIndex + i]
        }
        if (isDownSort(downArr) && isUpSort(upArr)) {
          console.log('为先升序后降序数组')
          result = 4
        } else {
          console.log('为乱序数组')
        }
      } else {
        console.log('为乱序数组')
      }
      return result
    }

    //顺序检索
    const arrayOrderSearch = (arr: number[], tag: number) => {
      for (let i = 0; i < arr.length; i++) {
        if (arr[i] == tag) {
          console.log('该数组中存在目标元素', '查找次数：', i + 1)
          return i + 1 //返回匹配次数
        }
      }
      console.log('该数组中无目标元素')
      return arr.length
    }

    //二分检索升、降序数组
    const arrayBinarySearch = (arr: number[], num: number, x: number) => {
      let left = 0
      let right = num - 1
      let count = 0
      while (left <= right) {
        count++
        let mid = Math.floor((left + right) / 2)
        if (x > arr[mid]) left = mid + 1
        else if (x < arr[mid]) right = mid - 1
        else {
          console.log('查找次数：', count)
          return [mid, count]
        }
      }
      console.log('该数组中无目标元素')
      return [-1, count]
    }

    //三分检索升、降序数组
    const arrayTernarySearch = (arr: number[], tag: number) => {
      let i = 0
      let left = 0
      let right = arr.length - 1
      let arr2 = arr.sort((a, b) => a - b)
      if (isUpSort(arr2)) {
        if (tag < arr2[left] || tag > arr2[right]) {
          console.log('目标元素没有出现在该数组中')
          return 0
        }
        while (left < right) {
          let midl = Math.floor(left + (right - left) / 3)
          let midr = Math.floor(right - (right - left) / 3)
          i++
          if (arr2[midl] > tag) {
            right = midl - 1
          } else if (arr2[midr] < tag) {
            left = midr + 1
          } else {
            console.log('目标元素出现在该数组中')
            return i + 2
          }
        }
      } else if (isDownSort(arr2)) {
        if (tag > arr2[left] || tag < arr[right]) {
          console.log('目标元素没有出现在该数组中')
          return 0
        }
        while (left < right) {
          let midl = Math.floor(left + (right - left) / 3)
          let midr = Math.floor(right - (right - left) / 3)

          i++
          if (arr2[midl] < tag) {
            right = midl - 1
          } else if (arr2[midr] > tag) {
            left = midr + 1
          } else {
            console.log('目标元素出现在该数组中')
            return i + 2
          }
        }
      } else {
        console.log('该数组不符合升序或降序要求')
        return -1
      }
      return -1
    }

    /**
     * 说明：插值查找算法，也要求数组是有序的
     * @param arr 数组
     * @param left 左边索引
     * @param right 右边索引
     * @param findVal 查找值
     * @return 如果找到，就返回对应的下标，如果没有找到，返回-1
     */
    const insertValueSearch = (
      arr: number[],
      left: number,
      right: number,
      findVal: number
    ): number => {
      //注意：findVal < arr[0]  和  findVal > arr[arr.length - 1] 必须需要
      //否则我们得到的 mid 可能越界
      if (left > right || findVal < arr[0] || findVal > arr[arr.length - 1]) {
        console.log('目标元素没有出现在该数组中')
        return -1
      }
      // 求出mid, 自适应
      let mid =
        left +
        ((right - left) * (findVal - arr[left])) / (arr[right] - arr[left])
      let midVal = arr[mid]
      if (findVal > midVal) {
        // 说明应该向右边递归
        return insertValueSearch(arr, mid + 1, right, findVal)
      } else if (findVal < midVal) {
        // 说明向左递归查找
        return insertValueSearch(arr, left, mid - 1, findVal)
      } else {
        return mid
      }
    }

    //二分检索求先升后降数组最大值
    const arrayUptoDownBinarySearchMax = (arr2: number[]) => {
       let arr = [...arr2]
      let left = 0
      let right = arr.length - 1
      let i = 0
      debugger
      while (left <= right) {
        
        let mid = Math.floor((left + right) / 2)
        i++
        if (arr[mid] > arr[mid - 1] && arr[mid] > arr[mid + 1]) {
          return [arr[mid], i]
        } else if (arr[mid] < arr[mid - 1]) {
          right = mid - 1
        } else if (arr[mid] < arr[mid + 1]) {
          left = mid + 1
        }
      }
      return [-1, 1]
    }
    //三分检索求先升后降数组最大值
    const trisection_searchMax = (A1: number[]) => {
      let A = [...A1]
      if (A == null) {
        return [-1, 1]
      }

      let left = 0
      let right = A.length - 1
      let i = 0
      while (left < right-1) {
        i++
        let mid = Math.floor((right + left) / 2)
        let mmid = Math.floor((right + mid) / 2)
        if (A[mid] > A[mmid]) {
          right = mid
        } else {
          left = mid
        }
      }
      return A[left]>A[right] ?[A[left], i]:[A[right], i]
    }

    /**
     * 蛮力法
     */
    const mainPower = (arr: number[], k: number) => {
      let maxarr = [0]
      let count = 0
      let arr2 = [...arr]
      for (let i = 0; i < k; i++) {
        let max = arr2[0]
        for (let j = 0; j < arr2.length; j++) {
          if (arr2[j] < max) {
            max = arr2[j]
          }
          count++
        }
        maxarr[i] = max
        arr2.splice(arr2.indexOf(max), 1)
      }
      return [maxarr[k - 1], count]
    }

    /**
     * 预排序
     */
    const preSort = (arr: number[], k: number) => {
      let count = 0
      arr.sort((a, b) => {
        count++
        return b - a
      })
      return [arr[k - 1], count]
    }

    /**
     * btn1
     */
    const btn1 = () => {
      arraySortAlgorithm(arr.value)
    }

    /**
     * btn2
     */
    const btn2 = () => {
      arrayOrderSearch(arr.value, target.value)
    }

    /**
     * btn3
     */
    const btn3 = () => {
      let arr2 = arr.value
      console.log('顺序查找：', arrayOrderSearch(arr2, target.value))
      console.log(
        '二分查找：',
        arrayBinarySearch(arr2, arr2.length, target.value)[1]
      )
      console.log('三分查找：', arrayTernarySearch(arr2, target.value))
      console.log(
        '插值查找：',
        insertValueSearch(arr.value, 0, arr.value.length - 1, target.value)
      )
    }

    /**
     * btn4
     */
    const btn4 = () => {
      let arr2 = [...arr.value]
      console.table({
        最大值: arrayUptoDownBinarySearchMax(arr2)[0],
        查找次数: arrayUptoDownBinarySearchMax(arr2)[1],
      })
      console.table({
        最大值: trisection_searchMax(arr2)[0],
        查找次数: trisection_searchMax(arr2)[1],
      })
    }

    /**
     * btn5
     */
    const btn5 = () => {
      let arr2 = [...arr.value]
      console.table({
        第k个最小值: mainPower(arr2, 2)[0],
        查找次数: mainPower(arr2, 2)[1],
      })
      console.table({
        第k个最小值: preSort(arr2, 2)[0],
        查找次数: preSort(arr2, 2)[1],
      })
    }

    return { n, srcList, target, out, Handle, btn1, btn2, btn3, btn4, btn5 }
  },
})
</script>
<style lang="less" scoped>
.wrapper {
  display: grid;
  grid-template-columns: 40% 60%;
  gap: 10px;
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
