const http = require('http');
const fs = require('fs');
const url = require('url');
const { parse } = require('path');

// reading the file
const productsString =  fs.readFileSync("./products.json", "utf-8")
const products = JSON.parse(productsString);
// Creation of server
const server=http.createServer((req,res)=>{

    // const path=req.url;
    // console.log(req.method);

    const path=url.parse(req.url,true);
    


    res.writeHead(200,{
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "OPTIONS, POST, GET, PUT, PATCH, DELETE",
        "Access-Control-Allow-Headers":"*",
        "Content-Type":"application/json"
    });

    if(path.pathname=="/" || path.pathname=="/products"){

        res.end(productsString);
        
    }
    else if(path.pathname=="/product"){

        if(req.method == "OPTIONS"){
            res.end();
        }

        else if(req.method=="GET")
        {
            const id=path.query.id;

            const singleData=products.find((ele)=>{
                return ele.id==id;
            })
            res.end(JSON.stringify(singleData));
        }
        else if(req.method=="POST"){

            let body="";
            req.on('data',(data)=>{
                body+=data;
            })

            req.on('end',()=>{
                let product=JSON.parse(body);
                products.push(product);
                fs.writeFile("./products.json",JSON.stringify(products),(err)=>{
                    res.end(JSON.stringify({message:"product added"}));
                });


            })

            

        }
        else if(req.method=="PUT"){

            // product id 
            const id=path.query.id;

            // product data
            let body="";
            req.on('data',(data)=>{
                body+=data;
            })

            req.on('end',()=>{
                let product=JSON.parse(body);

                // index will not work 

                products.forEach((ele)=>{
                    if(ele.id==id){

                        ele.title=product.title;
                        ele.type=product.type;
                        ele.description=product.description;
                        ele.height=product.height;
                        ele.width=product.width;
                        ele.price=product.price;
                        ele.rating=product.rating;

                    }
                })

                fs.writeFile("./products.json",JSON.stringify(products),(err)=>{

                    const updatedProduct = products.find((ele)=>{
                    
                        return ele.id == id;
                    })
                    res.end(JSON.stringify(updatedProduct));
                });

                    


            })


        }
        else if(req.method=="DELETE"){

            // product id 
            const id=path.query.id;

            products.forEach((ele,index)=>{
                if(ele.id==id){
                    products.splice(index,1);
                }
            })


            fs.writeFile("./products.json",JSON.stringify(products),(err)=>{
                res.end(JSON.stringify({message:"product deleted"}));
            });

            



        }
        
        
        

      
    }
    else {
        res.writeHead(404,{
            "Content-Type":"application/json"
        });
        res.end(JSON.stringify({message:"Not Found anything for this URL"}));
    }

    

});

server.listen("3000","127.0.0.1",()=>{
    console.log("server is running");
})