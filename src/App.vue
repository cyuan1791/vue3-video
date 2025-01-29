<script setup lang="ts">
import { ref } from 'vue';
import TreeNode from './components/TreeNode.vue';
import VideoPlayer from './components/VideoPlayer.vue';

const treeData = {
  id: 1,
  label: 'Video Library',
  children: [
    {
      id: 2,
      label: 'Nature',
      children: [
        {
          id: 3,
          label: 'Ocean View',
          videoUrl: 'https://vjs.zencdn.net/v/oceans.mp4'
        }
      ]
    },
    {
      id: 4,
      label: 'Animals',
      children: [
        {
          id: 5,
          label: 'Big Buck Bunny',
          videoUrl: 'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4'
        }
      ]
    }
  ]
};

const selectedVideo = ref('https://vjs.zencdn.net/v/oceans.mp4');

const handleVideoSelect = (url: string) => {
  selectedVideo.value = url;
};
</script>

<template>
  <div class="container-fluid vh-100 d-flex flex-column">
    <nav class="navbar navbar-dark bg-dark">
      <span class="navbar-brand mb-0 h1">Video Library</span>
    </nav>
    
    <div class="row flex-grow-1">
      <!-- Tree Panel -->
      <div class="col-md-3 bg-light p-3 border-right">
        <div class="tree-container">
          <TreeNode 
            :node="treeData" 
            @select-video="handleVideoSelect"
          />
        </div>
      </div>
      
      <!-- Video Panel -->
      <div class="col-md-9 p-3">
        <div class="h-100 d-flex align-items-center justify-content-center">
          <VideoPlayer :video-url="selectedVideo" />
        </div>
      </div>
    </div>
  </div>
</template>

<style>
html, body {
  height: 100%;
  margin: 0;
}

#app {
  height: 100%;
}

.tree-container {
  overflow-y: auto;
  height: 100%;
}
</style>