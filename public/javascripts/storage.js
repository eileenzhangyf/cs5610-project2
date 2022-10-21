// Get things from the edit button
$(document).ready(function(){
  $('.editbtn').click(function(){
      $(this).html($(this).html() == 'edit' ? 'modify' : 'edit');
  });
});

/////////////////////////
// Functions with Vanilla JS
/////////////////////////
function addRow(tableID, content) {
  let tableBodyRef = document.getElementById(tableID);
  // console.log('table body ref: ' + tableBodyRef)
  let newRow = tableBodyRef.insertRow(-1);
  newRow.innerHTML = content;
  // console.log('new row: ' + newRow);

  tableBodyRef.appendChild(newRow);
}

function handleResponse(resp) {
  if (!resp.ok) throw Error(resp.statusText);
  return resp.json();
}

function decodeDate(rawDate) {
  let date = new Date(rawDate);

  let ret = `${date.getMonth()}/${date.getDate()}/${date.getFullYear()}`;
  console.log('ret', ret);
  return ret;
}

function loadTable() {
  let tableID = 'storage-table-body'

  fetch('/api/storage/')
    .then(handleResponse)
    .then((data) => {
      console.log('data: ', data);
      
      for (const d in data) {
        console.log(data[d]);
        let d_date = decodeDate(data[d].purchased);
        let content = `<tr>
              <td data-label="Item">${data[d].name}</td>
              <td data-label="Category">${data[d].category}</td>
              <td data-label="Price">${data[d].price}</td>
              <td data-label="Quantity">${data[d].quantity}</td>
              <td data-label="Purchased Date">${d_date}</td>
              <td data-label="Remaining Days">${data[d].daysLast}</td>
              <td data-label="Edit Button"><button class="editbtn">edit</button></td>
              </tr>`
              // <td data-label="Purchased Date">${purchasedDate}</td>
              // <td data-label="Remaining Days">${remainedDays}</td>
        // console.log('content', content);
        addRow(tableID, content);
      }
      return data;
    })
    .catch((e) => {
      console.log(`Failed: loading all storage items. ${e}`);
    });

  
    

  
  // for (let i = 0; i < 3; i++) {
  //   addRow(tableID, content);
  // }
}

document.addEventListener("DOMContentLoaded", function() {
  loadTable();
  // fetchData();
});
