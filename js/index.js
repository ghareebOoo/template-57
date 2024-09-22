let productName = document.getElementById('ProductName');
let productPrice = document.getElementById('ProductPrice');
let productCategory = document.getElementById('ProductCategory');
let productDesc = document.getElementById('ProductDesc');
let productSearch = document.getElementById('productSearch');
let addButton = document.getElementById('addButton');
let updateButton = document.getElementById('updateButton');
let existMsg = document.getElementById('existMsg');
let productList = []
let updatedIndex;

productList = JSON.parse(localStorage.getItem("productsList")) || [];
displayAllProduct();


function createProduct(){
  if(validate(productName , nameRegex) && validate(productPrice , priceRegex)){
    if(exist() === true){
      existMsg.classList.remove("d-none");
    }else{
      let myProduct = {
        name : productName.value,
        price : productPrice.value,
        category : productCategory.value,
        description: productDesc.value,
      }
      productList.push(myProduct);
      localStorage.setItem("productsList" , JSON.stringify(productList));
      displayProduct(productList.length - 1);
      clearForm();
      existMsg.classList.add("d-none");
    }
  }
}


function displayProduct(index){
  let data = document.getElementById("data");
  let productHtml = `
  <tr>
  <td>${index + 1}</td>
  <td>${productList[index].name}</td>
  <td>$${productList[index].price}</td>
  <td>${productList[index].category}</td>
  <td>${productList[index].description}</td>
  <td>
   <button class="btn btn-outline-warning" onclick='update(${index})'>update</button>
  </td>
  <td>
   <button class="btn btn-outline-danger" onclick='deleteProduct(${index})'>Delete</button>
  </td>
 </tr>
  `;
  data.innerHTML += productHtml;
}


function displayAllProduct(){
  data.innerHTML = '';
  for(let i = 0; i < productList.length; i++){
    displayProduct(i);
  }
}


function deleteProduct(index){
  productList.splice(index , 1);
  localStorage.setItem("productsList" , JSON.stringify(productList));
  displayAllProduct();
}


function search(){
  data.innerHTML = ''; 
  let term = productSearch.value;
  for(let i = 0; i < productList.length; i++){
    if(productList[i].name.toLowerCase().includes(term.toLowerCase())){
      displayProduct(i);
    }
  }
}

function clearForm(){
  productName.value = "";
  productPrice.value = "";
  productCategory.value = "";
  productDesc.value = "";
  productName.classList.remove("is-valid");
  productPrice.classList.remove("is-valid");
}





function update(index){
  productName.value = productList[index].name;
  productPrice.value = productList[index].price;
  productCategory.value = productList[index].category;
  productDesc.value = productList[index].description;
  addButton.classList.add("d-none");
  updateButton.classList.remove("d-none");
  updatedIndex = index;
}


function updateProduct(){
  productList[updatedIndex].name = productName.value;
  productList[updatedIndex].price = productPrice.value;
  productList[updatedIndex].category = productCategory.value;
  productList[updatedIndex].description = productDesc.value;
  localStorage.setItem("productsList" , JSON.stringify(productList));
  displayAllProduct();
  clearForm();
  addButton.classList.remove("d-none");
  updateButton.classList.add("d-none");
}


function exist(){
  for(let i = 0; i < productList.length; i++){
    if(productName.value.toLowerCase() === productList[i].name.toLowerCase()){
      return true;
    }
  }
}


let nameRegex = /^[A-Z][a-z]{5,}$/;
let priceRegex = /^([1-9]|[1-9][0-9]|[1][0-9][0-9]|200)$/;


function validate(ele , regex){
  if(regex.test(ele.value)){
    ele.classList.add("is-valid");
    ele.classList.remove("is-invalid");
    ele.nextElementSibling.nextElementSibling.classList.add("d-none");
    return true;
  }else{
    ele.classList.add("is-invalid");
    ele.classList.remove("is-valid");
    ele.nextElementSibling.nextElementSibling.classList.remove("d-none");
    return false;
  }
}

productName.oninput = function(){
  validate(productName , nameRegex);
};
productPrice.oninput = function(){
  validate(productPrice , priceRegex);
};