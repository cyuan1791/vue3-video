<script setup lang="ts">
//import { nodeModuleNameResolver } from "typescript";
import { onMounted, ref, computed } from "vue";
import { storeLocal } from "../lib/storeLocal.ts";
const { isEndedTime, storeNav, getNav } = storeLocal();
interface TreeNodeData {
  label: string;
  children?: TreeNodeData[];
  videoUrl?: string;
  tcode?: string;
  path?: string;
  scode?: string;
  posterImage?: string;
}
const props = defineProps<{
  node: TreeNodeData;
}>();

const emit = defineEmits<{
  (e: "select-video", url: string): void;
}>();

//const VIDEO_LOCATION = "videoLocation";
const isExpanded = ref(false);

const contentId = computed(() => {
  if (props.node.children) {
    return "";
  }
  return props.node.path?.replace(/\//g, "");
});

const toggleNode = () => {
  isExpanded.value = !isExpanded.value;

  storeNav(props.node.label, isExpanded.value);
};

function isVideoDone(path: any) {
  return isEndedTime(path.replace(/\//g, ""));
}

onMounted(() => {
  isExpanded.value = getNav(props.node.label);
});

const selectVideo = (data: string) => {
  emit("select-video", data);
};
</script>

<template>
  <div class="tree-node">
    <div
      :class="{ nodefinished: isVideoDone(contentId) }"
      :id="contentId"
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
                node.path +
                ',' +
                node.posterImage
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
.nodefinished {
  background-color: rgb(204, 192, 215);
}

.label {
  font-size: 0.9rem;
}
</style>
