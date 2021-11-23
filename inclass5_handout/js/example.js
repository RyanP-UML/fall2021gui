let ul_elements = document.getElementsByTagName('ul');

// ADD NEW ITEM TO END OF LIST
let new_item = document.createElement('li');
new_item.innerHTML = 'cream';
ul_elements[0].appendChild(new_item);

// ADD NEW ITEM START OF LIST
new_item = document.createElement('li');
new_item.innerHTML = 'kale';
ul_elements[0].insertBefore(new_item, ul_elements[0].childNodes[0]);

// ADD A CLASS OF COOL TO ALL LIST ITEMS
let li_elements = ul_elements[0].children;
for (let i = 0; i < li_elements.length; ++i){
    li_elements[i].classList.add('cool');
}

// ADD NUMBER OF ITEMS IN THE LIST TO THE HEADING
let counter_span = document.createElement('span');
let groceries_h2 = document.getElementById('page').getElementsByTagName('h2')[0];

counter_span.innerHTML = li_elements.length;
groceries_h2.appendChild(counter_span);
