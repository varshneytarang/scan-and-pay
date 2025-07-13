import express from "express"
import { pool } from "./db.js"
import {v4 as uuidv4} from "uuid"
import cors from "cors"
const app=express()

app.use(cors())
app.use(express.json())

function getFullUPC11To12(upc11) {
    const upc = String(upc11).padStart(11, '0');

    if (!/^\d{11}$/.test(upc)) {
        throw new Error("Input must be 11 digits only");
    }

    let sum = 0;
    for (let i = 0; i < 11; i++) {
        const digit = parseInt(upc[i], 10);
        sum += (i % 2 === 0) ? digit * 3 : digit; // 0-based index: even index = odd position
    }

    const checkDigit = (10 - (sum % 10)) % 10;

    return upc + checkDigit;
}


app.post("/api/products",async (req,res)=>{
    try{
        console.log("Received request to add product")
        const {Hash,productName,cost,quantity,location}=req.body;
        const realHash=getFullUPC11To12(Hash)
        console.log(Hash)

        await pool.query(
            "INSERT INTO products (hash_id,name,cost,quantity,location) VALUES ($1, $2, $3, $4, $5)",
            [realHash,productName,cost,quantity,location]
        );

        console.log("Product added successfully")
        return res.status(200).json({success:true,message:"Product added successfully"})
    }catch(err){
        console.error("Error adding product:", err);
        return res.status(500).json({success:false,message:"Error adding product"})
    }
})

app.get("/api/search",async(req,res)=>{
    const {hash}=req.query;
    console.log(hash);

    const result=await pool.query(
        "SELECT name,cost,quantity FROM products where hash_id=$1",
        [hash]
    );

    if (result.rows.length === 0) {
        return res.status(404).json({ success: false, message: "Product not found" });
    }

    

    const {name,cost,quantity}=result.rows[0];
    return res.status(200).json({success:true,
                                productName:name,
                                cost:cost,
                                quantity:1,
                                hash:hash});

})

app.post("/api/approve",async(req,res)=>{
    try{
        const purchaseId=uuidv4();
        const {products,user_id,totalCost,location}=req.body;
        const productNames=products.map(p=>p.name);
        const timeStamp=new Date();
        const result=await pool.query(
            `UPDATE products SET rfid_status = 'used' WHERE name = ANY($1::text[])`,
            [productNames]
        )

        await pool.query(
            "INSERT INTO purchases(purchase_id,user_id,total_cost,time,location)VALUES ($1, $2, $3, $4, $5)",
                [purchaseId,user_id,totalCost,timeStamp,location]
        )

        res.json({sucess:"sucess"})
    }
    catch(err){
        console.log(err);
        res.json({success:"failure"})
    }


})


const PORT=6790
app.listen(PORT, '0.0.0.0',()=>console.log("server is running"))