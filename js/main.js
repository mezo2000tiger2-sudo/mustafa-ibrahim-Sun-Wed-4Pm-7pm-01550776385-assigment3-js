// Get inputs
var nameInput = document.getElementById('bookmarkName');
var URLInput = document.getElementById('bookmarkURL');
  
var form = document.querySelector('form');
form.addEventListener('submit' , function(e){
  e.preventDefault()
  console.log('submit');
  
})
var AllObjects =[]
if (localStorage.getItem('content')===null) {
    AllObjects=[];
} else{
    AllObjects = JSON.parse(localStorage.getItem('content'));
    displayItems()
};

function getTD() {
  if(validateName()==true && validateURL()==true){
    var product = {
      name: nameInput.value,
      URL: URLInput.value
    };
  
    AllObjects.push(product);
    localStorage.setItem('content', JSON.stringify(AllObjects));
    clearInputs()
    displayItems();
  } else{
    const modal = new bootstrap.Modal(document.getElementById('myModal'));
    modal.show();
  }
}
function clearInputs(){
  nameInput.value=null
  URLInput.value=null
}

function deleteItem(index) {
  AllObjects.splice(index, 1);
  localStorage.setItem('content', JSON.stringify(AllObjects));
  displayItems();
}

function displayItems() {
  var cartona = '';
  for (var i = 0; i < AllObjects.length; i++) {
    cartona += `
      <tr>
        <td>${i + 1}</td>
        <td>${AllObjects[i].name}</td>
        <td>
          <a href="${AllObjects[i].URL}" target="_blank" class="btn btn-success">Visit</a>
        </td>
        <td>
          <button onclick="deleteItem(${i})" class="btn btn-danger">Delete</button>
        </td>
      </tr>
    `;
  }
  document.querySelector('tbody').innerHTML = cartona;
}


function validateName(){
  var nameRegex = /^[A-Za-z0-9]{3,}$/
  var name = nameInput.value

  if(nameRegex.test(name)==true){
    nameInput.classList.add('is-valid')
    nameInput.classList.remove('is-invalid')
    return true;
  }else{
    nameInput.classList.remove('is-valid')
    nameInput.classList.add('is-invalid')
    return false;
    
  }
}
function validateURL() {
  var urlRegex = /^(https?:\/\/)([\w\-]+\.)+[a-zA-Z]{2,}(\/[\w\-._~:/?#[\]@!$&'()*+,;=]*)?$/;
  var userURL = URLInput.value;

  if (urlRegex.test(userURL)) {
    URLInput.classList.add('is-valid');
    URLInput.classList.remove('is-invalid');
    console.log('match');
    return true;
  } else {
    URLInput.classList.remove('is-valid');
    URLInput.classList.add('is-invalid');
    console.log('no match');
    return false;
  }
}

