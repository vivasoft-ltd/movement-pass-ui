export default function ({ $auth, next }) {

  if (!$auth.loggedIn || $auth.getStrategy().name !== 'admin') {
    next('/admin/login');
  }

}
