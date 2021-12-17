// File: scrabble.js
// Date: 2021-12-16
// Author: Ryan Park, ryan_park@student.uml.edu
// Description: javascript file for scrabble webpage
// Copyright (c) 2021 by Ryan Park. All rights reserved.
// Resources Used: https://www.tutorialspoint.com, https://www.geeksforgeeks.org

/** Global Variables */
let my_pieces = {};
let probabilityArray = [];

/**Event listners */
$('#submit-word-btn').on('click', () => {
    let score = parseInt($('#current-score').attr("value"));
    score += get_word_score();
    $('#current-score').attr("value", score);
    $('#current-score').text("Current Score = " + score);
    clear_board();
    deal_hand();
});

$('#restart-btn').on('click', () => {
    clear_board();
    clear_hand();
    reset_score();
    rebuild_deck();
    deal_hand();
})

$(document).ready(function(){
    /** Get pieces data from json file */
    
    $.ajax({
        url: "./resources/pieces.json",
        async: false,
        dataType: 'json',
        success: (data) => {
            my_pieces = data;
        }
    });
    console.log(my_pieces);
    /** Probability distrobution array */
    
    $.each(my_pieces, function(index) {
        let current = my_pieces[index]
        for (let i = 0; i < current.amount; ++i)
            probabilityArray.push(current.letter);
    });
    console.log(probabilityArray);
   
    /**************************************************************************/
    /** Jquery ui code for drag and drop functionality  */
    $('.tile img').draggable({
        revert: true
    });

    $('.tile').droppable({
        drop: function(ev, ui) {
            var dropped = ui.draggable;
            var droppedOn = $(this);
            $(dropped).detach().css({top: 0,left: 0}).appendTo(droppedOn);
            update_word_score();
        },
        out: function(ev, ui) {
            $(this).droppable('enable');
        }
    });

    $('.board-drop-zone').droppable({
        accept: 'img',
        drop: function(ev, ui) {
            var dropped = ui.draggable;
            var droppedOn = $(this)
            $(dropped).detach().css({top: 0,left: 0}).appendTo(droppedOn);
            droppedOn.attr("empty", 0);
            update_word_score();
        }
    });
    /**************************************************************************/

    /**Assign player starter tiles */
    $('.tile img').each(function(){
        let pickedTile = pick_tile();
        $(this).attr("src", pickedTile.src);
        $(this).attr("data-letter", pickedTile.letter);
    })
    
}); // end of $().ready()

 /**Function picks and return random tile object*/
 function pick_tile() {
    let index = Math.floor(Math.random() * probabilityArray.length);
    let pickedLetter = probabilityArray[index];
    let foundTile = my_pieces.find(foundTile => foundTile.letter === pickedLetter);
    probabilityArray.splice(index, 1);
    return foundTile;
}

function get_word_score() {
    let wordScore = 0;
    $('.board-drop-zone img').each(function(){
        let foundTile = my_pieces.find(foundTile => foundTile.letter === $(this).attr("data-letter"));
        if($(this).parent().is($('.board-drop-zone:nth-child(1)')))
            wordScore = foundTile.value * 2;
        else 
            wordScore += foundTile.value;
    })
    $('.board-drop-zone img').each(function(){
        if($(this).parent().is($('.board-drop-zone:nth-child(6)')))
            wordScore *= 2;
    })
    //$('#word-score').text("Word Score = " + wordScore);
    return wordScore;
}

function update_word_score() {
    $('#word-score').text("Word Score = " + get_word_score());
}

function clear_board() {
    $('.board-drop-zone').each(function(){
        if($(this).has('img'))
            $(this).empty();
    })
    update_word_score();
}

function clear_hand() {
    $('.tile img').each(function() {
        $(this).remove();
    })
}

function reset_score() {
    $('#current-score').attr('value', 0)
    $('#current-score').text("Current Score = 0");
}

function rebuild_deck() {
    probabilityArray.splice(0, probabilityArray.length)

    $.each(my_pieces, function(index) {
        let current = my_pieces[index]
        for (let i = 0; i < current.amount; ++i)
            probabilityArray.push(current.letter);
    });
}

function deal_hand() {
    $('.tile').each(function(){
        if($(this).find('img').length <= 0){
            let new_img = document.createElement("img");
            let pickedTile = pick_tile();
            new_img.setAttribute("src", pickedTile.src);
            new_img.setAttribute("data-letter", pickedTile.letter);
            $(this).append(new_img);
        }
    });
    $('.tile img').draggable({
        revert: true
    });
}

