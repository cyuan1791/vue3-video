<script setup lang="ts">
import { ref } from "vue";
import TreeNode from "./components/TreeNode.vue";
import VideoPlayer from "./components/VideoPlayer.vue";
let myWindow = window as any;
let treeData = JSON.parse(atob(myWindow.asoneData));
let roleTree = {
  label: "",
  children: [],
};
console.log(treeData);

let introVideo = JSON.parse(atob(myWindow.asoneIntroVideo));

let myRole = myWindow.asoneRoles.split(",");
////console.log(myWindow.asoneRoles);
//console.log(myRole);

// the treeData has entire classes with role defined
// extract the treeData contain myRole to roleTree
// use the roleTree
for (const key in treeData) {
  if (key == "children") continue;
  // @ts-ignore
  roleTree[key] = treeData[key];

  //console.log(key);
}
for (const item of treeData["children"]) {
  outerLoop: for (const c of item["role"]) {
    // check if this class belong to my role
    for (const r of myRole) {
      if (c == r) {
        // @ts-ignore
        roleTree["children"].push(item);
        break outerLoop;
      }
      //console.log('Compare ',c, r)
    }
  }
}
////console.log(roleTree);
/* const treeData = {'children': [{'children': [{'label': '0-one-fun-video',
                             'videoUrl': '/default/media/nav6h0/s/ClassA/A000001027001001/oneColumnClass/174860-852215326_medium.mp4'},
                            {'label': '1-one-fun-video',
                             'videoUrl': '/default/media/nav6h0/s/Classes/LessonOne/A000001027001001/oneColumnClass/3723-173719869_medium.mp4'},
                            {'label': '2-one-fun-video',
                             'videoUrl': '/default/media/nav6h0/s/Classes/LessonOne/A000001027001001/oneColumnClass/3723-173719869_medium.mp4'},
                            {'label': '3-one-fun-video',
                             'videoUrl': '/default/media/nav6h0/s/Classes/LessonOne/A000001027001001/oneColumnClass/3723-173719869_medium.mp4'}],
               'label': 'ClassA',
               'path': 'nav6h3/ClassA/s/Lesson/0-one-fun-video',
               'role': ['classA']},
              {'children': [{'children': [{'label': '0-one-fun-video',
                                           'videoUrl': '/default/media/nav6h0/s/Classes/LessonOne/A000001027001001/oneColumnClass/3723-173719869_medium.mp4'},
                                          {'label': '1-one-fun-video',
                                           'videoUrl': '/default/media/nav6h0/s/Classes/LessonOne/A000001027001001/oneColumnClass/3723-173719869_medium.mp4'},
                                          {'label': '2-one-fun-video',
                                           'videoUrl': '/default/media/nav6h0/s/Classes/LessonOne/A000001027001001/oneColumnClass/3723-173719869_medium.mp4'},
                                          {'label': '3-one-fun-video',
                                           'videoUrl': '/default/media/nav6h0/s/Classes/LessonOne/A000001027001001/oneColumnClass/3723-173719869_medium.mp4'}],
                             'label': 'LessonOne'}],
               'label': 'Classes',
               'path': 'nav6h3/Classes/LessonOne/s/Lesson/0-one-fun-video',
               'role': ['classA', 'classB', 'classC']},
              {'children': [{'children': [{'label': '0-one-fun-video',
                                           'videoUrl': '/default/media/nav6h0/s/Classes/LessonOne/A000001027001001/oneColumnClass/3723-173719869_medium.mp4'},
                                          {'label': '1-one-fun-video',
                                           'videoUrl': '/default/media/nav6h0/s/Classes/LessonOne/A000001027001001/oneColumnClass/3723-173719869_medium.mp4'},
                                          {'label': '2-one-fun-video',
                                           'videoUrl': '/default/media/nav6h0/s/Classes/LessonOne/A000001027001001/oneColumnClass/3723-173719869_medium.mp4'},
                                          {'label': '3-one-fun-video',
                                           'videoUrl': '/default/media/nav6h0/s/Classes/LessonOne/A000001027001001/oneColumnClass/3723-173719869_medium.mp4'}],
                             'label': 'LessonTwo'}],
               'label': 'Classes',
               'path': 'nav6h3/Classes/LessonTwo/s/Lesson/0-one-fun-video',
               'role': ['classA', 'classB']}],
 'label': 'Top'}
 */
//const selectedVideo = ref("https://vjs.zencdn.net/v/oceans.mp4");
// @ts-ignore
const selectedVideo = ref(introVideo["url"]);
// @ts-ignore
const selectedtcode = ref("");
// @ts-ignore
const selectedscode = ref("");
// @ts-ignore
const selectedPage = ref("default");

const handleVideoSelect = (data: string) => {
  let a = data.split(",");
  selectedVideo.value = a[0]; // video path
  //console.log(selectedVideo);
  selectedtcode.value = atob(a[1]); // bottom hmtl in base64/json
  selectedscode.value = atob(a[2]); // top html in base/json
  selectedPage.value = a[3]; // top html in base/json
};
</script>

<template>
  <div class="container-fluid vh-100 d-flex flex-column">
    <div class="row flex-grow-1">
      <!-- Video Panel -->
      <div class="col-md-9 p-3">
        <div class="h-100 d-flex flex-column">
          <div v-html="selectedscode"></div>
          {{ selectedPage }} {{ selectedVideo }}
          <VideoPlayer :videoUrl="selectedVideo" :selectedPage="selectedPage" />

          <div v-html="selectedtcode"></div>
        </div>
      </div>
      <!-- Tree Panel -->
      <div class="col-md-3 bg-light p-3 border-right">
        <div class="tree-container">
          <TreeNode :node="roleTree" @select-video="handleVideoSelect" />
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
