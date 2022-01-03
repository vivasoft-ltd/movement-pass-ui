<template>
  <div class="modal modal-blur-custom" :class="modal.show ? 'show' : ''" tabindex="-1" role="dialog" aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered"
         :class="'modal-' + modal.size"
         role="document">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title">
            {{modal.title}}
          </h5>
          <button type="button" class="close" @click="closeModal()">
            <Icon icon-name="cross" />
          </button>
        </div>
        <div class="modal-body mb-3">
          <slot></slot>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import Icon from './Icon';

  export default {
    components: {
      Icon
    },
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
    },
    methods: {
      closeModal() {
        this.modal = {
          ... this.modal,
          show: false
        }
      }
    }
  }
</script>
