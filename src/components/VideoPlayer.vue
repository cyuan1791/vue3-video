<script setup lang="ts">
import { onMounted, onBeforeUnmount, ref, watch } from "vue";
import videojs from "video.js";
import "video.js/dist/video-js.css";
import { storeLocal } from "../lib/storeLocal.ts";
const { getSavedTime, storeSavedTime, storeEndedTime } = storeLocal();

const videoElement = ref<HTMLVideoElement | null>(null);
const player = ref<any>(null);
const props = defineProps<{
  videoUrl: string;
  selectedPath: string;
  selectedPosterImage: string;
}>();

//console.log(props.videoUrl);

// Sample video URL - replace with your actual video URL
//const videoUrl = "https://vjs.zencdn.net/v/oceans.mp4";

watch(
  () => props.videoUrl,
  (newUrl) => {
    if (player) {
      player.value.src({ src: newUrl, type: "video/mp4" });
      player.value.poster(props.selectedPosterImage);
      //console.log("watch", props.selectedPosterImage);
      // Load saved position
      // Load saved position
      var savedTime = getSavedTime(props.selectedPath, props.videoUrl);

      if (savedTime) {
        player.value.currentTime(savedTime);
      }

      // Save position periodically
      player.value.on("timeupdate", () => {
        storeSavedTime(props.selectedPath, props.videoUrl, player);
      });
    }
  }
);

onMounted(() => {
  if (!videoElement.value) return;
  //console.log("init");
  // Initialize video.js player
  player.value = videojs(videoElement.value, {
    controls: true,
    fluid: true,
    sources: [
      {
        src: props.videoUrl,
        type: "video/mp4",
      },
    ],
  });

  var savedTime = getSavedTime(props.selectedPath, props.videoUrl);
  if (savedTime) {
    player.value.currentTime(savedTime);
  }
  player.value.on("ended", () => {
    storeEndedTime(props.selectedPath.replace(/\//g, ""));
    const element = document.getElementById(
      props.selectedPath.replace(/\//g, "")
    );
    if (element) element.classList.add("nodefinished");
    //console.log("find elementy", element);
  });

  // Save position periodically
  player.value.on("timeupdate", () => {
    storeSavedTime(props.selectedPath, props.videoUrl, player);
  });
});

onBeforeUnmount(() => {
  if (player.value) {
    player.value.dispose();
  }
});
</script>

<template>
  <div class="video-container">
    <video
      ref="videoElement"
      class="video-js vjs-default-skin vjs-big-play-centered"
    ></video>
  </div>
</template>

<style scoped>
.video-container {
  width: 100%;
  max-width: 800px;
  margin: 0 auto;
}
</style>
