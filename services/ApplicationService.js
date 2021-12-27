export default {
  loadAll: (params) => {
    return $nuxt.$axios.$get('admin/applications', {params: params});
  },
  statusUpdate: (applicationId, statusFlag) => {
    return $nuxt.$axios.$get('admin/applications/' + applicationId + '/' + statusFlag);
  }
}
