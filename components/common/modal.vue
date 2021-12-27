<template>
  <b-modal :size="modal.size" v-model="modal.show" hide-footer>
    <template #modal-title>
      {{ modal.title }}
    </template>
    <slot></slot>
  </b-modal>
</template>

<script>
  export default {
    props: {
      modalConfig: Object
    },
    watch: {
      modalConfig(newVal) {
        this.modal = newVal;
      }
    },
    data() {
      return {
        modal: {
          size: 'md',
          title: '',
          show: false
        }
      };
    }
  }
</script>
