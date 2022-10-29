/////////////////////////
// Listeners
/////////////////////////
document.addEventListener("DOMContentLoaded", function() {
  loadTable();
});

// TODO: enforce checking on sessions

/////////////////////////
// Functions with Vanilla JS
/////////////////////////
function clearBody(id=null) {
  let bodyId = id || 'storage-table-body';
  let node = document.getElementById(bodyId);
  while (node.hasChildNodes()) {
    node.removeChild(node.lastChild);
    console.log("cleared 1");
  }
}

function addRow(bodyId, content, rowId) {
  let tableBodyRef = document.getElementById(bodyId);
  let newRow = tableBodyRef.insertRow(-1);
  newRow.innerHTML = content;
  newRow.id = rowId;
  tableBodyRef.appendChild(newRow);
}

function handleResponse(resp) {
  console.log("resp: " + resp.status);
  if (resp.status == 401) return handleUnauthorized();
  else if (!resp.ok) throw Error(resp.statusText);
  return resp.json();
}

function handleUnauthorized() {
  console.log("Request unauthorized");
  
  
  confirm("Please log in before continue.");
  window.location.href = "/";

  return;
}

function handleDelete(event) {
  const id = this.parentElement.parentElement.id;
  console.log(`Del called with id=${id}.`);

  const params = {
    method: 'DELETE',
  };

  if (confirm("Confirm to delete this entry?")) {
    fetch(`/storage/${id}`, params)
      .then((resp) => resp.text())
      .then((resp) => {
        console.log("Delete Response: ", resp);
        clearBody();
      }).then(() => {
        loadTable(); // Refresh to show updates
      }).catch((err) => {
        console.error(err || `Delete failed with id=${id}`);
      });
    
    
  }
}

function decodeDate(rawDate) {
  let date = new Date(rawDate);
  return `${date.getMonth()}/${date.getDate()}/${date.getFullYear()}`;
}

function loadTable() {
  let bodyId = 'storage-table-body';

  fetch('/storage/user')
    .then(handleResponse)
    .then((data) => {
      // console.log('data: ', data);
      
      for (const d in data) {
        console.log("row: ", data[d]);
        let rowId = data[d]._id;
        let purchasedDate = data[d].purchased;
        let d_date = decodeDate(purchasedDate);
        let daysLast = data[d].daysLast;
        console.log('item: ', data[d].item);
        console.log('daysLast: ', data[d].daysLast);
        console.log();

        // TODO: Calculate w/ daysLast & pucharsedDate
        let daysRemained = daysLast; 
        console.log(`days: ${daysLast} : ${daysRemained}`)
        let content = `
            <td data-label="Item">${data[d].item || data[d].name}</td>
            <td data-label="Category">${data[d].category}</td>
            <td data-label="Price">${data[d].price}</td>
            <td data-label="Quantity">${data[d].quantity}</td>
            <td data-label="Purchased Date">${d_date}</td>
            <td data-label="Remaining Days">${daysRemained}</td>
            <td data-label="Actions">
              <button class="actionBtn deleteBtn">delete</button>
            </td>`;
        
        addRow(bodyId, content, rowId);
      }
    }).then(() => {
    // Add button listeners for deletes
    let deleteBtns = Array.from(document.getElementsByClassName('deleteBtn'));
      deleteBtns.forEach(btn => {
        btn.addEventListener('click', handleDelete);
      });

      /*
      // Add button listeners for edits
      // let editBtns = Array.from(document.getElementsByClassName('editBtn'));
      // editBtns.forEach(btn => {
      //   btn.addEventListener('click', function handleClick(event) {
      //     console.log('button: ', btn);
      //     let row = btn.parentElement.parentElement;
      //     console.log("cell row: ", row);
      //     console.log("1:  ", row.children[1].innerHTML);

      //     if (btn.innerText == "edit") {
      //       btn.innerText = "ok";
      //     } else {
      //       btn.innerText = "edit";
      //     }
      //   });
      // });
      */
    }).catch((e) => {
      console.log(e.status);
      console.log(`Failed: loading all storage items. ${e.statusText()}`);
    });
}

function row2input(row) {
  let vals = [];
  for (let i = 0; i <= 5; i++) {
    vals[i] = row.children[i].innerHTML;
  }
  console.log("vals: ", vals);

  let newRow = 
  `<tr>
  <td><input type="text" id="item" name="item"/></td>
  <td><input type="text" id="category" name="category"/></td>
  <td><input type="number" id="price" name="price"/></td>
  <td><input type="number" id="quantity" name="quantity"/></td>
  <td><input type="date" id="purchasedDate" name="purchasedDate"/></td>
  <td><input type="number" id="days-last" name="days-last"/></td>
</tr>`;
  
  const nRow = document.createElement("tr");
  for (let i = 0; i <= 5; i++) {
    const cell = document.createElement("td");
    let input = document.createElement("input");
    input.type = inputTypes[i];
    input.id = "id";
    input.name = "name";
    input.value = "555";
    cell.append(input);
    nRow.append(cell);
  }
  
  console.log(typeof (row) + " " + typeof (nRow));
  console.log("new cell row: ", row);
  
  console.log("new cell nRow: ", nRow);
}

const inputTypes = {
  0: ["text", "item", "item"],
  1: ["text", "category", "category"],
  2: ["number","price","price"],
  3: ["number","quantity","quantity"],
  4: ["date","purchasedDate","purchasedDate"],
  5: ["number","days-last","days-last"]
}
