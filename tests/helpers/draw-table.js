  module.exports = function (id, data, options, isServer) {
    var type = isServer?'server':'client';
    var dataProp = type=='client'?':data="tableData"':'url="/people"';
   // var proxyquire = require('proxyquireify')(require);
    var stubs = {
   "../../lib/methods/getData": function() {
    console.log("getting data");
  }
};

    options = options?options:{};
    $ = require('jquery');
    component = $('<div id="' + id + '"><h1>'+id+'</h1><v-' + type + '-table ' + dataProp + ' :options="options"></v-' + type + '-table></div>');

    $(document.body).append(component);

    var Vue = require('vue');

   var VueTables = require('../../index');
   Vue.use(VueTables[type]);

    var vm = new Vue({
      el:"#" +id,
      data: {
       tableData:data,
       options: options
    }
  });

    return vm.$children[0];
  }

