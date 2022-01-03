export default {
  loadAll: (params) => {
    return $nuxt.$axios.$get('admin/users', {params: params});
  }
}
