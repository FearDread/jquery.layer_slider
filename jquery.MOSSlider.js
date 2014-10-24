/* jQuery Moshyn Slider v0.0.1 
 * Copyright 2014 @ Moshyn Inc. 
 * Author: Garrett Haptonstall 
*/
(function($){
  // Object Instance //
  $.MOSSlider = function($el, opts){
    var slider = $el;
    var _this = this, focused = true; 
    // Public Properties //
    slider.opts = $.extend({}, $.MOSSlider.defaults, opts);
    // Store Reference //
    $.data($el, 'MOSSlider', slider);
    // Private Methods //
    _this.methods = {
      animate:function($el, anim, time){
        if(time === undefined){
          time = slider.opts.animationTime || 1500;
        }
        if(!$el.hasClass('animated')){
          $el.addClass('animated');
        }
        $el.addClass(anim);

        setTimeout(function(){
          $el.removeClass(anim);
        }, time);
      },
      setup:function(){
        var data = slider.opts.collection || [];

        return $.each($('.item', slider),
          function(idx, el){
            data.push(el);
          }
        );
      },
      bind_events:function(){
      
      },
      init:function(){
        console.log('slider init: ', slider.opts);
        var _this = this;
        var data = _this.setup();
        var len = data.length, i = 0;

        if(len > 0 && slider.opts.animating){

          do {
            var item = $(data[i]);
            var caption = $('.caption', item), brand = $('.brand', item);
            // add options to control animation times //
            // add options to control layer timing //
            _this.animate(item, 'fadeIn');
            setTimeout(function(){

              brand.show();
              _this.animate(brand, 'rotateIn', 2000);

              setTimeout(function(){
              
                caption.show();
                _this.animate(caption, 'lightSpeedIn', 2500);

              }, slider.opts.layerTime);

            }, slider.opts.layerTime);

            setTimeout(i++, 4000);
          } while(--len); 
        }
        _this.bind_events();
      }
    }
    // Public Methods //
    slider.start = function(){
    
    }
    slider.stop = function(){
    
    }
    slider.pause = function(){
    
    }
    // Initialize Slider //
    _this.methods.init();
  }
  // Defaults //
  $.MOSSlider.defaults = {
    text:'',
    brand:null,
    image:null,
    showing:{
      slider:true
    },
    focused:true,
    collection:[],
    animating:true,
    layerTime:2000,
    slideTime:6000,
    animationTime:1500,
    start:function(){},
    stop:function(){},
    pause:function(){},
    selector:'.slides > li'
  }
  // jQuery Function //
  $.fn.MOSSlider = function(opts){
    if(opts === undefined){
      opts = {};
    }

    if(typeof opts == 'object'){

      return this.each(function(){
        var sel = (opts.selector) ? opts.selector : '.slides > li';
        var slides = $(this).find(sel);

        if(slides.length === 1 && $(this).data('MOSSlider')){
          slides.fadeIn(opts.animationTime);

          if(opts.start){
            opts.start($(this));
          }
        }else if($(this).data('MOSSlider') === undefined){

          new $.MOSSlider(this, opts);
        }
      });
    }
  }
})(jQuery);
