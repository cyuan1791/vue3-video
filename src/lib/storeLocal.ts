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
  var storedArray = {};

  if (!localStorage.getItem(VIDEO_STORAGE_KEY)) {
    storedArray = {}
    storedArray['savedTime'] = {}
    storedArray['savedTime']['data'] = {}
    storedArray['ended'] = {}
    storedArray['ended']['data'] = {}
    storedArray['nav'] = {}
    storedArray['nav']['data'] = {}
    localStorage.setItem(VIDEO_STORAGE_KEY, JSON.stringify(storedArray))
  }


  function getSavedTime(path, vpath) {
    let savedTime = null;

    storedArray = JSON.parse(localStorage.getItem(VIDEO_STORAGE_KEY));
  
    if (path in storedArray['savedTime']['data']) {
      if (vpath in storedArray['savedTime']['data'][path]) {
        savedTime = parseFloat(storedArray['savedTime']['data'][path][vpath]);
      }
    }
    return savedTime;
  }
  function storeSavedTime(path, vpath, player) {
      storedArray = JSON.parse(localStorage.getItem(VIDEO_STORAGE_KEY));
    

    if (!(path in storedArray['savedTime']['data'])) {
      storedArray['savedTime']['data'][path] = {};
    }
    storedArray['savedTime']['data'][path][vpath] = player.value.currentTime().toString();
    localStorage.setItem(VIDEO_STORAGE_KEY, JSON.stringify(storedArray));
  }


  function isEndedTime(path) {

    storedArray = JSON.parse(localStorage.getItem(VIDEO_STORAGE_KEY));
    
    if (path in storedArray['ended']['data']) {
      return true
    }
    return false;
  }
  function storeEndedTime(path) {
    storedArray = JSON.parse(localStorage.getItem(VIDEO_STORAGE_KEY));
    

    storedArray['ended']['data'][path] = {};
  
    // @ts-ignore
    //endedTime[path][vpath] = player.value.currentTime().toString();
    localStorage.setItem(VIDEO_STORAGE_KEY, JSON.stringify(storedArray));
    //localStorage.setItem(
  }


  function getNav(path) {

      storedArray = JSON.parse(localStorage.getItem(VIDEO_STORAGE_KEY));
    
    if (path in storedArray['nav']['data']) {
      return storedArray['nav']['data'][path]
    }
    return false;
  }
  function storeNav(path, isExpended) {
      storedArray = JSON.parse(localStorage.getItem(VIDEO_STORAGE_KEY));
    

      storedArray['nav']['data'][path] = isExpended;
  
    // @ts-ignore
    //endedTime[path][vpath] = player.value.currentTime().toString();
    localStorage.setItem(VIDEO_STORAGE_KEY, JSON.stringify(storedArray));
    //localStorage.setItem(
  }
  return { getSavedTime, storeSavedTime, isEndedTime, storeEndedTime, storeNav, getNav };
}
