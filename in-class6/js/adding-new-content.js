$(function() {
	$('ul').before('<p>Just Updated</p>')

    $('li.hot').prepend('+ ');

    $('li:last').after('<li id="five">gluten-free soy sauce</li>');	
});