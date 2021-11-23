// File: index.js
// Date: 2021-11-22
// Author: Ryan Park, ryan_park@student.uml.edu
// Description: This file contains all the javascript for multiplcation table
// Copyright (c) 2021 by Ryan Park. All rights reserved.
// Resources Used: https://www.tutorialspoint.com, https://www.geeksforgeeks.org

$(document).ready(function(){
/*******************************************************************************
* Buttons
*******************************************************************************/
    // Code for reset button
    let reset_btn = document.getElementById('reset-btn')
    reset_btn.addEventListener('click', () => {
        if (!! document.getElementById('multi-table'))
            clear_table();
        //clearError();
        clear_input();
    });

    $('#save-btn').on('click', function(){
        create_tab();
    });

    $('#closeAll-btn').on('click', function(){
        $('#tabs-pane li').each(function(){
            $(this).remove();
        })
        $('#tabs-pane div').each(function(){
            $(this).remove();
        })
    });

    $('#closeCurrent-btn').on('click', function(){
        let currentTab = $('#tabs-pane').tabs('option', 'active');
        $('#tabs-pane li:nth-child(' + (currentTab + 1) + ')').remove();

        $('#tab-' + currentTab).remove();
    });

/*******************************************************************************
* Table Creation
*******************************************************************************/
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

        let columnStart = $('#ColumnStart').val();
        let columnEnd = get_column_End();
        let numberOfColumns = Math.abs(columnEnd - columnStart) + 1;

        for (var i = 0; i < numberOfColumns; ++i){
            tr_element.appendChild(create_tableData());
        }
        
        var row_target = document.getElementById('table-row-target');
        row_target.appendChild(tr_element);
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

        // If table exsists : clear table
        if (!! document.getElementById('multi-table'))
            clear_table();

        if($('#input-form').valid()) {
            let tableDiv = document.getElementById('table-div');
            tableDiv.removeAttribute('hidden');
            let table_element = create_table_element();
            tableDiv.appendChild(table_element);

            let columnStart = $('#ColumnStart').val();
            let columnEnd = get_column_End();
            let rowStart = $('#RowStart').val();
            let rowEnd = get_row_End();

            // Code block to handle if inputs are entered reverse //////////////
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
            ////////////////////////////////////////////////////////////////////
            calculate_table();
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
        validator.resetForm();
    }
/*******************************************************************************
* Validation
*******************************************************************************/
    $.validator.addMethod("noDecimal", function(value, element) {
        return !(value % 1);
    }, "^ Must be a whole number, no decimal numbers");

    let validator = $('#input-form').validate({
        errorClass: "invalid",
        rules: {
            ColumnStart: {
                required: true,
                range: [-50,50],
                noDecimal: true
            },
            ColumnEnd: {
                required: true,
                range: [-50,50],
                noDecimal: true
            },
            RowStart: {
                required: true,
                range: [-50,50],
                noDecimal: true
            },
            RowEnd: {
                required: true,
                range: [-50,50],
                noDecimal: true
            }
        },
        messages: {
            ColumnStart: {
                required: "^ Column Start is required",
                range: "^ Column Start must be an integer within -50 and 50"
            },
            ColumnEnd: {
                required: "^ Column End is required",
                range: "^ Column End must be an integer within -50 and 50"
            },
            RowStart: {
                required: "^ Row Start is required",
                range: "^ Row Start must be an integer within -50 and 50"
            },
            RowEnd: {
                required: "^ Row End is required",
                range: "^ Row End must be an integer within -50 and 50"
            }

        }
    });

    $('#input-form').change(function(){
        if($('#input-form').valid()){
            build_table();
        }
        
    });

/*******************************************************************************
* Slider Implentation
*******************************************************************************/
    $('#col-slider').slider({
        range: true,
        min: -50,
        max: 50,
        values: [-25, 25],
        slide: function(event, ui) {
            $('#ColumnStart').val(ui.values[0]);
            $('#ColumnEnd').val(ui.values[1]);
            build_table();
        }
    });

    $('#row-slider').slider({
        orientation: "vertical",
        range: true,
        min: -50,
        max: 50,
        values: [-25, 25],
        slide: function(event, ui) {
            $('#RowStart').val(ui.values[1]);
            $('#RowEnd').val(ui.values[0]);
            build_table();
        }
    });

    // Updates sliders if integers are entered /////////////////////////////////
    $('#ColumnStart').blur(function(){
        $('#col-slider').slider("values", 0, parseInt($(this).val()));
    });

    $('#ColumnEnd').blur(function(){
        $('#col-slider').slider("values", 1, parseInt($(this).val()));
    });

    $('#RowStart').blur(function(){
        $('#row-slider').slider("values", 1, parseInt($(this).val()));
    });

    $('#RowEnd').blur(function(){
        $('#row-slider').slider("values", 0, parseInt($(this).val()));
    });
    ////////////////////////////////////////////////////////////////////////////

/*******************************************************************************
* Tabs Implementation
*******************************************************************************/
    $(function(){
        $('#tabs-pane').tabs({
            active: 0,
            collapsible:true,
            hide: false
        });
    });

    function create_tab() {
        let newTab = document.createElement('li');
        let newA = document.createElement('a');
        let tabContent = document.createElement('div');
        

        newA.innerHTML = "<span>Col: (" + $('#ColumnStart').val() + ")<->(" + $('#ColumnEnd').val() + ")</span>" +
        "</br><span>Row: (" + $('#RowStart').val() + ")<->(" + $('#RowEnd').val() + ")</span>";
        newA.setAttribute('href', "#tab-" + $('#tabs-pane li').length);

        tabContent.setAttribute('id', "tab-" + $('#tabs-pane li').length);
        $('#table-div').clone().appendTo(tabContent);
        $('#tab-' + $('#tabs-pane li').length + ' div').removeAttr('id', 'table-div');
        $('#tabs-pane').append(tabContent);
        newTab.append(newA);
        $('#tabs-pane ul').append(newTab);
        $('#tabs-pane').tabs('refresh');
    }

    

    
      
});

