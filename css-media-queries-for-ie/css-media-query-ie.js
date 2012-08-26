/*!
 * CSS Media Queries for IE later than 9.0
 * http://ghita.org/tipoftheday/css-media-queries-for-ie
 * Copyright 2011, Serban Ghita
 * Released under the GPL Licenses.
 */

var detectAndUseStylesheet = function(){
    
    var currentWidth = screen.width,
        // currentWidth = parseInt(document.documentElement.clientWidth),
        //currentWidth = 320,
        cssLinks = document.getElementsByTagName('link'),
        _check = new RegExp(currentWidth, 'i'),
        foundResolution = false,
        allSupportedResolutions = [];

    for(ii in cssLinks){ 

        if(cssLinks[ii].href){

            if(cssLinks[ii].id){                
              allSupportedResolutions.push(cssLinks[ii].id.match(/[0-9]+/i)[0]);
              
              if(cssLinks[ii].id.match(_check)){
                document.getElementById('stylesheet-'+currentWidth).removeAttribute('media');
                foundResolution = true;
              }              
              
            }
        }
    }

    // Fallback if resolution is not found.
    if(!foundResolution){
        for(ii in allSupportedResolutions){

         if(currentWidth<allSupportedResolutions[ii]){
                document.getElementById('stylesheet-'+allSupportedResolutions[ii]).removeAttribute('media');
                break;
         }			    

        }
    }		

}

window.attachEvent('onload', detectAndUseStylesheet);