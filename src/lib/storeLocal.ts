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
  var storedTime = {};
  var endedTime = {}

  const VIDEO_STORAGE_KEY = "video-time-position-a";


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
      // @ts-ignore
      storedTime[path] = {};
    }
    // @ts-ignore
    storedTime[path][vpath] = player.value.currentTime().toString();
    localStorage.setItem(VIDEO_STORAGE_KEY, JSON.stringify(storedTime));
    //localStorage.setItem(
  }

  const FINISHED_VIDEO_STORAGE_KEY = "video-finished";

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
  return { getSavedTime, storeSavedTime, isEndedTime, storeEndedTime };
}
