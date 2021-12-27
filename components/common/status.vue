<template>
    <span class="badge" :class="statusClassName">{{passStatuses[approved]}}</span>
</template>

<script>
  import { PASS_STATUSES } from '../../utils';

  export default {
    props: ['approved'],
    data() {
      return {
        passStatuses: PASS_STATUSES,
        statusClassName: this.approved === null ? 'bg-yellow' : (this.approved ? 'bg-success' : 'bg-danger')
      };
    },
    watch: {
      approved: function (newVal) {
        this.statusClassName = newVal === null ? 'bg-yellow' : (newVal ? 'bg-success' : 'bg-danger');
      }
    }
  }
</script>
