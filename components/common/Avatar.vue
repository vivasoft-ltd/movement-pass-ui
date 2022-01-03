<template>
  <div>
    <img v-if="isValidImage" class="avatar"
         :class="'avatar-' + size + ' ' + avatarStyle"
         :src="imageSrc"
         @error="setDefaultImage" />

    <Icon v-else class="avatar"
          :class="'avatar-' + size + ' ' + avatarStyle"
          icon-name="user"
          :size="size" />
  </div>
</template>

<script>
  import Icon from './Icon';

  export default {
    components: {
      Icon
    },
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
        isValidImage: true,
        imageSrc: process.env.imageSource + 'storage/' + (this.image ? this.image : this.$auth.user.image)
      };
    },
    methods: {
      setDefaultImage() {
        this.isValidImage = false;
      }
    }
  }
</script>
