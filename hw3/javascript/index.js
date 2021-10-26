
var build_table_btn = document.getElementById('build-table-btn');
build_table_btn.addEventListener("click", build_table);

// scope = {col || row}
function create_tableHead(scope) {
    var th_element = document.createElement('th');
    var input_element = document.createElement('input');

    th_element.setAttribute('scope', scope);
    input_element.setAttribute('class', 'form-control');
    input_element.setAttribute('type', 'number');
    input_element.setAttribute('placeholder', 'NEWinput');

    th_element.appendChild(input_element);
    return th_element;
}

function create_tableData() { 
    var td_element = document.createElement('td');
    td_element.innerHTML = "new";
    return td_element;
}

function add_column() {
    var column_target = document.getElementById('table-column-target');
    column_target.appendChild(create_tableHead('col'));
}

function add_row() {
    var tr_element = document.createElement('tr');
    tr_element.appendChild(create_tableHead('row'));

    var columnNumber = get_number_of_columns();
    for (var i = 0; i < columnNumber; ++i){
        tr_element.appendChild(create_tableData());
    }
    
    var row_target = document.getElementById('table-row-target');
    row_target.appendChild(tr_element);
}

function get_number_of_columns() {
    return document.getElementById('ColumnInput').value;
}

function get_number_of_rows() {
    return document.getElementById('RowInput').value;
}

function create_table_element() {
    let table_element = document.createElement('table');
    table_element.classList.add('table')
    table_element.classList.add('table-striped')
    table_element.classList.add('table-bordered')
    table_element.setAttribute('id', 'multi-table');

    let thead_element = document.createElement('thead');
    let tr_element = document.createElement('tr');
    let th_element = document.createElement('th');

    th_element.setAttribute('scope', 'col');
    th_element.innerHTML = '**';

    tr_element.appendChild(th_element);
    tr_element.setAttribute('id', 'table-column-target');

    thead_element.appendChild(tr_element);
    table_element.appendChild(thead_element);

    let tbody_element = document.createElement('tbody');
    tbody_element.setAttribute('id', 'table-row-target');

    table_element.appendChild(tbody_element);
    
    return table_element;
}

function build_table() {
    if (!! document.getElementById('multi-table'))
        clear_table();
    
    let tableDiv = document.getElementById('table-div');
    let table_element = create_table_element();
    tableDiv.appendChild(table_element);

    var columnNumber = get_number_of_columns();
    var rowNumber = get_number_of_rows();

    for(let i = 0; i < columnNumber; ++i)
        add_column();
    
    for(i = 0; i < rowNumber; ++i)
        add_row();
    
}

function clear_table() {
    var tble = document.getElementById('multi-table');
    var rows = tble.rows;
    var cols = rows[0].cells.length;
    for (let i = 0; i < rows.length; ++i){
        for (let j = 0; j < cols; ++j)
            rows[i].deleteCell(0);
    }

    tble.parentNode.removeChild(tble);
}


