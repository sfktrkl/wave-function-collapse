<template>
  <div class="center">Wave Function Collapse</div>
  <div class="center">
    <canvas ref="world"></canvas>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { Drawer } from "./Drawer";
import { World } from "./World";

export default defineComponent({
  data() {
    return {
      world: new World(20, 20),
      drawer: null as Drawer | null,
    };
  },
  mounted() {
    this.drawer = new Drawer(
      this.world as World,
      this.$refs.world as HTMLCanvasElement
    );
    this.drawer.update();

    const iterationInterval = setInterval(() => {
      if (!this.world.waveFunctionCollapse()) clearInterval(iterationInterval);
      if (this.drawer) this.drawer.update();
    }, 0);
  },
});
</script>

<style scoped>
.center {
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 12px;
}
</style>
