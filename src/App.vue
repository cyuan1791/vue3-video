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
//const selectedVideo = ref("https://vjs.zencdn.net/v/oceans.mp4");
// @ts-ignore
const selectedVideo = ref(introVideo["url"]);
// @ts-ignore
const selectedtcode = ref("");
// @ts-ignore
const selectedscode = ref("");
// @ts-ignore
const selectedPath = ref("default");

const handleVideoSelect = (data: string) => {
  let a = data.split(",");
  selectedVideo.value = a[0]; // video file
  //console.log(selectedVideo);
  selectedtcode.value = atob(a[1]); // bottom hmtl in base64/json
  selectedscode.value = atob(a[2]); // top html in base/json
  selectedPath.value = a[3]; // path
};
</script>

<template>
  <div class="container-fluid vh-100 d-flex flex-column">
    <div class="row flex-grow-1">
      <!-- Video Panel -->
      <div class="col-md-9 p-3">
        <div class="h-100 d-flex flex-column">
          <div v-html="selectedscode"></div>
          {{ selectedPath }} {{ selectedVideo }}
          <VideoPlayer :videoUrl="selectedVideo" :selectedPath="selectedPath" />

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
