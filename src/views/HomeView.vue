<template>
  <div class="home">
    <HomeTopView
        v-on="$listeners"
        @dataChange="dataChange"
        @idChange="idChange"
    />


    <HomeMainComponent :url="url" :data="data" :id="id"/>

  </div>
</template>

<script>
import HomeTopView from "@/views/HomeView/HomeTopView.vue";
import HomeMainComponent from "@/components/HomeMainComponent.vue"

export default {
  data() {
    return {
      data: "recommend",
      id: undefined,
    };
  },

  computed: {
    url() {
      return `/api/rest/app/lists/${this.data}?id=${this.id}`;
    },
  },

  methods: {
    dataChange(value) {
      this.data = value;
      // console.log(this.data);
    },

    idChange(value) {
      this.id = value;
      // console.log(this.id);
    },
  },

  components: {
    HomeTopView,
    HomeMainComponent
  },
};
</script>


<style lang="scss" scoped>
.home {
  position: fixed;
  padding-bottom: 55px;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  overflow: auto;
}
</style>