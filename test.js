var Vue = require('vue');
var VueTables = require('./index');

Vue.use(VueTables.server);
Vue.use(VueTables.client);

new Vue({
  el:"#people-client",
  data: {
    tableData: [
      {id:1,name:"John",age:10, scale:4},
      {id:2,name:"Zoe",age:30, scale:9},
      {id:3,name:"Cort",age:44, scale:12}
    ]
  }
});

new Vue({
  el:"#people-server",
  data: {
    url:"/vue/public/people"
  }
});
