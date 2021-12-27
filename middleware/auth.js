export default function ({ $auth, next, route }) {

  if (!$auth.loggedIn || $auth.getStrategy().name !== 'user') {
    next('/login');
  }

}
