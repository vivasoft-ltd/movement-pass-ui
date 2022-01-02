<template>
  <paginate
    :page-count="totalPage"
    :page-range="pageSize"
    :margin-pages="3"
    :click-handler="changePage"
    :force-page="pageNo"
    :prev-text="'Prev'"
    :prev-class="'page-item'"
    :prev-link-class="'page-link'"
    :next-text="'Next'"
    :next-class="'page-item'"
    :next-link-class="'page-link'"
    :container-class="'pagination m-3 ml-auto'"
    :page-class="'page-item'"
    :page-link-class="'page-link'">
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
