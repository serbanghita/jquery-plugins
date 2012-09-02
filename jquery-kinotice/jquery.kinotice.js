/*!
 * jQuery kiNotice 1.0
 * http://ghita.org/jquery/kinotice
 * Copyright 2011, Serban Ghita
 * Released under the GPL Licenses.
 */
(function($){
  
    function kiNotice(){
        
        // Default variables.
        var self = this,
            kiNoticeClasses         = 'kinotice',
            kiNoticeToggleClasses   = 'kinotice-toggle',
            kiNoticeInnerClasses    = 'kinotice-inner',
            kiNoticeTitleClasses    = 'kinotice-title',
            kiNoticeContentClasses  = 'kinotice-content';
        
        
        // Constructor.
        this.init = function(options, elem){
            
            // Check if kiNotice is attached to a custom DOM element.
            // If this is true, we enforce custom CSS rules for compatibility.
            if(elem.length>0) {
                self.elem = $(elem);
                self.elem.css({'position':'relative', 'overflow':'hidden'});
            }
            
            // Extend the default settings.
            self.settings = $.extend({
                                        title           : null,
                                        autoOpen        : true,
                                        hideOnClose     : false,
                                        content         : null,
                                        ajaxSettings    : null,
                                        beforeClose     : null,
                                        beforeOpen      : null,
                                        extraClasses    : null,
                                        animationSpeed  : 100,
                                        extraNoticeInterval : 0
                                    }, options);
                                    
            // Create the html container.
            var kiNotice = (self.kiNotice = $('<div></div>')).
                            appendTo((self.elem ? self.elem : document.body)).
                            addClass(kiNoticeClasses+(self.settings.extraClasses ? ' '+self.settings.extraClasses : '')),
                        
                kiNoticeToggle = (self.kiNoticeToggle = $('<div></div>')).
                                    appendTo(self.kiNotice).
                                    addClass(kiNoticeToggleClasses),
                 
                kiNoticeToggleIcon = (self.kiNoticeToggleIcon = $('<span>+</span>')).
                                       appendTo(self.kiNoticeToggle),
                 
                kiNoticeInner = (self.kiNoticeInner = $('<div></div>')).
                                    appendTo(self.kiNotice).
                                    addClass(kiNoticeInnerClasses), 
                                
                kiNoticeTitle = (self.kiNoticeTitle = $('<div></div>')).
                                    appendTo(self.kiNoticeInner).
                                    addClass(kiNoticeTitleClasses).
                                    html((self.settings.title ? self.settings.title : null)), 
                                
                kiNoticeContent = (self.kiNoticeContent = $('<div></div>')).
                                    appendTo(self.kiNoticeInner).
                                    addClass(kiNoticeContentClasses),
                                
                hasContent = false;
            
            // Enforce the kiNotice to be absolute if it's attached to a custom DOM element.
            if(self.elem){
                self.kiNotice.css({'position':'absolute'});
            }
            
            // Fill the content with an existing DOM element.
            if(self.settings.content instanceof jQuery && self.settings.content.length>0){
                self.kiNoticeContent.append(self.settings.content);
                self.settings.content.show();
                hasContent = true;
            }
            
            // Fill the content with a static string.
            if(typeof self.settings.content == 'string'){
                self.kiNoticeContent.html(self.settings.content);
                hasContent = true;
            }
            
            // Fill the content with AJAX html response.
            if(self.settings.ajaxSettings && typeof self.settings.ajaxSettings.url == 'string'){
                
                // Default AJAX success callback.
                // If the user doesn't use a custom AJAX success() function 
                // fallback into the default behaviour.
                if(!$.isFunction(self.settings.ajaxSettings.success)){
                    
                    self.settings.ajaxSettings.success = function(data){
                    
                        if(typeof data == 'object' && data.notice_count){
                            self._setToggleIcon('<sup>'+data.notice_count+'</sup>');
                            self.kiNoticeContent.html(data.notice_content);
                            self._open();
                        }
                        if(typeof data == 'string'){
                            self.kiNoticeContent.html(data);
                            self._open();
                        }                    
                    
                    }
                }
               
                $.ajax($.extend({context: self}, self.settings.ajaxSettings));
                hasContent = true;
                
            }
            
            // Stop the execution if there is no content.
            if(!hasContent){
                return false;
            }
            
            // Hide the title container if no text is received.
            if(self.settings.title==null || self.settings.title==''){
                self.kiNoticeTitle.hide();
            }
            
            // Update the icon to (x) if hideOnClose option is present.
            if(self.settings.hideOnClose){
                self._setToggleIcon('<sup>x</sup>');
            }
            
            // Let's go to the next stage an try to open the notice.
            // If AJAX option is enabled, we don't do nothing, just wait for the response
            // to fill the content.
            if(!self.settings.ajaxSettings){
                self._open();
            }
            
        },
        
        this._open = function(){
                      
            var cssBottomHeight = self._getBottomHeight();
                
                self.kiNotice.css('bottom', cssBottomHeight).addClass('init');
                                
                // Just init, no auto-open.
                if(self.settings.autoOpen){
                    // Auto-open
                    self.kiNotice.animate({bottom: 0}, self.settings.animationSpeed);
                    self.kiNoticeToggle.addClass('opened');
                    if(!self.settings.hideOnClose){self._setToggleIcon('-');}                    
                
                } else {
                    // No auto-open, just init.
                    self.kiNotice.css({bottom: cssBottomHeight});
                    
                }
                
                // Bind open/close to toggle.
                self.kiNoticeToggle.bind('click.kinotice', function(){
                    
                    // Open it!
                    if(!$(this).hasClass('opened')){ 
                        
                        self.kiNotice.animate({bottom: 0}, self.settings.animationSpeed);
                        $(this).addClass('opened');
                        self._setToggleIcon('-');
                        if(self.Interval){
                            clearTimeout(self.Interval);
                        }

                    } else {
                        // Close it!
                        if(self.settings.hideOnClose){
                            self._hide();
                            return true;
                        } else {
                            self.kiNotice.animate({bottom: self._getBottomHeight()}, self.settings.animationSpeed);
                            $(this).removeClass('opened');
                            self._setToggleIcon('+');
                        }
                    }

                });
                
               if(self.settings.extraNoticeInterval>0 && !self.settings.autoOpen){ 
                    self.Interval = setInterval(function(){ 
                        self._toggleAnim(); 
                    }, self.settings.extraNoticeInterval);
                }
        }
        
        // Hide the notice. @todo: allow user to extend this.
        this._hide = function(){
            
            self.kiNotice.fadeOut(100);
            
        }
        
        // Change the control icon.
        this._setToggleIcon = function(icon){
            
            self.kiNoticeToggleIcon.html(icon);
            
        }  
        
        // Calculate how much to hide from the current notice.
        this._getBottomHeight = function(){
            
            var _top = parseInt(self.kiNoticeToggle.css('top'));
            if(isNaN(_top)){ _top = 0; }
            var _height = -self.kiNotice.height()+25+_top; 
            
            return _height;
            
        }
        
        // Add a special animation to notify the user about the existence of the notice.
        this._toggleAnim = function(){
            
            self.kiNotice.addClass('anim');
            setTimeout(function(){ self.kiNotice.removeClass('anim'); }, 100);
            
        }
        
        
    }
    
    $.fn.kiNotice = function(options){
        
            var mykiNotice = new kiNotice();
            mykiNotice.init(options, this);
        
    }
    
})(jQuery);