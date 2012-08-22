/**
 * $.dynamicPopup({
 *     content: 'This is the dynamic content of the popup.',
 *     popupId: '',
 *     popupClass: '',
 *     popupContentClass: '',
 *     popupCloseButtonClass: '',
 *     popupContentCloseButtonClass: '',
 *     popupContentCloseButtonLabel: '',
 *     callbacks: {
 *          popup: function(){ },
 *          popupContent: function(){ },
 *          popupCloseButton: function(){ },
 *          popupContentCloseButton: function(){ }
 *     },
 *     popupOptions: { // http://jquerymobile.com/demos/1.2.0-alpha.1/docs/pages/popup/options.html
 *          corners: bool,
 *          initSelector: '',
 *          overlayTheme: '',
 *          positionTo: '',
 *          shadow: bool,
 *          theme: '',
 *          tolerance: '',
 *          transition: ''
 *     }
 * });
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
                                        callbacks: null,
                                        content: '',
                                        popupClass: '',
                                        popupContentClass: 'popupContent ui-content',
                                        popupCloseButtonClass: 'popupCloseButton ui-btn-right',
                                        popupContentCloseButtonClass: 'popupContentCloseButton',
                                        popupContentCloseButtonLabel: 'Okay',
                                        popupId: 'popup' + $activePage.attr('id')
                                    }, options);

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

                    popupContentCloseButton: $('<a></a>').attr({ 'href': '#', 'data-rel': 'back', 'data-inline': true, 'data-icon': 'check', 'data-iconpos': 'right', 'data-theme': 'e' }).html('Okay').button()

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

            // Apply all possible callbacks.
            if(self.settings.callbacks){

                $.each(self.settings.callbacks, function(i, callback){

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

    $.fn.dynamicPopup = function(options){

        var popup = new dynamicPopup();
        return popup.init(options, this);

    }


})(jQuery);