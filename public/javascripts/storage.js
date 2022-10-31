const DAY_IN_SECOND = 1000 * 3600 * 24;
/////////////////////////
// Initialization
/////////////////////////
document.addEventListener("DOMContentLoaded", function () {
  loadTable();
});

/////////////////////////
// Functions with Vanilla JS
/////////////////////////
function clearBody(id = null) {
  let bodyId = id || "storage-table-body";
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

function handleDelete() {
  const id = this.parentElement.parentElement.id;
  console.log(`Del called with id=${id}.`);

  const params = {
    method: "DELETE"
  };

  if (confirm("Confirm to delete this entry?")) {
    fetch(`/storage/${id}`, params)
      .then((resp) => resp.text())
      .then((resp) => {
        console.log("Delete Response: ", resp);
        clearBody();
      })
      .then(() => {
        loadTable(); // Refresh to show updates
      })
      .catch((err) => {
        console.error(err || `Delete failed with id=${id}`);
      });
  }
}

function decodeDate(date) {
  return `${date.getMonth() + 1}/${date.getDate() + 1}/${date.getFullYear()}`;
}

function loadTable() {
  let bodyId = "storage-table-body";

  fetch("/storage/user")
    .then(handleResponse)
    .then((data) => {
      for (const d in data) {
        let rowId = data[d]._id;
        let purchasedDate = new Date(data[d].purchased);
        let d_date = decodeDate(purchasedDate);
        let daysLast = data[d].daysLast;
        let today = new Date();
        let daysRemained = Math.floor(
          (purchasedDate.getTime() +
            daysLast * DAY_IN_SECOND -
            today.getTime()) /
            DAY_IN_SECOND
        );
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
    })
    .then(() => {
      // Add button listeners for deletes
      let deleteBtns = Array.from(document.getElementsByClassName("deleteBtn"));
      deleteBtns.forEach((btn) => {
        btn.addEventListener("click", handleDelete);
      });

      const table = document.getElementById("storage-table");
      const headers = table.querySelectorAll("th");
      [].forEach.call(headers, function (header, index) {
        header.addEventListener("click", function () {
          // This function will sort the column
          sortColumn(index);
        });
      });
    })
    .catch((e) => {
      console.log(e.status);
      console.log(`Failed: loading all storage items. ${e.statusText()}`);
    });
}

const sortColumn = (index, id) => {
  const tableId = "storage-table";
  const headers = document.getElementById(tableId).querySelectorAll("th");

  const bodyId = id || "storage-table-body";
  const bodyRef = document.getElementById(bodyId);
  const rows = bodyRef.querySelectorAll("tr");
  const newRows = Array.from(rows);
  console.log(`sortColumn called with index=${index}, bodyId=${bodyId}`);

  newRows.sort((a, b) => {
    const cellA = a.querySelectorAll("td")[index].innerHTML;
    const cellB = b.querySelectorAll("td")[index].innerHTML;

    let m, n;
    switch (index) {
      case 2:
      case 3:
      case 5:
        m = parseInt(cellA);
        n = parseInt(cellB);
        break;
      case 4:
        m = new Date(cellA);
        n = new Date(cellB);
        break;
      default:
        m = cellA;
        n = cellB;
    }

    // console.log(typeof m);
    // console.log(m + " " + n + ": " + (m > n));

    if (m > n) return 1;
    else if (m < n) return -1;
    else return 0;
  });

  // Remove old rows
  [].forEach.call(rows, (row) => {
    bodyRef.removeChild(row);
  });

  // Append new rows
  newRows.forEach(function (newRow) {
    bodyRef.appendChild(newRow);
  });
};
