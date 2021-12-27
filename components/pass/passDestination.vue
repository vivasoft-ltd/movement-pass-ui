<template>
  <span>
    {{destination?.location}}
    <div class="text-muted text-h5">
      {{destination?.upa_zilla}},
      {{destination?.district}}
    </div>
  </span>
</template>

<script>
  export default {
    props: ['destination']
  }
</script>
