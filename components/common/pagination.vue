<template>
  <paginate
    :page-count="totalPage"
    :page-range="pageSize"
    :margin-pages="3"
    :click-handler="changePage"
    :force-page="pageNo"
    :prev-text="'Prev'"
    :next-text="'Next'"
    :container-class="'pagination'"
    :page-class="'page-item'">
  </paginate>
</template>

<script>
  import Paginate from 'vuejs-paginate';

  export default {
    components: {
      Paginate
    },
    props: {
      totalRows: Number
    },
    data() {
      return {
        pageNo: 1,
        pageSize: 10
      };
    },
    methods: {
      changePage(pageNo) {
        this.pageNo = pageNo;
        this.$emit('changePage', pageNo);
      }
    },
    computed: {
      totalPage() {
        return this.totalRows > 0 ? Math.ceil(this.totalRows / this.pageSize) : 0;
      }
    }
  }
</script>
