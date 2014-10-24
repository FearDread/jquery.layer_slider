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
      activeIndex:0,
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
        return $.each($('.item', slider), function(idx, el){
          slider.data.push(el);
        });
      },
      slide_next:function(){
        console.log('next slide');
        var current = $('.item.active');
        var next = current.next().length ? current.next() : current.siblings().first();

        switch(slider.opts.style){
          case 'fade':
            current.fadeOut(500).removeClass('active');
            next.fadeIn(1000).addClass('active');
            break;
          case 'slide':

            break;
          default:
            break;
        }
      },
      slide_prev:function(){
        console.log('prev slide');
        slider.opts.selector.animate({
          left: + slider.slideWidth
          },400,function(){
            $('.slides li:last-child').prependTo('.slides');
            $('.slides').css('left', '');
        });
      },
      layer:function(item){
        var _this = this;
        var rand = Math.floor(Math.random() * (5 - 0) + 0);
        var caption = item.find('.caption'), brand = item.find('.brand'); 

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
      cycle:function(){
        var _this = this;
        var len = slider.data.length;

        if(_this.activeIndex < len - 1){
          var item = $(slider.data[_this.activeIndex]);

          _this.layer(item);
          _this.activeIndex++;

          setTimeout(function(){

            _this.slide_next();
            _this.cycle(); 

          }, slider.opts.slideTime);
        }else{
          _this.activeIndex = 0;
          setTimeout(function(){

            _this.slide_next();
            _this.cycle(); 

          }, slider.opts.slideTime);
        }
      },
      bind_events:function(){
      
      },
      init:function(){
        console.log('MOSSlider: ', slider.opts);
        // Data //
        this.setup();
        // Slideshow Loop //
        this.cycle();
        // Controls //
        this.bind_events();
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
    style:'fade',
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
