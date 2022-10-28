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
              <td data-label="Actions">
                <button class="actionBtn editBtn">edit</button>
                <button class="actionBtn deleteBtn">delete</button>
                </td>
              </tr>`
        addRow(tableID, content);
      }
    }).then(() => {
      // Add button listeners
      let editBtns = Array.from(document.getElementsByClassName('editBtn'));

      editBtns.forEach(btn => {
        btn.addEventListener('click', function handleClick(event) {
          // console.log('Edit button clicked', event);
          console.log('button: ', btn);
          let row = btn.parentElement.parentElement;
          console.log("cell row: ", row);
          console.log("1:  ", row.children[1].innerHTML);

          if (btn.innerText == "edit") {
            row2input(row);


            btn.innerText = "ok";
          } else {
            

            btn.innerText = "edit";
          }
        });
      });
    }).catch((e) => {
      console.log(`Failed: loading all storage items. ${e}`);
    });
}

function row2input(row) {
  let vals = [];
  for (let i = 0; i <= 5; i++) {
    vals[i] = row.children[i].innerHTML;
  }
  console.log("vals: ", vals);
  // let item = row.children[0].innerHTML;
  // let category = row.children[1].innerHTML;
  // let price = row.children[2].innerHTML;
  // let quantity = row.children[3].innerHTML;
  // let purchasedDate = row.children[4].innerHTML;
  // let daysLast = row.children[5].innerHTML;

  let newRow = 
  `<tr>
  <td><input type="text" id="item" name="item"/></td>
  <td><input type="text" id="category" name="category"/></td>
  <td><input type="number" id="price" name="price"/></td>
  <td><input type="number" id="quantity" name="quantity"/></td>
  <td><input type="date" id="purchased-date" name="purchased-date"/></td>
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
  4: ["date","purchased-date","purchased-date"],
  5: ["number","days-last","days-last"]
}