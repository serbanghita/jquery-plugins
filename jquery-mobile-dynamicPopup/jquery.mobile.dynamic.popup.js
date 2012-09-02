/**
 * jQuery Mobile dynamic popup
 * http://ghita.org/jquery/dynamic-mobile-popup
 * Copyright 2012, Serban Ghita
 * Released under the GPL Licenses.
 */
(function($){

    function dynamicPopup(){

        var self = this,
            $popup = null,
            $activePage = $.mobile.activePage;

        this.init = function(options, elem){

            // Extend the settings.
            self.settings = $.extend({
                                        popupOptions: {},
                                        helpers: null,
                                        content: '',
                                        popupClass: '',
                                        popupContentClass: 'popupContent ui-content',
                                        popupCloseButtonClass: 'popupCloseButton ui-btn-right',
                                        popupContentCloseButtonClass: 'popupContentCloseButton',
                                        popupContentCloseButtonLabel: 'Okay',
                                        popupId: 'popup' + $activePage.attr('id')
                                    }, options);

            if(typeof options === 'string'){ self.settings.content = options; }

            $popup = $('#'+self.settings.popupId);

            // Create the popup.
            self._create();

            return self.open();

        }


        this._create = function(){

            if($popup.length==0){

                // Create the generic popup elements.
                self.el = {

                    popup: $('<div></div>').attr({ 'id': self.settings.popupId, 'data-role': 'popup', 'data-theme': 'b', 'data-overlay-theme': 'b' }),

                    popupContent: $('<div></div>').attr({ 'data-role': 'content' }).addClass(self.settings.popupContentClass),

                    popupCloseButton: $('<a></a>').attr({ 'href': '#', 'data-rel': 'back', 'data-role': 'button', 'data-icon': 'delete', 'data-iconpos': 'notext' }).addClass(self.settings.popupCloseButtonClass).html('Close').button(),

                    popupContentCloseButton: $('<a></a>').attr({ 'href': '#', 'data-rel': 'back', 'data-inline': true, 'data-icon': 'check', 'data-iconpos': 'right', 'data-theme': 'e' }).html(self.settings.popupContentCloseButtonLabel).button()

                }

                // Tie together the HTML elements.
                self.el.popup.append(self.el.popupCloseButton);
                self.el.popup.append(self.el.popupContent).append(self.el.popupContentCloseButton);

                // Append the popup to the current page.
                $activePage.append(self.el.popup);

            } else {

                self.el = {

                    popup: $popup,

                    popupContent: $popup.find('.popupContent'),

                    popupCloseButton: $popup.find('.popupCloseButton'),

                    popupContentCloseButton: $popup.find('.popupContentCloseButton')

                }

            }

            // Populate the popup.
            // 1. Static HTML string.
            if(typeof self.settings.content === 'string'){
                self.el.popupContent.html(self.settings.content);
            }
            // 2. jQuery object.
            if(self.settings.content instanceof jQuery){
                self.el.popupContent.append(self.settings.content);
            }

            // Apply all possible callback helpers.
            if(self.settings.helpers){

                $.each(self.settings.helpers, function(i, helper){

                    this.apply(self.el[i]);

                });

            }

            $popup = $('#'+self.settings.popupId);

            // Init.
            $popup.popup();



        }

        self.open = function(){
            return $popup.popup('open', self.settings.popupOptions);
        }

        self.close = function(){
            return $popup.popup('close');
        }


    }

    $.dynamic_popup = function(options){

        var popup = new dynamicPopup();
        return popup.init(options, this);

    }


})(jQuery);