
const routes = [
  {
    path: '/',
    component: () => import('pages/login.vue')
    // component: () => import('layouts/MainLayout.vue'),
    // children: [
    //   { path: '', component: () => import('pages/Index.vue') }
    // ]
  },
  {
    path: '/register',
    component: () => import('pages/UserRegistration.vue')
  },
  {
    path: '/todos',
    component: () => import('pages/todos.vue')
  },
  {
    path: '/geoMap',
    component: () => import('pages/geoMap.vue')
  }
  // {
  //   path: '/booking',
  //   component: () => import('pages/booking.vue')
  // }
]

// Always leave this as last one
if (process.env.MODE !== 'ssr') {
  routes.push({
    path: '*',
    component: () => import('pages/Error404.vue')
  })
}

export default routes
