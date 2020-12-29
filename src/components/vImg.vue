<template>
  <div v-if="imgSrc" class="img">
    <img :src="imgSrc" :alt="alt" :title="title">
  </div>
</template>

<script>
export default {
  name: "vImg",
  props: ["src", "alt", "title"],
  data() {
    return {
      imgSrc: null
    }
  },
  watch: {
    src() {
      this.imgSrc = null;
      let oImg = new Image();
      oImg.src = this.src;
      oImg.onload = () => {
        this.imgSrc = this.src;
      }
    }
  }
}
</script>

<style scoped>
.img {
  font-size: 0;
  display: inline-block;
}

img {
  width: 100%;
  height: 100%;
}
</style>
