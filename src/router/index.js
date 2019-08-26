import Vue from 'vue'
import Router from 'vue-router'
import page from '@/components/page'
// import index from '@/components/index'

Vue.use(Router)

const originalPush = Router.prototype.push
Router.prototype.push = function push (location) {
  return originalPush.call(this, location).catch(err => err)
}

export default new Router({
  mode: 'history',
  routes: [
    // {
    //   path: '/1',
    //   name: '1',
    //   component: page
    //   // props: true
    // },
    {
      path: '/',
      name: 'index',
      props: true
      // redirect: '/1'
    },
    {
      path: '/:id',
      name: 'page',
      component: page
    }
    // {
    //   path: '/\\?page=:id&maxRate=\\d+&minRate=\\d+',
    //   name: ':id',
    //   component: page
    // }
  ]
})
