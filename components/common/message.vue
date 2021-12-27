<template>
  <b-alert v-if="text" :variant="variant" show dismissible>
    {{ text }}
  </b-alert>
</template>

<script>
  export default {
    props: {
      type: String,
      text: String
    },
    data() {
      return {
        variant: this.type !== '' ? this.type : 'info'
      }
    }
  }
</script>
