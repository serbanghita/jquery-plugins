<?php
if($_GET['action']=='inbox' && $_GET['response']=='json'){
    
    $msg = '
    <div class="inbox-messages">
    <div><img src="serban-avatar.jpg" width="24" /> Serban Ghita</div>
    <p><a href="#cristina">Cristina</a> poked you.</p>
    
    <p>Today\'s birthdays: <a href="#cristinap">Cristina Popescu</a> (Sat), <a href="#eugenb">Eugen Badea</a> (Sun)</p>
    
    <p><a href="#radu">Radu</a> invited you to <a href="#event1">Drupalcamp Bucharest 2011</a> <i>(Saturday, May 7 at 9:00pm)</i></p>
    </div>
    ';
    
    header('Content-type: application/json');
    echo @json_encode(array('notice_count' => 3, 'notice_content' => $msg));    
    
}

if($_GET['page']=='get_message'){
    
$msg = <<<HTML
<form id="poll-1" method="post">
<p>Sed condimentum ultricies leo vitae interdum. 
    Cras fringilla, urna nec vehicula mattis, 
    lacus sapien tempus nunc, ut imperdiet 
    neque sapien ac nibh.</p>
<p>Quisque a nunc felis, vel bibendum diam. 
Phasellus a velit libero.</p> 
<input type="radio" name="answer" value="Yellow"> Yellow
<br />
<input type="radio" name="answer" value="Blue"> Blue
<br />
<input type="radio" name="answer" value="Red"> Red
<br /> 
<input type="submit" name="vote" value="Vote now" id="vote-now" /> 
<input type="hidden" name="vote" value="1" />
</form>

<script type="text/javascript">
$('#vote-now').bind('click', function(){
    $.ajax({
        url: 'ajax.php', 
        type: 'POST', 
        data: $('#poll-1').serialize(),
        success : function(data){
            $('#poll-1').html(data);
        }
    });
    return false;
});
</script>

HTML;

if($_GET['response']=='html'){
    echo $msg;
}

if($_GET['response']=='json'){
    header('Content-type: application/json');
    echo @json_encode(array('notice_count' => 2, 'notice_content' => $msg));
}

exit;
    
}

if(isset($_POST['vote'])){
    
$msg = <<<HTML
<p>Your answer was: {$_POST['answer']}</p>
<p>Thanks a lot for voting!</p>
HTML;

echo $msg; exit;
    
}