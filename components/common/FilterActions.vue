<template>
  <div>
    <button class="btn btn-info ml-auto" @click="onSearch">
      <Icon icon-name="search" size="sm" class="mr-1" />
      Search
    </button>
    <button class="btn btn-secondary ml-auto" @click="onReset">
      <Icon icon-name="reset" size="sm" class="mr-1" />
      Reset
    </button>
  </div>
</template>

<script>
  import Icon from './Icon';

  export default {
    components: {
      Icon
    },
    methods: {
      onSearch() {
        this.$emit('search');
      },
      onReset() {
        this.$emit('reset');
      }
    }
  }
</script>
