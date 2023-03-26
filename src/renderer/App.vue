<template>
  <a-config-provider>
    <router-view></router-view>
  </a-config-provider>
</template>
<style lang="less">
@import url("./styles/common.less");

html,
body,
#app {
  width: 100%;
  height: 100%;
  margin: 0;
  padding: 0;
}
</style>
