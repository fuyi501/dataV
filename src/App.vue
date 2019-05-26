<template>
  <div id="app">
    <Layout>
      <Header :style="{width: '100%'}" style="padding-bottom:20px;">
        <MyHeader />
      </Header>
      <Content>
        <router-view />
      </Content>
    </Layout>
  </div>
</template>

<script>
import MyHeader from "@/components/header/Header3.vue";

export default {
  components: {
    MyHeader
  }
}
</script>

<style lang="less">
#app {
  font-family: "microsoft yahei", Arial, sans-serif, "Avenir", Helvetica;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  // text-align: center;
  color: #0a4271;
  // background-color: red;
  // background-image: url('./assets/wrapper-bg.png');
  // height: 780px;
}

</style>
