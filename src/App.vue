<script setup lang="ts">
import { ref } from "vue";
import TreeNode from "./components/TreeNode.vue";
import VideoPlayer from "./components/VideoPlayer.vue";

const treeData = {'children': [{'children': [{'label': '0-one-fun-video',
                             'videoUrl': '/default/media/nav6h0/s/Classes/LessonOne/A000001027001001/oneColumnClass/3723-173719869_medium.mp4'},
                            {'label': '1-one-fun-video',
                             'videoUrl': '/default/media/nav6h0/s/Classes/LessonOne/A000001027001001/oneColumnClass/3723-173719869_medium.mp4'},
                            {'label': '2-one-fun-video',
                             'videoUrl': '/default/media/nav6h0/s/Classes/LessonOne/A000001027001001/oneColumnClass/3723-173719869_medium.mp4'},
                            {'label': '3-one-fun-video',
                             'videoUrl': '/default/media/nav6h0/s/Classes/LessonOne/A000001027001001/oneColumnClass/3723-173719869_medium.mp4'}],
               'label': 'ClassA'},
              {'children': [{'children': [{'label': '0-one-fun-video',
                                           'videoUrl': '/default/media/nav6h0/s/Classes/LessonOne/A000001027001001/oneColumnClass/3723-173719869_medium.mp4'},
                                          {'label': '1-one-fun-video',
                                           'videoUrl': '/default/media/nav6h0/s/Classes/LessonOne/A000001027001001/oneColumnClass/3723-173719869_medium.mp4'},
                                          {'label': '2-one-fun-video',
                                           'videoUrl': '/default/media/nav6h0/s/Classes/LessonOne/A000001027001001/oneColumnClass/3723-173719869_medium.mp4'},
                                          {'label': '3-one-fun-video',
                                           'videoUrl': '/default/media/nav6h0/s/Classes/LessonOne/A000001027001001/oneColumnClass/3723-173719869_medium.mp4'}],
                             'label': 'LessonOne'},
                            {'children': [{'label': '0-one-fun-video',
                                           'videoUrl': '/default/media/nav6h0/s/Classes/LessonOne/A000001027001001/oneColumnClass/3723-173719869_medium.mp4'},
                                          {'label': '1-one-fun-video',
                                           'videoUrl': '/default/media/nav6h0/s/Classes/LessonOne/A000001027001001/oneColumnClass/3723-173719869_medium.mp4'},
                                          {'label': '2-one-fun-video',
                                           'videoUrl': '/default/media/nav6h0/s/Classes/LessonOne/A000001027001001/oneColumnClass/3723-173719869_medium.mp4'},
                                          {'label': '3-one-fun-video',
                                           'videoUrl': '/default/media/nav6h0/s/Classes/LessonOne/A000001027001001/oneColumnClass/3723-173719869_medium.mp4'}],
                             'label': 'LessonTwo'}],
               'label': 'Classes'}],
 'label': 'Top'};
const selectedVideo = ref("https://vjs.zencdn.net/v/oceans.mp4");

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
          <TreeNode :node="treeData" @select-video="handleVideoSelect" />
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
html,
body {
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
