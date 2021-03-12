// To fetch all products

fetch("http://localhost:3000/products")
.then((response)=>response.json())
.then((products)=>{

    let productsString = "";
    
    products.forEach((product, index)=> {
    
    // let ratingStar = "";
    // for(let i = 1; i<=5;i++)
    // {
    //   if(i<=product.rating)
    //   {
    //     ratingStar+=`<img src="images/Active_star.png" width="20px"/>`
    //   }
    //   else{
    //     ratingStar+=`<img src="images/Grey_star.png" width="20px"/>`
    //   }
    // }
    
    
     productsString+=`
                    <tr>
                        <td>${index+1}</td>
                        <td>${product.title}</td>
                        <td>${product.description}</td>
                        <td> &#8377 ${product.price}</td>
                        <td>${product.type}</td>
                        <td>
                            <button class="btn btn-success" onclick="updateDataReady(this, ${product.id})">update</button>
                            <button class="btn btn-danger" onclick="deleteProduct(${product.id},this)">Delete</button>
                        </td>
                    </tr>
     `;
      
    });

    document.getElementById('product_container').innerHTML = productsString;
})

function updateDataReady(ele, id){

    let childrens = ele.parentNode.parentNode.children;
    console.log(childrens[1].innerText)
    
    document.getElementById("id").value = id;
    document.getElementById("title").value = childrens[1].innerText;
    document.getElementById("description").value = childrens[2].innerText;
    document.getElementById("price").value = childrens[3].innerText;
    document.getElementById("type").value = childrens[4].innerText;

}  


function deleteProduct(id, ele) {

    ele.parentNode.parentNode.style.display = "none"
    fetch("http://localhost:3000/product?id="+id,{
        method:"DELETE"
    })
    .then((response)=>response.json())
    .then((data)=>{
        document.getElementById("message").innerHTML = `<p class = "alert alert-success">${data.message}</p>`;

        // setTimeout(()=>{
        //     location = "admin.html";
        // })
})

}


function updateProduct() {

    let product = {};

    let id = document.getElementById("id").value;
    product.title = document.getElementById("title").value;
    product.description = document.getElementById("description").value;
    product.price = document.getElementById("price").value;
    product.type = document.getElementById("type").value;

    console.log(product);

    fetch("http://localhost:3000/product"+id,{
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