export default function({ app, $axios }) {
  $axios.onError(error => {
    if (error.response && error.response.status === 401) {
      app.$auth.refreshTokens();
    }

    return Promise.reject(error);
  });
}
