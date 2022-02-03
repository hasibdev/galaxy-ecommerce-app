import auth from 'src/middlewares/auth'
import guest from 'src/middlewares/guest'
import intro from 'src/middlewares/intro'

const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', redirect: '/home' },
      {
        path: '/home',
        name: 'home',
        component: () => import('pages/Index.vue'),
        meta: {
          middleware: [intro]
        }
      },
      { path: 'search-view', name: 'search-view', component: () => import('pages/SearchView.vue') },
      { path: 'categories/:slug', name: 'category-details', component: () => import('pages/categories/details.vue') },
      { path: 'products/:slug', name: 'product-details', component: () => import('pages/products/details.vue') },
      {
        path: 'profile',
        name: 'profile',
        component: () => import('src/pages/Profile/index.vue'),
        meta: {
          middleware: [auth]
        }
      },
      {
        path: 'profile/update',
        name: 'profile-update',
        component: () => import('src/pages/Profile/update.vue'),
        meta: {
          middleware: [auth]
        }
      },
      { path: 'cart', name: 'cart', component: () => import('pages/Cart.vue') },
      { path: 'favourite', name: 'favourite', component: () => import('pages/Favourite.vue') },
      {
        path: 'orders',
        name: 'orders',
        component: () => import('src/pages/orders/index.vue'),
        meta: {
          middleware: [auth]
        }
      },
      {
        path: 'orders/:id',
        name: 'order-details',
        component: () => import('src/pages/orders/details.vue')
      },
      {
        path: 'signin',
        name: 'signin',
        component: () => import('pages/auth/Signin.vue'),
        meta: {
          middleware: [guest]
        }
      },
      {
        path: 'signup',
        name: 'signup',
        component: () => import('pages/auth/Signup.vue'),
        meta: {
          middleware: [guest]
        }
      },
      { path: 'onboarding', name: 'onboarding', component: () => import('pages/Onboarding.vue') },
      {
        path: 'checkout',
        name: 'checkout',
        component: () => import('src/pages/Checkout.vue'),
        meta: {
          middleware: [auth]
        }
      },
      { path: 'verification', name: 'verification', component: () => import('src/pages/Verification.vue') },
      { path: 'order-success', name: 'order-success', component: () => import('src/pages/OrderSuccess.vue') }
    ]
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/Error404.vue')
  }
]

export default routes
