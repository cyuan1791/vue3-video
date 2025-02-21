// @ts-nocheck

/* useCounter.js
import { ref } from "vue";
export function useCounter() {
  const count = ref(0);

  function increment() {
    count.value++;
  }

  function decrement() {
    count.value--;
  }

  return { count, increment, decrement };
} */
/* anyComponent.vue
import { useCounter } from './useCounter';
const { count, increment, decrement } = useCounter();

increment();
decrement();
console.log(count);
 */
// by convention, composable function names start with "use"
export function storeLocal() {

  const VIDEO_STORAGE_KEY = "video-time-position-a";
  var storedTime = {};


  function getSavedTime(path, vpath) {
    let savedTime = null;

    if (localStorage.getItem(VIDEO_STORAGE_KEY)) {
      storedTime = JSON.parse(localStorage.getItem(VIDEO_STORAGE_KEY));
    }
    if (path in storedTime) {
      if (vpath in storedTime[path]) {
        savedTime = parseFloat(storedTime[path][vpath]);
      }
    }
    return savedTime;
  }
  function storeSavedTime(path, vpath, player) {
    if (localStorage.getItem(VIDEO_STORAGE_KEY)) {
      storedTime = JSON.parse(localStorage.getItem(VIDEO_STORAGE_KEY));
    }

    if (!(path in storedTime)) {
      storedTime[path] = {};
    }
    storedTime[path][vpath] = player.value.currentTime().toString();
    localStorage.setItem(VIDEO_STORAGE_KEY, JSON.stringify(storedTime));
  }

  const FINISHED_VIDEO_STORAGE_KEY = "video-finished";
  var endedTime = {}

  function isEndedTime(path) {

    if (localStorage.getItem(FINISHED_VIDEO_STORAGE_KEY)) {
      endedTime = JSON.parse(localStorage.getItem(FINISHED_VIDEO_STORAGE_KEY));
    }
    if (path in endedTime) {
      return true
    }
    return false;
  }
  function storeEndedTime(path) {
    if (localStorage.getItem(FINISHED_VIDEO_STORAGE_KEY)) {
      endedTime = JSON.parse(localStorage.getItem(FINISHED_VIDEO_STORAGE_KEY));
    }

    endedTime[path] = {};
  
    // @ts-ignore
    //endedTime[path][vpath] = player.value.currentTime().toString();
    localStorage.setItem(FINISHED_VIDEO_STORAGE_KEY, JSON.stringify(endedTime));
    //localStorage.setItem(
  }

  const TREE_NAVIGATION_KEY = "video-navigation";

  var navStore = {}
  function getNav(path) {

    if (localStorage.getItem(TREE_NAVIGATION_KEY)) {
      navStore = JSON.parse(localStorage.getItem(TREE_NAVIGATION_KEY));
    }
    if (path in navStore) {
      return navStore[path]
    }
    return false;
  }
  function storeNav(path, isExpended) {
    if (localStorage.getItem(TREE_NAVIGATION_KEY)) {
      navStore = JSON.parse(localStorage.getItem(TREE_NAVIGATION_KEY));
    }

    navStore[path] = isExpended;
  
    // @ts-ignore
    //endedTime[path][vpath] = player.value.currentTime().toString();
    localStorage.setItem(TREE_NAVIGATION_KEY, JSON.stringify(navStore));
    //localStorage.setItem(
  }
  return { getSavedTime, storeSavedTime, isEndedTime, storeEndedTime, storeNav, getNav };
}
