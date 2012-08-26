CSS Media Query for IE later than 9.0
http://ghita.org/tipoftheday/css-media-queries-for-ie

Example of implementation
-------

We have a HTML page with multiple blocks with fixed width with the following CSS links:

-------cut-------
<link rel="stylesheet" type="text/css" href="css-media-query/core.css" />
<link rel="stylesheet" type="text/css" href="css-media-query/smartphone.css" media="only all and (max-width: 480px)" id="stylesheet-480" />
<link rel="stylesheet" type="text/css" href="css-media-query/desktops.css" media="only all and (min-width: 480px) and (max-width: 1200px)" id="stylesheet-1024" />
<link rel="stylesheet" type="text/css" href="css-media-query/wide.css" media="only all and (min-width: 1200px)" id="stylesheet-1280" />
-------cut-------

Note that we gave our CSS files id's like 'stylesheet-[RESOLUTION]'.
You can add as many CSS as you like as long as you put an id, so the script can detect it and pick it up from the rest.

Then simply put this:

-------cut-------
<!--[if lt IE 9]>
  <script type="text/javascript" src="css-media-query/css-media-query-ie.js"></script>
<![endif]-->
-------cut-------

I've tested this with success in production on IE6,IE7 and IE8.

DEMO: http://ghita.org.serbang/ux/css-media-query.php