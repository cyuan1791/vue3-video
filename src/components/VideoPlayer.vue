<script setup lang="ts">
import { onMounted, onBeforeUnmount, ref, watch } from "vue";
import videojs from "video.js";
import "video.js/dist/video-js.css";

const videoElement = ref<HTMLVideoElement | null>(null);
const player = ref<any>(null);
const props = defineProps<{
  videoUrl: string;
  selectedPage: string;
}>();

var storedTime = {};

//console.log(props.videoUrl);

const VIDEO_STORAGE_KEY = "video-time-position-a";

// Sample video URL - replace with your actual video URL
//const videoUrl = "https://vjs.zencdn.net/v/oceans.mp4";

watch(
  () => props.videoUrl,
  (newUrl) => {
    if (player) {
      player.value.src({ src: newUrl, type: "video/mp4" });
      // Load saved position
      // Load saved position
      var savedTime: any = "";
      // @ts-ignore
      storedTime = JSON.parse(localStorage.getItem(VIDEO_STORAGE_KEY));
      if (props.selectedPage in storedTime) {
        // @ts-ignore
        if (props.selectedPage in storedTime) {
          savedTime = parseFloat(
            //@ts-ignore
            storedTime[props.selectedPage][props.videoUrl]
          );
        }
      }

      if (savedTime) {
        player.value.currentTime(parseFloat(savedTime));
      }

      // Save position periodically
      player.value.on("timeupdate", () => {
        if (!(props.selectedPage in storedTime)) {
          // @ts-ignore
          storedTime[props.selectedPage] = {};
        }
        // @ts-ignore
        storedTime[props.selectedPage][props.videoUrl] = player.value
          .currentTime()
          .toString();
        localStorage.setItem(VIDEO_STORAGE_KEY, JSON.stringify(storedTime));
        //localStorage.setItem(
        //  VIDEO_STORAGE_KEY,
        //  player.value.currentTime().toString()
        // );
      });
    }
  }
);

onMounted(() => {
  if (!videoElement.value) return;
  console.log("init");
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

  // Load saved position
  var savedTime: any = "";
  // @ts-ignore
  storedTime = JSON.parse(localStorage.getItem(VIDEO_STORAGE_KEY));
  if (!storedTime) {
    storedTime = {};
  }
  if (props.selectedPage in storedTime) {
    // @ts-ignore
    if (props.selectedPage in storedTime) {
      //@ts-ignore
      savedTime = parseFloat(storedTime[props.selectedPage][props.videoUrl]);
    }
  }
  console.log("init 2");
  if (savedTime) {
    player.value.currentTime(parseFloat(savedTime));
  }

  // Save position periodically
  player.value.on("timeupdate", () => {
    if (!(props.selectedPage in storedTime)) {
      // @ts-ignore
      storedTime[props.selectedPage] = {};
    }
    // @ts-ignore
    storedTime[props.selectedPage][props.videoUrl] = player.value
      .currentTime()
      .toString();
    console.log(storedTime);
    localStorage.setItem(VIDEO_STORAGE_KEY, JSON.stringify(storedTime));
    //localStorage.setItem(
    //  VIDEO_STORAGE_KEY,
    //  player.value.currentTime().toString()
    // );
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
