
<!--The view for testing, nothing to display here-->

<template>
  <button @click='TestLocal'>View for testing. Click me</button>
</template>
  
<script>
export default {
  data() {
    return {
      nothing: none
    }
  },
  methods: {
    TestLocal: function () {
      localStorage.setItem("test", "test")
    }
  }
}
</script>