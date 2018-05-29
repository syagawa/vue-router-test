"use strict";

const Foo = { template: '<div>foo</div>' };
const Bar = { template: '<div>bar</div>' };

const User = {
  props: ['id'],
  template: `<div class="user">
              <h2>User {{ id }}</h2>
              <router-link to="/user/11/profile">Go to profile</router-link>
              <router-link to="/user/11/posts">Go to posts</router-link>
              <router-view></router-view>
              <router-view name="info"></router-view>
            </div>`,
  // watch: {
  //   '$route' (to, from){
  //     console.info(to, from);
  //   }
  // },
  beforeRouteUpdate(to, from, next){
    console.info(to, from, next);
    next();
  }
};

const UserProfile = {
  template: `<div>User Profile {{ $route.params.id }}</div>`
};

const UserPosts = {
  template: `<div>User Posts</div>`
};

const UserPostsInfo = {
  template: `<div>User Posts Info</div>`
};

const Footer = {
  template: `<div>
              <h2>Footer</h2>
              <div> {{ id }} </div>
            </div>`,
  props: ['id']
};

const routes = [
  {
    path: '/',
    name: 'root',
    components: {
      default: Foo,
      footer: Footer
    }
  },
  {path: '/foo', component: Foo },
  {path: '/bar', component: Bar },
  {
    path: '/user/:id',
    name: 'user',
    component: User,
    props: true,
    children: [
      {
        path: 'profile',
        component: UserProfile
      },
      {
        path: 'posts',
        components: {
          default: UserPosts,
          info: UserPostsInfo
        }
      }

    ]
  },
  { path: '/home', redirect: { name: 'root' } },
  {
    path: '/alias',
    components: {
      default: Foo,
      footer: Footer
    },
    alias: '/'
  },
  {
    path: '/prop/:id',
    components: {
      default: Foo,
      footer: Footer
    },
    props: {
      default: false,
      footer: true
    }
  }
];

const router = new VueRouter({
  routes: routes
});


const app = new Vue({
  router,
  computed: {
    username(){
      return this.$route.params.username ? this.$route.params.username : this.$route.query.username;
    }
  },
  methods: {
    goBack(){
      window.history.length > 1
        ? this.$router.go(-1)
        : this.$router.push('');
    }
  }
}).$mount("#app");

router.push({ path: '/user/123'});
