<script setup lang="ts">
import { ref, onMounted, createVNode, render } from "vue";
import { KinesisContainer, KinesisElement } from 'vue-kinesis'

// @ts-ignore
import LoginPanel from "../components/LoginPanel.vue";
import PaintSplatter from "../components/PaintSplatter.vue";

const splatters = ref([])

function shuffleDecorations() {
  let decorations = document.querySelectorAll(".decoration")

  for (let i = 0; i < decorations.length; i++) {
    let decoration = decorations[i]
    let x = Math.floor(Math.random() * (window.innerWidth))
    let y = Math.floor(Math.random() * (window.innerHeight))
    console.log(x,y)
    decoration.style.left = x + "px"
    decoration.style.top = y + "px"
  }
}

function addSplatters(count: number) {
  for (let i = 0; i < count; i++) {
    splatters.value.push(createVNode(PaintSplatter))
  }
}

  onMounted(async () => {
    await addSplatters(15)
    shuffleDecorations()
  })
</script>

<template>
  <kinesis-container>
    <main id="background">
    <PaintSplatter class="decoration" v-for="splatter in splatters" :key="splatter"/>
      <LoginPanel class="panel"></LoginPanel>
      <kinesis-element :strength="20" type="depth">
        <span class="math decoration">ax² + bx + c = 0</span>
      </kinesis-element>
      <br>
      <kinesis-element :strength="20" type="depth">
        <span class="math decoration">f'(x) = anⁿ⁻¹</span>
      </kinesis-element>
      <br>
      <kinesis-element :strength="20" type="depth">
        <span class="math decoration">sin²(x) + cos²(x) = 1</span>
      </kinesis-element>
      <br>
      <kinesis-element :strength="20" type="depth">
        <span class="math decoration">
          ∫xⁿ = (xⁿ⁺¹/ n+1) + C
        </span>
      </kinesis-element>
    </main>
  </kinesis-container>
</template>

<style scoped>
@import 'https://fonts.googleapis.com/css2?family=Nanum+Pen+Script&display=swap';

#background {
  background-image: url("../assets/superpaper.jpg");
  background-repeat: repeat;
  background-size: cover;
  height: 100vh;
  width: 100vw;
  overflow: hidden;
}

.math {
  position: absolute;
  font-family: 'Nanum Pen Script', cursive;
  font-size: 3em;
  color: #00F;
}

.panel {
  z-index: 10;
}

.decoration {
  position: absolute;
  z-index: 1;
}

@media (max-width: 600px) {
  .decoration {
    display: none;
  }
}
</style>
