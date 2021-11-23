$(function() {
    $("li:contains('pine')").text('almonds');
	
    $('li.hot').wrap('<em></em>')
    
    $('li:first').remove();
});