'use strict';

/* Suporte para vis�o base do sistema. */

define([
  'jquery'
, 'backbone' 
, 'underscore'
, 'text!/js/templantes/base/base.html'
], function(
  $ 
, Backbone
, _
, Templante
) {
  
  var Base = Backbone.View.extend({

    el: $('#conteudo-raiz'),

    templante: _.template(Templante),
    
    attributes: {
      
    },
    
    initialize: function() {
      this.render();
    },

    render: function() {
      
      this.$el.html(this.templante());
    },

    events: {
      
    }
  });

  return Base;
});