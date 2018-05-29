"use strict";

const Foo = { template: '<div>foo</div>' };
const Bar = { template: '<div>bar</div>' };

const User = {
  template: '<div>User {{ $route.params.id }}</div>',
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

const routes = [
  {path: '/foo', component: Foo },
  {path: '/bar', component: Bar },
  {path: '/user/:id', component: User}
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