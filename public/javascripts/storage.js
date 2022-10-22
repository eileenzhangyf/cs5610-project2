/////////////////////////
// Listeners
/////////////////////////
document.addEventListener("DOMContentLoaded", function() {
  loadTable();
});


/////////////////////////
// Functions with Vanilla JS
/////////////////////////
function addRow(tableID, content) {
  let tableBodyRef = document.getElementById(tableID);
  let newRow = tableBodyRef.insertRow(-1);
  newRow.innerHTML = content;
  tableBodyRef.appendChild(newRow);
}

function handleResponse(resp) {
  if (!resp.ok) throw Error(resp.statusText);
  return resp.json();
}

function decodeDate(rawDate) {
  let date = new Date(rawDate);
  return `${date.getMonth()}/${date.getDate()}/${date.getFullYear()}`;
}

function loadTable() {
  let tableID = 'storage-table-body'

  fetch('/api/storage/')
    .then(handleResponse)
    .then((data) => {
      // console.log('data: ', data);
      
      for (const d in data) {
        console.log(data[d]);
        let purchasedDate = data[d].purchased;
        let d_date = decodeDate(purchasedDate);
        let daysLast = data[d].daysLast;

        // TODO: Calculate w/ daysLast & pucharsedDate
        let daysRemained = daysLast; 

        let content = `<tr>
              <td data-label="Item">${data[d].name}</td>
              <td data-label="Category">${data[d].category}</td>
              <td data-label="Price">${data[d].price}</td>
              <td data-label="Quantity">${data[d].quantity}</td>
              <td data-label="Purchased Date">${d_date}</td>
              <td data-label="Remaining Days">${daysRemained}</td>
              <td data-label="Edit Button"><button class="editBtn">edit</button></td>
              </tr>`
        addRow(tableID, content);
      }
    }).then(() => {
      // Add button listeners
      let btns = Array.from(document.getElementsByClassName('editBtn'));

      btns.forEach(btn => {
        btn.addEventListener('click', function handleClick(event) {
          // console.log('Edit button clicked', event);
          if (btn.innerText == "edit") btn.innerText = "modify";
          else btn.innerText = "edit";
        });
      });
    }).catch((e) => {
      console.log(`Failed: loading all storage items. ${e}`);
    });
}

