/* jQuery Moshyn Slider v0.0.1 
 * Copyright 2014 @ Moshyn Inc. 
 * Author: Garrett Haptonstall 
*/
(function($){
  // Object Instance //
  $.MOSSlider = function($el, opts){
    var _this = this, slider = $el;
    // Public Properties //
    slider.opts = $.extend({}, $.MOSSlider.defaults, opts);
    // Animation Library //
    slider.animations = {
      speacial:['hinge','rollIn','rollOut'],
      lightspeed:['lightSpeedIn','lightSpeedOut'],
      flip:['flip','flipInX','flipInY','flipOutX','flipOutY'],
      texts:['lightSpeedIn','flip','rubberBand','zoomIn','rollIn','fadeInDownBig','swing'],
      attention:['bounce','flash','wobble','pulse','shake','swing','tada','rubberBand'],
      rotate:['rotateIn','rotateInDownLeft','rotateInDownRight','rotateInUpLeft','rotateInUpRight'],
      fade:['fadeIn','fadeInDown','fadeInDownBig','fadeInUp','fadeInUpBig','fadeInLeft','fadeInLeftBig','fadeInRight','fadeInRightBig'],
      zoom:['zoomIn','zoomDownIn','zoomUpIn','zoomLeftIn','zoomRightIn','zoomOut','zoomUpOut','zoomDownOut','zoomLeftOut','zoomRightOut'],
      bounce:['bounceIn','bounceOut','bounceInDown','bounceInUp','bounceInLeft','bounceInRight','bounceOutUp','bounceOutLeft','bounceOutRight','bounceOutDown']
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
        $el.show().addClass(anim);
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
        var _this = this,
            current = $('.item.active', slider),
            next = current.next().length ? current.next() : current.siblings().first(),
            rand = Math.floor(Math.random() * (9 - 0) + 0);

        if(this.activeIndex == slider.data.length - 1){
          this.reset();
        }else{
          this.activeIndex++;
        }
        if(slider.opts.showing.extra){
          $(slider.opts.showing.extra).css('display','none');
        }

        switch(slider.opts.style){
          case 'random':
            current.css('display','none').removeClass('active');
            current.children('div').css('display','none');
            next.addClass('active');
            _this.animate(next, slider.animations.fade[rand]);
            break;
          case 'fade':
            current.fadeOut(500).removeClass('active');
            next.fadeIn(500).addClass('active');
            break;
          case 'slide':
             next.addClass('active');
             current.removeClass('active');
             current.animate({
                 left: - slider.slideWidth
             }, 200,function(){
                 $('.slides li:first-child').appendTo('.slides');
                 $('slides').css('left', '0');
             });
            break;
          default:
            break;
        }
      },
      slide_prev:function(){
        var _this = this, current = $('.item.active', slider),
            prev = current.previous().length ? current.previous() : current.siblings().last(),
            rand = Math.floor(Math.random() * (9 - 0) + 0);

        switch(slider.opts.style){
          case 'random':

            break;
          case 'fade':

            break;
          case 'slide':
            slider.opts.selector.animate({
              left: + slider.slideWidth
              },400,function(){
                $('.slides li:last-child').prependTo('.slides');
                $('.slides').css('left', '0');
            });
            break;
          default:
            break;
        }
      },
      layer:function(item){
        var _this = this;
        var rand = Math.floor(Math.random() * (5 - 0) + 0);
        var caption = item.find('.caption'), brand = item.find('.brand'); 

        _this.animate(item, 'fadeIn', 500);
        if(slider.opts.showing.extra !== null){
          $(slider.opts.showing.extra).show('slow');
        }
        setTimeout(function(){
          brand.show();
          _this.animate(brand,
            slider.animations.rotate[rand], slider.opts.brandTime);

            setTimeout(function(){
              caption.show();
              _this.animate(caption,
                slider.animations.texts[rand], slider.opts.capTime);

          }, slider.opts.layerTime);
        }, slider.opts.layerTime);
      },
      cycle:function(){
        var _this = this, item;
        var len = slider.data.length;
        item = $(slider.data[this.activeIndex]);

        if(this.activeIndex < len && slider.opts.animating){
          this.layer(item);

          setTimeout(function(){
            _this.slide_next();
            _this.cycle(); 

          }, slider.opts.slideTime);
        }else if(slider.opts.animating){
          this.reset();
          item = $(slider.data[this.activeIndex]);

          this.layer(item);
          setTimeout(function(){
            _this.slide_next();
            _this.cycle(); 

          }, slider.opts.slideTime);
        }
      },
      bind_events:function(){
        var _this = this;
        $('.slider-control.right',slider).bind('click',function(_e){
          _e.preventDefault();
          _this.slide_next();
        });
        $('.slider-control.left',slider).bind('click',function(_e){
          _e.preventDefault();
          _this.slide_prev();
        });
        $(slider.opts.container).hover(function(_e){
          _e.stopPropagation();
          slider.opts.animating = false;
          },function(){
            slider.opts.animating = true;
        });
      },
      reset:function(){
        this.activeIndex = 0;
      },
      init:function(){
        console.log('MOSSlider: ', slider.opts);
        // Markup //
        this.setup();
        // Slideshow Loop //
        this.cycle();
        // Controls //
        // this.bind_events();
      }
    }
    // Public Methods //
    slider.start = function(){
    
    }
    slider.stop = function(){
    
    }
    slider.pause = function(){
    
    }
    slider.slide = function(){
    
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
    style:'random',
    brand:null,
    image:null,
    showing:{
      extra:null,
      slider:true
    },
    focused:true,
    collection:[],
    animating:true,
    capTime:1500,
    brandTime:1500,
    layerTime:1200,
    slideTime:6500,
    animationTime:1500,
    start:function(){},
    stop:function(){},
    pause:function(){},
    container:$('#moshyn-slider'),
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
