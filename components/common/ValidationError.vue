<template>
  <div class="invalid-feedback">{{ setErrorMessage() }}</div>
</template>

<script>
  import MessageHelper from '../../helpers/MessageHelper';

  export default {
    props: {
      modelName: Object,
      fieldName: String
    },
    methods: {
      setErrorMessage() {
        return MessageHelper.getErrorMessage(this.modelName, this.fieldName);
      }
    }
  }
</script>
