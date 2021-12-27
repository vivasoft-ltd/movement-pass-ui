export default {
  loadAll: (params) => {
    return $nuxt.$axios.$get('pass', {params: params});
  },
  create: (requestData) => {
    return $nuxt.$axios.$post('pass/create', requestData);
  }
}
