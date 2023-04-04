<template>
    <button @click = 'TestLocal'>Click me</button>
</template>
  
<script>
  export default {
    data() {
      return {

      }
    },
    methods: {
      TestLocal: function() {
        localStorage.setItem("test", "test")
      }
    }
  }
</script>