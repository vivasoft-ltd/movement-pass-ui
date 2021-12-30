<template>
  <span class="avatar"
        :class="'avatar-' + size + ' ' + avatarStyle"
        :style="{'background-image': 'url(' + userImage + ')'}">
  </span>
</template>

<script>
export default {
  props: {
    image: String,
    size: {
      default: 'md',
      type: String
    },
    avatarStyle: {
      default: 'rounded-circle',
      type: String
    }
  },
  data() {
    return {
      userImage: this.$axios.defaults.baseURL + 'storage/' + (this.image ? this.image : this.$auth.user.image)
    };
  }
}
</script>
