<template>
  <button @click='TestLocal'>View for testing. Click me</button>
</template>
  
<script>
export default {
  data() {
    return {

    }
  },
  methods: {
    TestLocal: function () {
      localStorage.setItem("test", "test")
    }
  }
}
</script>