describe('renders the template', function() {

  var render = require('../../../lib/filters/render');

   var context = {
    options: {
      templates: {
        custom:"<b>{id}:{name}</b>"
      }
    },
     templatesKeys:['custom'],
     allColumns:['id','age','name']
    };

  it('should return the rendered template', function() {
    var rendered = render.call(context, "", {id:1, name:"John Doe"} , "custom");
    expect(rendered).toBe("<span class='VueTables__template'><b>1:John Doe</b></span>");
  });

  it('should return the original value if no template is defined', function() {
    var rendered = render.call(context, "ORIGINAL", {id:1, name:"John Doe"} , "undefinedTemplate");
    expect(rendered).toBe("ORIGINAL");
  });

});

