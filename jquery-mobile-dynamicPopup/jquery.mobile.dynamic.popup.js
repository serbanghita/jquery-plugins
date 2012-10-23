/**
 * jQuery Mobile dynamic popup
 * 
 * Original post: http://ghita.org/jquery/dynamic-mobile-popup
 * Contribute: https://github.com/serbanghita/jquery-plugins
 * Copyright 2012, Serban Ghita <serbanghita@gmail.com>
 * Released under the MIT License.
 */
(function($){

    function dynamicPopup(){

        var settings,
            openSettings,
            $wrappers,
            $popup,
            self        = this,
            $activePage = $.mobile.activePage;

        this.init = function(generalOptions, openOptions){

            // Extend the general settings.
            settings = $.extend({
                                    content: '',
                                    popupId: 'popup' + $activePage.attr('id'),
                                    closeBtnLabel: 'Okay',
                                    history: false
                                }, generalOptions);

            // Extend the popup's open method settings.
            openSettings = $.extend({
                                    positionTo: 'window'
                                }, openOptions);

            if(typeof generalOptions === 'string'){ settings.content = generalOptions; }
            
            self.setPopupWrappers();
            self.popupatePopupContent();
            self.putPopupInDOM();
            self.openPopup();          

            return $popup;

        }

        // Create the popup objects without the actual contents.
        // If the popup container exists return it's objects.
        this.setPopupWrappers = function(){

            $popup = $('#' + settings.popupId);

            // New popup, it doesn't exist.
            if($popup.length == 0){ 

                // Create the generic popup elements.
                $wrappers = {
                              main:       $('<div></div>').attr({ 'id': settings.popupId, 'data-role': 'popup', 'data-theme': 'b', 'data-overlay-theme': 'b' }),
                              content:    $('<div></div>').attr({ 'data-role': 'content' }).addClass('ui-content content'),
                              closeX:     $('<a></a>').attr({ 'href': '#', 'data-role': 'button', 'data-rel': 'back', 'data-icon': 'delete', 'data-iconpos': 'notext' }).addClass('ui-btn-right closeX').html('Close').button(),
                              closeBtn:   $('<a></a>').attr({ 'href': '#', 'data-inline': true, 'data-rel': 'back', 'data-icon': 'check', 'data-iconpos': 'right', 'data-theme': 'e' }).addClass('closeBtn').html(settings.closeBtnLabel).button()
                            };

            } else {

                // Find the existing HTML wrappers.
                $wrappers = {
                              main:       $popup,
                              content:    $popup.find('.content'),
                              closeX:     $popup.find('.closeX'),
                              closeBtn:   $popup.find('.closeBtn')
                            };

            }

            // Apply all possible callback helpers.
            //if(self.settings.helpers){

            //    $.each(self.settings.helpers, function(i, helper){
            //        this.apply(self.el[i]);
            //    });

            //}


        }

        // Populate the popup's content.
        this.popupatePopupContent = function(){

            // 1. Static HTML string.
            if(typeof settings.content === 'string'){
                $wrappers.content.html(settings.content);
            }

            // 2. jQuery object.
            if(settings.content instanceof jQuery){
                // Grab the content inside the wrapper.
                $wrappers.content.html(settings.content.html());
            }

        }

        this.putPopupInDOM = function(){

            // Remove the existing popup from DOM.
            $popup.remove();

            // Tie together the HTML elements.
            $wrappers.main.append($wrappers.closeX);
            $wrappers.main.append($wrappers.content).append($wrappers.closeBtn);

            // Append the popup to the current page.
            $activePage.append($wrappers.main);

        }   

        this.openPopup = function(){

            // Init.
            $popup = $('#' + settings.popupId);
            $popup.popup(settings); 

            // Open.
            $popup.popup('open', openSettings); 

        }             

    }

    // Register the plugin.
    $.dynamic_popup = function(generalOptions, openOptions){

        var popup = new dynamicPopup();
        return popup.init(generalOptions, openOptions);

    }


})(jQuery);