export default function ({ $auth, next }) {

  if ($auth.loggedIn && $auth.getStrategy().name === 'user') {
    next('/profile');
  }

}
