let url = location.href;
let id = url.split("?")[1].split("=")[1]


  
    fetch("http://localhost:3000/product?id="+id)
    .then((response)=>response.json())
    .then((product)=>{
      console.log(product);

    let ratingStar = "";
    for(let i = 1; i<=5;i++)
    {
      if(i<=product.rating)
      {
        ratingStar+=`<img src="images/Active_star.png" width="20px"/>`
      }
      else{
        ratingStar+=`<img src="images/Grey_star.png" width="20px"/>`
      }
    }

    document.getElementById("product-name").innerText = product.title;

      let productString =`
      <div class="card-body">
      <h5 class="card-title">${product.title}</h5>
      <p class = "card-text">${product.description}</p>
    </div>
    <ul class="list-group list-group-flush">
      <li class="list-group-item">Price: &#8377; ${product.price}</li>
      <li class="list-group-item">${ratingStar}</li>
    </ul>`
    console.log(productString);

    document.getElementById("product").innerHTML = productString;


    })


    
function updateProduct() {

  let product = {};

  product.title = document.getElementById("title").value;
  product.description = document.getElementById("description").value;
  product.price = document.getElementById("price").value;
  product.type = document.getElementById("type").value;

  console.log(product);

  fetch("http://localhost:3000/product",{
      method:"PUT",
      headers:{
          "Content-Type":"application/json"
      },
      body:JSON.stringify(product),
      mode:"cors",
  }).then((response)=>response.json())
  .then((data)=>{
      console.log(data);
  }).catch((err)=>{
      console.log(err);
  })
  
}