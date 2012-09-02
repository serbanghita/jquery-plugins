/*!
 * jQuery Very Simple Slideshow 1.0
 * http://ghita.org/
 * Copyright 2011, Serban Ghita
 * Released under the GPL Licenses.
 */

(function($){
    
    function VerySimpleSlideshow(){
        
        var self = this;
        
        this.init = function(options, elem){
            
            self.settings = $.extend({
                                        interval: 2000,
                                        fadeSpeed: 500
                                        }, 
                                        options);
            self.elem = $(elem);
            
            // Add the default slideshow class and inline CSS.
            self.elem.addClass('VerySimpleSlideshow').css({'position':'relative'});

            // Add the default class and inline CSS styles to our slides.
            var slides = self.elem.children('div');
            slides.addClass('slide').css({'position':'absolute','opacity':0,'z-index':9});
            
            slides.each(function(){
               // Put default bg color to prevent text problems when using fade between slides.
	       if($(this).css('background-color')=='transparent' || $(this).css('background-color')=='rgba(0, 0, 0, 0)'){
                   $(this).css('background-color', '#fff');
               }                
            });

            //Add the default 'active' class and inline style on the first slide.
            self.elem.find('div:first-child').addClass('active').css({'opacity':1,'z-index':11});	

            setInterval(function(){ self._play(); }, self.settings.interval);

            return self.elem;
            
        }
        
        this._play = function(){

            // Run the slideshow.	
            var current = self.elem.find('.slide.active'),
                next = current.next('.slide');
                
            // Add the default class and inline style to the last active slide.
            current.addClass('last-active').css({'z-index':10});

            if(next.length==0){
                next = self.elem.find('.slide:first');
            }

            next.addClass('active').css({'opacity':0,'z-index':11}).stop(true,true).animate({'opacity':1}, self.settings.fadeSpeed, function(){
                current.removeClass('active last-active').css({'opacity':0,'z-index':9});
            });	


        }  
        
    }

    $.fn.VerySimpleSlideshow = function(options){
        
        return this.each(function(){            
            var s = new VerySimpleSlideshow();
            s.init(options, this);
        });

    }

})(jQuery);