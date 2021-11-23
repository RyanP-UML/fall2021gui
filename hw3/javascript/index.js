// File: index.js
// Date: 2021-10-26
// Author: Ryan Park, ryan_park@student.uml.edu
// Description: This file contains all the javascript for multiplcation table
// Copyright (c) 2021 by Ryan Park. All rights reserved.

// code for build table button
let build_table_btn = document.getElementById('build-table-btn');
build_table_btn.addEventListener('click', build_table);

// Code for reset button
let reset_btn = document.getElementById('reset-btn')
reset_btn.addEventListener('click', () => {
    if (!! document.getElementById('multi-table'))
        clear_table();
    clearError();
    clear_input();
});

// scope = {col || row}
function create_tableHead(scope, value) {
    var th_element = document.createElement('th');
    th_element.innerHTML = value;
    th_element.setAttribute('scope', scope);
    return th_element;
}

// creates td element
function create_tableData() { 
    var td_element = document.createElement('td');
    td_element.innerHTML = "error";
    return td_element;
}

// adds column to table
function add_column(columnValue) {
    var column_target = document.getElementById('table-column-target');
    column_target.appendChild(create_tableHead('col', columnValue));
}

// adds row to table
function add_row(rowValue) {
    var tr_element = document.createElement('tr');
    tr_element.appendChild(create_tableHead('row', rowValue));

    let columnStart = get_column_start();
    let columnEnd = get_column_End();
    let numberOfColumns = Math.abs(columnEnd - columnStart) + 1;

    for (var i = 0; i < numberOfColumns; ++i){
        tr_element.appendChild(create_tableData());
    }
    
    var row_target = document.getElementById('table-row-target');
    row_target.appendChild(tr_element);
}

function get_column_start() {
    return Number(document.getElementById('ColumnStart').value);
}

function get_row_start() {
    return Number(document.getElementById('RowStart').value);
}

function get_column_End() {
    return Number(document.getElementById('ColumnEnd').value);
}

function get_row_End() {
    return Number(document.getElementById('RowEnd').value);
}

function create_table_element() {
    let table_element = document.createElement('table');
    table_element.classList.add('table')
    table_element.classList.add('table-striped')
    table_element.classList.add('table-bordered')
    table_element.classList.add('tableFixHead')
    table_element.setAttribute('id', 'multi-table');

    let thead_element = document.createElement('thead');
    let tr_element = document.createElement('tr');
    let th_element = document.createElement('th');

    th_element.setAttribute('scope', 'col');
    th_element.innerHTML = '*';

    tr_element.appendChild(th_element);
    tr_element.setAttribute('id', 'table-column-target');

    thead_element.appendChild(tr_element);
    table_element.appendChild(thead_element);

    let tbody_element = document.createElement('tbody');
    tbody_element.setAttribute('id', 'table-row-target');

    table_element.appendChild(tbody_element);
    
    return table_element;
}

function calculate_table() {
    let tble = document.getElementById('multi-table');
    let rows = tble.rows;
    let cols = rows[0].cells.length;

    for (let i = 1; i < rows.length; ++i){
        for (let j = 1; j < cols; ++j)
            rows[i].cells[j].innerHTML = rows[i].cells[0].innerHTML * rows[0].cells[j].innerHTML;
    }

}

function build_table() {
    clearError();

    if (!! document.getElementById('multi-table'))
        clear_table();

    if (isValid_input()) {
        let tableDiv = document.getElementById('table-div');
        tableDiv.removeAttribute('hidden');
        let table_element = create_table_element();
        tableDiv.appendChild(table_element);

        let columnStart = get_column_start();
        let columnEnd = get_column_End();
        let rowStart = get_row_start();
        let rowEnd = get_row_End();

        // Code block to handle if inputs are entered reverse //////////////////
        if (columnStart <= columnEnd) {
            for(let i = columnStart; i <= columnEnd; ++i)
                add_column(i);
            
            if (rowStart <= rowEnd) {
                for(let i = rowStart; i <= rowEnd; ++i)
                    add_row(i);
            } 
            else {
                for(let i = rowStart; i >= rowEnd; --i)
                    add_row(i);
            }
        } 
        else {    // if columnStart is greater than column end
            for(let i = columnStart; i >= columnEnd; --i)
                add_column(i);
            
            if (rowStart <= rowEnd){
                for(let i = rowStart; i <= rowEnd; ++i)
                    add_row(i);
            } 
            else {
                for(let i = rowStart; i >= rowEnd; --i)
                    add_row(i);
            }
        }
        ////////////////////////////////////////////////////////////////////////
        calculate_table()
    }
}

function clear_table() {
        document.getElementById('table-div').setAttribute('hidden', '');
        let tble = document.getElementById('multi-table');
        let rows = tble.rows;
        let cols = rows[0].cells.length;
        for (let i = 0; i < rows.length; ++i){
            for (let j = 0; j < cols; ++j)
                rows[i].deleteCell(0);
        }

        tble.parentNode.removeChild(tble);
}

function clear_input() {
    document.getElementById('ColumnStart').value = '';
    document.getElementById('ColumnEnd').value = '';
    document.getElementById('RowStart').value = '';
    document.getElementById('RowEnd').value = '';
}

function isValid_input() {
    if (!document.getElementById('ColumnStart').checkValidity()) {
        printError('Column [Start]');
        return false;
    }
    if (!document.getElementById('ColumnEnd').checkValidity()) {
        printError('Column [End]');
        return false;
    }
    if (!document.getElementById('RowStart').checkValidity()) {
        printError('Row [Start]');
        return false;
    }
    if (!document.getElementById('RowEnd').checkValidity()) {
        printError('Row [End]');
        return false;
    }
    return true;
}

function printError(errorId) {
    let errorBlock = document.getElementById('error-block');
    let errorMessage = ' must be an integer between -50 and 50...';
    errorBlock.innerHTML = errorId + errorMessage;
}

function clearError() {
    let errorBlock = document.getElementById('error-block');
    errorBlock.innerHTML = '';
}


