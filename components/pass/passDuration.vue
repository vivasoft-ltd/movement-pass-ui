<template>
  <span>{{ duration }} {{ duration > 1 ? 'Hours' : 'Hour' }}</span>
</template>

<script>
  export default {
    props: ['duration']
  }
</script>
