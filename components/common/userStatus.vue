<template>
    <span class="badge" :class="statusClassName">{{active ? 'Active' : 'Pending'}}</span>
</template>

<script>
  export default {
    props: ['active'],
    data() {
      return {
        statusClassName: this.active ? 'bg-success' : 'bg-warning'
      };
    }
  }
</script>
