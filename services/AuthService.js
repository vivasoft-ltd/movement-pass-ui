export default {
  registration: (requestData) => {
    const config = {
      headers: { 'content-type': 'multipart/form-data' }
    };
    return $nuxt.$axios.$post('register', requestData, config);
  },
  verify: (requestData) => {
    return $nuxt.$axios.$post('verify', requestData);
  }
}
