<script setup lang="ts">
import { ref } from 'vue';

interface TreeNodeData {
  id: number;
  label: string;
  children?: TreeNodeData[];
  videoUrl?: string;
}

const props = defineProps<{
  node: TreeNodeData;
}>();

const emit = defineEmits<{
  (e: 'select-video', url: string): void
}>();

const isExpanded = ref(false);

const toggleNode = () => {
  isExpanded.value = !isExpanded.value;
};

const selectVideo = (url: string) => {
  emit('select-video', url);
};
</script>

<template>
  <div class="tree-node">
    <div 
      class="node-content d-flex align-items-center" 
      @click="node.videoUrl ? selectVideo(node.videoUrl) : toggleNode()"
    >
      <i 
        v-if="node.children"
        class="bi mr-2"
        :class="isExpanded ? 'bi-chevron-down' : 'bi-chevron-right'"
      >{{ isExpanded ? '▼' : '▶' }}</i>
      <i 
        v-else
        class="bi bi-play-circle mr-2"
      >▶</i>
      <span 
        class="label"
        :class="{ 'text-primary': node.videoUrl }"
      >{{ node.label }}</span>
    </div>
    
    <div v-if="isExpanded && node.children" class="node-children">
      <TreeNode
        v-for="child in node.children"
        :key="child.id"
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