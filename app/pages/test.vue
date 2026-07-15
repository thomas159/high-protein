<template>
  <div>
    <h1>Test</h1>
    <div id="test-output">PATH_IS_{{ route.path }}</div>
  </div>
</template>
<script setup>
const route = useRoute()
</script>
