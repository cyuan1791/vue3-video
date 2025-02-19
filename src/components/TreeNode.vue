<script setup lang="ts">
//import { nodeModuleNameResolver } from "typescript";
import { onMounted, ref } from "vue";

interface TreeNodeData {
  label: string;
  children?: TreeNodeData[];
  videoUrl?: string;
  tcode?: string;
  path?: string;
  scode?: string;
}
const props = defineProps<{
  node: TreeNodeData;
}>();

const emit = defineEmits<{
  (e: "select-video", url: string): void;
}>();

const VIDEO_LOCATION = "videoLocation";
const isExpanded = ref(false);

const toggleNode = () => {
  var savedKey = "";
  var savedLocation = {};
  isExpanded.value = !isExpanded.value;
  console.log("toggle", isExpanded.value, props.node, props.node.label);
  // @ts-ignore
  savedKey = localStorage.getItem(VIDEO_LOCATION);
  if (savedKey) {
    savedLocation = JSON.parse(savedKey);
  }

  //savedLocation = JSON.parse(savedKey);
  // @ts-ignore
  savedLocation[props.node.label] = isExpanded.value;
  // @ts-ignore
  localStorage.setItem(VIDEO_LOCATION, JSON.stringify(savedLocation));
};

onMounted(() => {
  var savedKey = "";
  var savedLocation = {};
  console.log("onmount");
  console.log("node", isExpanded.value, props.node);
  // @ts-ignore
  savedKey = localStorage.getItem(VIDEO_LOCATION);
  if (savedKey) {
    savedLocation = JSON.parse(savedKey);
  }
  if (props.node.label in savedLocation) {
    // @ts-ignore
    isExpanded.value = savedLocation[props.node.label];
  }
});
const selectVideo = (url: string) => {
  emit("select-video", url);
};
</script>

<template>
  <div class="tree-node">
    <div
      class="node-content d-flex align-items-center"
      @click="
        node.videoUrl
          ? selectVideo(
              node.videoUrl +
                ',' +
                node.tcode +
                ',' +
                node.scode +
                ',' +
                node.path
            )
          : toggleNode()
      "
    >
      <i
        v-if="node.children"
        class="bi mr-2"
        :class="isExpanded ? 'bi-chevron-down' : 'bi-chevron-right'"
        >{{ isExpanded ? "▼" : "▶" }}</i
      >
      <i v-else class="bi bi-play-circle mr-2">▶</i>
      <span class="label" :class="{ 'text-primary': node.videoUrl }">{{
        node.label
      }}</span>
    </div>

    <div v-if="isExpanded && node.children" class="node-children">
      <TreeNode
        v-for="child in node.children"
        :key="child.label"
        :node="child"
        @select-video="selectVideo"
      />
    </div>
  </div>
</template>

<style scoped>
.tree-node {
  margin: 4px 0;
}

.node-content {
  cursor: pointer;
  padding: 4px;
}

.node-content:hover {
  background-color: rgba(0, 0, 0, 0.05);
}

.node-children {
  margin-left: 1.5rem;
  padding-left: 0.5rem;
  border-left: 1px solid #dee2e6;
}

.label {
  font-size: 0.9rem;
}
</style>
