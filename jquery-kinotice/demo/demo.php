<!doctype html>
    <html>
        <head>
            <title>jQuery kiNotice Plugin - Bottom Slider</title>
            <meta charset="utf-8" />
            <script type="text/javascript" src="../lib/jquery-1.6.2.min.js"></script>
            <script type="text/javascript" src="../jquery.kinotice.js?<?php echo time(); ?>"></script>
            <link rel="stylesheet" type="text/css" href="../../css/reset-min.css" />
            <link type="text/css" rel="stylesheet" href="demo.css" />
            <link type="text/css" rel="stylesheet" href="kinotice.css" />
                    
<?php 
if($_GET['example']=='string'):
$kiNotice = <<<JAVASCRIPT
$.fn.kiNotice({
    autoOpen: true, 
    hideOnClose: true,
    title: 'Today\'s announcement', 
    content: '<p>Quisque a nunc felis, vel bibendum diam. Phasellus a velit libero. Aliquam consectetur arcu vitae massa pellentesque accumsan.</p>'
});
JAVASCRIPT;
endif;


if($_GET['example']=='dom'):
$kiNotice = <<<JAVASCRIPT
$.fn.kiNotice({
    autoOpen: true, 
    content: $('#important-message')
});
JAVASCRIPT;
endif;


if($_GET['example']=='dom2'):
$kiNotice = <<<JAVASCRIPT
$.fn.kiNotice({
    autoOpen: false,
    content: $('#important-message'),
    title: 'This will not auto-open'
});
JAVASCRIPT;
endif;

                
if($_GET['example']=='attached'):
$kiNotice = <<<JAVASCRIPT
$('#content').kiNotice({
    autoOpen: true,
    hideOnClose: true,
    ajaxSettings: {
        url: 'ajax.php?page=get_message&response=html',
        type: 'GET'
    }
});
JAVASCRIPT;
endif;

               
if($_GET['example']=='ajax'):
$kiNotice = <<<JAVASCRIPT
$.fn.kiNotice({
    autoOpen: true, 
    hideOnClose: true,
    ajaxSettings: {
        url: 'ajax.php?page=get_message&response=html',
        type: 'GET',
        success: function(data){
            this.kiNoticeContent.html(data);
            this._open();                            
        }
    },
    title: 'An AJAX poll title'
});
JAVASCRIPT;
endif; 


if($_GET['example']=='skin2'):
$kiNotice = <<<JAVASCRIPT
$.fn.kiNotice({
    autoOpen: false,
    content: $('#important-message'),
    extraClasses: 'skin2'                    
});
JAVASCRIPT;
endif; 

if($_GET['example']=='skin3'):
$kiNotice = <<<JAVASCRIPT
$.fn.kiNotice({
    autoOpen: false,
    content: $('#important-message'),
    extraClasses: 'DarkKissTheme',
    animationSpeed: 500,
    extraNoticeInterval: 6000
});
JAVASCRIPT;
endif;
    
if($_GET['example']=='skin4'):
$kiNotice = <<<JAVASCRIPT
$.fn.kiNotice({
    autoOpen: false,
    ajaxSettings: {
        url: 'ajax.php?action=inbox&response=json',
        type: 'GET',
        success: function(data){
                this._setToggleIcon('<sup>'+data.notice_count+'</sup>');
                this.kiNoticeContent.html(data.notice_content);
                this._open();
        }
    },
    extraClasses: 'AlmaTheme',
    extraNoticeInterval: 1000                    
});                    
JAVASCRIPT;
endif; 
?>
            <script type="text/javascript">
                $(document).ready(function(){
                    <?php echo $kiNotice; ?>   
                });
            </script>            
        </head>
        <body>            
            <div id="page-wrap">
                
            <header>
                <div id="header"><h1>jQuery kiNotice Demo Examples</h1></div>
            </header>
                
                <div id="menu">
                    <ul>
                        <li>
                            <a href="demo.php?example=string">Static string</a><br />
                            <i>Good for short announcements on static HTML sites.</i>
                        </li>
                        <li>
                            <a href="demo.php?example=dom">DOM object</a><br />
                            <i>Good for mixed content announcements with distinct CSS features.</i>
                        </li>
                        <li>
                            <a href="demo.php?example=dom2">DOM object</a><br />
                            <i>Just a variation of the example above</i>
                        </li>
                        <li>
                            <a href="demo.php?example=attached">Attached to DOM object</a><br />
                            <i>The notification is attached to a DOM object in the page.</i>
                        </li>                        
                        <li>
                            <a href="demo.php?example=ajax">AJAX content</a><br />
                            <i>Good for polls, feedback, instant notifications</i>
                        </li>
                        <li>
                            <a href="demo.php?example=skin2">KissTheme</a><br />
                            <i>'KISSinsights' or 'Total Feedback' inspired skin</i>
                        </li>
                        <li>
                            <a href="demo.php?example=skin3">DarkKissTheme</a><br />
                            <i>Same as above, with an extra buzz every 5 seconds</i>
                        </li>
                        <li class="last">
                            <a href="demo.php?example=skin4">AlmaTheme + multiple notifications</a><br />
                            <i>Multiple notifications via AJAX</i>
                        </li>                        
                    </ul>
                </div>
                <div id="content">
                    
                    <p style="color:#080;">
                        Please <b style="text-decoration:underline;">&laquo; use the menu in the left</b> to see the examples. <br />
                        If you want to see how the plugin is called, check the source code of this page in the &lt;head&gt; section.</p>
                    
                    
                    
                    <p>Code look like this:</p>
                    
                    <code style="margin:10px 0px; padding:10px 0px; display:block; overflow: auto; background-color:papayawhip;"><pre><?php echo trim(htmlentities($kiNotice)); ?></pre></code>
                    
                    <p>
                        Curabitur ornare auctor egestas. Sed feugiat convallis tellus. Integer orci risus, bibendum ultricies pharetra convallis, luctus sit amet eros. Sed feugiat rutrum mauris et porttitor. Quisque a nunc felis, vel bibendum diam. Phasellus a velit libero. Aliquam consectetur arcu vitae massa pellentesque accumsan. Proin porta aliquam sollicitudin. Suspendisse consequat consectetur massa, non rutrum libero ultricies quis. Curabitur urna magna, sagittis ac volutpat vel, ultrices sed metus. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Etiam erat urna, condimentum id euismod a, tristique a quam. Donec ultrices adipiscing mollis. Curabitur lobortis justo quis augue lacinia id imperdiet elit lobortis. Mauris sodales aliquam risus, sed condimentum felis malesuada ac. Aenean ullamcorper consectetur magna, at dictum nunc eleifend eget. Morbi congue, velit a vulputate elementum, felis lectus tristique enim, eu auctor dui odio id mauris. Nulla facilisi. Nunc at nunc mauris. Suspendisse potenti.</p>
<p>
Suspendisse consequat felis laoreet elit rhoncus tempor. Fusce at dui id libero ornare vulputate vitae sit amet ante. Suspendisse potenti. Suspendisse at purus massa. Donec at magna felis. Donec metus nibh, gravida posuere consequat ut, hendrerit molestie eros. Cras nulla turpis, dignissim in euismod nec, aliquet quis nisi. Nullam et velit ut justo semper blandit sed vitae mauris. Donec volutpat lacus eget nunc dictum et fermentum tortor consectetur. Nullam vehicula, enim vitae egestas scelerisque, massa est sollicitudin turpis, quis ornare ipsum purus eget quam. Maecenas consequat molestie egestas. Praesent tincidunt dolor at purus lobortis sed sagittis nisi tristique.
                    </p>
                    
                </div>
                <div id="footer">
                    <p>Copyright @ 2011 - Serban Ghita</p>
                </div>
            </div>
            <div id="important-message" style="display:none;">
                <p>Hello there from <b>Serban</b>!</p>
                <!--<img src="http://ghita.org/ux/slideshow/demo/test-slide2.png" alt="" style="float:left; margin-right: 5px;" />-->
                <p>This is an important message that is placed in the source code, and kiNotice found it and displayed it here!</p>
                <p>Nullam et velit ut justo semper blandit sed vitae mauris. Donec volutpat lacus eget nunc dictum et fermentum tortor consectetur.</p>
            </div>
        </body>
    </html>