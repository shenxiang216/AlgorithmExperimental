<template>
    <div id="nav">
      <router-link to="/home"
        > <i class="el-icon-share"></i>Experiment -
        1</router-link
      >
      | <router-link to="/second"><i class="el-icon-share"></i>Experiment - 2</router-link> |
      <router-link to="/third"><i class="el-icon-share"></i>Experiment - 3</router-link>
    </div>
    <router-view />
</template>

<style lang="less">
* {
  margin: 0;
  padding: 0;
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  padding:10px;
}

#nav {

  a {
    font-weight: bold;
    color: #2c3e50;
    margin: 10px;

    &.router-link-exact-active {
      color: var(--el-color-primary);
    }
  }
}
</style>
