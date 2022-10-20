console.log("client side code running")
const button = document.getElementsByClassName("carrot-button");
button[0].addEventListener('click', function(e) {
  console.log('button was clicked');
  fetch('/buy', {method: 'GET'})
    .then(function(response) {
      if(response.ok) {
        return response.json();
      }
      throw new Error('Request failed.');
    })
    .then(function(data){
      var ul = document.getElementById("shopping-list-ul");
      const set = new Set();
      for(let i = 0;i<data.length;i++){
        var item = data[i]['name'];
        if(!set.has(item)){
          var li = document.createElement("li");
          li.appendChild(document.createTextNode(item));
          ul.appendChild(li);
        }
        set.add(item)
      }
    })
    .catch(function(error) {
      console.log(error);
    });
},{once:true});



