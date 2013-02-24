define(['handlebars'], function(Handlebars) {

this["JST"] = this["JST"] || {};

this["JST"]["app"] = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [2,'>= 1.0.0-rc.3'];
helpers = helpers || Handlebars.helpers; data = data || {};
  


  return "<div id=\"app-wrapper\">\n\n</div>\n";
  });

this["JST"]["user.intro"] = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [2,'>= 1.0.0-rc.3'];
helpers = helpers || Handlebars.helpers; data = data || {};
  var buffer = "", stack1, functionType="function", escapeExpression=this.escapeExpression;


  buffer += "<p style='opacity: 0'>\n  Looks like your timezone is ";
  if (stack1 = helpers.tzone) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.tzone; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1)
    + " \n</p> \n\n<p>\n  now <a href='/tzone/app'>tell us where your friends are</a> and we tell you the time where they are.\n</p>\n\n\n";
  return buffer;
  });

this["JST"]["user.welcome"] = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [2,'>= 1.0.0-rc.3'];
helpers = helpers || Handlebars.helpers; data = data || {};
  var buffer = "", stack1, functionType="function", escapeExpression=this.escapeExpression;


  buffer += "<p>Welcome Back ";
  if (stack1 = helpers.name) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.name; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1)
    + "</p>\n<div>\n  <a href='/users/login'>login</a>\n  or <a href='/tzone/app'> continue</a> without logging in.\n</div>\n";
  return buffer;
  });

return this["JST"];

});