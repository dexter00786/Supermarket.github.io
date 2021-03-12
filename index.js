fetch("http://localhost:3000/products")
.then((response)=>response.json())
.then((products)=>{

    let productsString = "";
    
    products.forEach((product)=> {
    
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
    
    
     productsString+= `
    <div class="card productcard" style="width: 18rem;">
    <div class="card-body">
      <h5 class="card-title">${product.title}</h5>
    </div>
    <ul class="list-group list-group-flush">
      <li class="list-group-item">Price: &#8377; ${product.price}</li>
      <li class="list-group-item">${ratingStar}</li>
    </ul>
    <div class="card-body">
      <a href="./product.html?id=${product.id}" class="card-link btn btn-success">view</a>
    </div>
  </div>
  `    
    });

    document.getElementById('product_container').innerHTML = productsString;
})

function getSingleProduct(id) {
  
  fetch("http://localhost:3000/product?id="+id)
  .then((response)=>response.json())
  .then((product)=>{
    console.log(product);
  })
}

