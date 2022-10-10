import { createRouter, createWebHashHistory } from 'vue-router'
import NProgress from 'nprogress'
import Swal from 'sweetalert2/dist/sweetalert2.js'

const routes = [
  {
    path: '/',
    name: 'login',
    component: () => import('../views/login/IndexView.vue')
  },
  {
    path: '/dashboard',
    name: 'dashboard',
    component: () => import('../views/profile/IndexView.vue'),
    
    //add simple middleware
    beforeEnter:  (to, from, next) => {
      if(!localStorage.getItem('token')){
        Swal.fire({
          title: 'Alert',
          text: 'Login Terlebih Dahulu',
          icon: 'warning',
          confirmButtonText: 'Ok'
      })
        return next({
          name: 'login'
        })
      }

      return next()
    }
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

//config nprogress
router.beforeResolve((to, from, next) => {
  // If this isn't an initial page load.
  if (to.name) {
      // Start the route progress bar.
      NProgress.start()
  }
  next()
})

router.afterEach(() => {
  // Complete the animation of the route progress bar.
  NProgress.done()
})

export default router
