  module.exports = function (id, data, options) {

    $ = require('jquery');
    component = $('<div id="' + id + '"><v-client-table :data="tableData"></v-client-table></div>');

    $(document.body).append(component);

    var Vue = require('vue');
    var VueTables = require('../../index');
    Vue.use(VueTables.client);

    var vm = new Vue({
      el:"#" +id,
      data: {
       tableData:data,
       options: options
    }
  });

    return vm.$children[0];
  }

