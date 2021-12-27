<template>
  <span class="avatar" :class="'avatar-' + size + ' ' + avatarStyle">
    <i class="la la-user la-lg"></i>
  </span>
</template>

<script>
export default {
  props: {
    size: {
      default: 'md',
      type: String
    },
    avatarStyle: {
      default: 'rounded-circle',
      type: String
    }
  }
}
</script>
