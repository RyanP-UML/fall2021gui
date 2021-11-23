$(function() {
    let backgroundColor = $('li:first').css('background-color');

    $('ul').after('<p>' + backgroundColor + '</p>');

    $('li').css({
        'background-color' : '#c5a996',
        'border' : '1px solid white',
        'color' : 'black',
        'text-shadow' : 'none',
        'font-family' : 'Georgia'

    });

});