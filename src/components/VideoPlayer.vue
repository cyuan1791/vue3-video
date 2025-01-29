<script setup lang="ts">
import { onMounted, onBeforeUnmount, ref, watch } from 'vue';
import videojs from 'video.js';
import 'video.js/dist/video-js.css';

const props = defineProps<{
  videoUrl: string;
}>();

const videoRef = ref<HTMLVideoElement | null>(null);
let player: any = null;

const initializePlayer = () => {
  if (videoRef.value) {
    player = videojs(videoRef.value, {
      controls: true,
      fluid: true,
      sources: [{
        src: props.videoUrl,
        type: 'video/mp4'
      }]
    });
  }
};

watch(() => props.videoUrl, (newUrl) => {
  if (player) {
    player.src({ src: newUrl, type: 'video/mp4' });
  }
});

onMounted(() => {
  initializePlayer();
});

onBeforeUnmount(() => {
  if (player) {
    player.dispose();
  }
});
</script>

<template>
  <div class="video-container h-100">
    <video
      ref="videoRef"
      class="video-js vjs-default-skin vjs-big-play-centered"
    ></video>
  </div>
</template>

<style scoped>
.video-container {
  width: 100%;
}

:deep(.video-js) {
  width: 100%;
  height: 100%;
  min-height: 300px;
}
</style>