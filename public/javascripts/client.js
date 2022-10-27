console.log("client side code running")
const button = document.getElementsByClassName("carrot-button");

button[0].addEventListener('click', function(e) {
  console.log('button was clicked');
  const nickname = document.getElementById("nickname").value;
  console.log(nickname);
  fetch('/buy', {method: 'GET'})
    .then(function(response) {
      if(response.ok) {
        //console.log(response.json())
        return response.json();
      }
      throw new Error('Request failed.');
    })
    .then(function(data){
      if(data.length===0){
        alert("Seems like you just finished grocery shopping!");
      }
      let today = new Date();
      var ul = document.getElementById("shopping-list-ul");
      if(ul.getElementsByTagName("li").length===0){
        const set = new Set();
        for(let i = 0;i<data.length;i++){
          var name = data[i]['buy'][0];
          var item = data[i]['buy'][1];
         // var date = data[i]['curr_date'];
         // var old_date = new Date(date);
          if(name === nickname){
            if(!set.has(item)){
            //if(old_date>today - (1000 * 60 * 60 * 24 * 7)){
              var li = document.createElement("li");
              li.setAttribute('id','shopping-list-li')
              li.appendChild(document.createTextNode(item));
              ul.appendChild(li);
           // }
            }
          set.add(item);
        }
        }
      }
    })
    .catch(function(error) {
      console.log(error);
    });
});

const done_button = document.getElementsByClassName('done-button');
done_button[0].addEventListener('click',function(e){
  console.log('done button clicked');
  fetch('/done',{method:'DELETE'})
  .then(function(response){
    alert("Good job finishing your grocery shopping!");
    console.log(response.json());
    if(response.ok){
      alert("Good job finishing your grocery shopping!");
      console.log(response.json());
    }
  })
});



