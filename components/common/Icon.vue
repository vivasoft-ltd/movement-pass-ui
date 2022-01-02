<template>
  <span :class="'icon-size-' + size" v-html="icons[iconName]"></span>
</template>

<script>
import { ICONS } from '../../utils';

export default {
  props: {
    iconName: String,
    size: {
      default: 'md',
      type: String
    }
  },
  data() {
    return {
      icons: ICONS
    };
  }
}
</script>
