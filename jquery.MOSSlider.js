/* jQuery Moshyn Slider v0.0.1 
 * Copyright 2014 @ Moshyn Inc. 
 * Author: Garrett Haptonstall 
 * Contributers: 
*/
(function($){
  // Object Instance //
  $.MOSSlider = function($el, opts){
    var _this = this, slider = $el;
    // Public Properties //
    slider.opts = $.extend({}, $.MOSSlider.defaults, opts);
    // Animation Library //
    slider.animations = {
      rotate:[
        'rotateIn',
        'rotateInDownLeft',
        'rotateInDownRight',
        'rotateInUpLeft',
        'rotateInUpRight',
      ],
      attention:{},
      zoom:{},
      bounce:{},
      fade:{},
      speacial:{},
      lightspeed:{
        lsi:'lightSpeedIn',
        lso:'lightSpeedOut'
      }
    }
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
        slider.data = slider.opts.collection || [];

        return $.each($('.item', slider),
          function(idx, el){
            slider.data.push(el);
          }
        );
      },
      slide_next:function(){
        console.log('next slide');
        slider.opts.selector.animate({
          left: + slider.slideWidth
          },200,function(){
            $('.slides li:last-child').prependTo('.slides');
            $('.slides').css('left', '');
        });
      },
      slide_prev:function(){
      
      },
      layer:function(item){
        var _this = this;
        var rand = Math.floor(Math.random() * (5 - 0) + 0);
        var caption = $('.caption', item), brand = $('.brand', item);

        _this.animate(item, 'fadeIn');

        setTimeout(function(){
          brand.show();
          _this.animate(brand,
            slider.animations.rotate[rand], slider.opts.brandTime);

            setTimeout(function(){
              caption.show();
              _this.animate(caption,
                slider.animations.lightspeed.lsi, slider.opts.capTime);

          }, slider.opts.layerTime);
        }, slider.opts.layerTime);
      },
      bind_events:function(){
      
      },
      init:function(){
        console.log('slider init: ', slider.opts);
        var _this = this;
        _this.setup();

        var len = slider.data.length, activeIndex = 0;
        if(len > 0){

          do {
            var item = $(slider.data[activeIndex]);
            _this.layer(item);

            setTimeout(function(){
              if(activeIndex++ < len){
                _this.slide_next();
              }
            }, slider.opts.slideTime);
          } while(--len); 
        }
        // Controls //
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
    slider.slideCount = slider.opts.selector.length;
    slider.slideWidth = slider.opts.selector.width();
    slider.slideHeight = slider.opts.selector.height();
    slider.sliderUlWidth = slider.slideCount * slider.slideWidth;
    // Initialize Slider //
    _this.methods.init();
  }
  // Defaults //
  $.MOSSlider.defaults = {
    text:null,
    brand:null,
    image:null,
    showing:{
      slider:true
    },
    focused:true,
    collection:[],
    animating:true,
    capTime:2500,
    layerTime:2000,
    slideTime:6000,
    animationTime:1500,
    brandTime:2000,
    start:function(){},
    stop:function(){},
    pause:function(){},
    selector:$('.slides > li'),
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
