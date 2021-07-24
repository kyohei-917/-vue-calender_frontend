<template>
  <div id="app">
    <!-- <HelloWorld message="Hello World!" /> -->
    <Calendar />
  </div>
</template>

<script>
// import HelloWorld from './components/HelloWorld.vue';
import Calendar from './components/Calendar.vue';

export default {
  name: 'App',
  components: {
    // HelloWorld
    Calendar,
  },
};
</script>
