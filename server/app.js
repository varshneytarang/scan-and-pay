import express from "express"
import { pool } from "./db.js"
import {v4 as uuidv4} from "uuid"
import cors from "cors"
const app=express()

app.use(cors())
app.use(express.json())


app.post("/api/products",async (req,res)=>{
    try{
        console.log("Received request to add product")
        const {Hash,productName,cost,quantity,location}=req.body;
        // Convert string hash to bigint for database storage
        const hashBigInt = BigInt(Hash);
        console.log("Hash:", Hash, "-> BigInt:", hashBigInt)

        await pool.query(
            "INSERT INTO products (hash_id,name,cost,quantity,location,rfid_status) VALUES ($1, $2, $3, $4, $5, $6)",
            [hashBigInt,productName,cost,quantity,location,'available']
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
    console.log("Searching for hash:", hash);

    try {
        // Convert string hash to bigint for database query
        const hashBigInt = BigInt(hash);
        
        const result=await pool.query(
            "SELECT name,cost,quantity,rfid_status FROM products where hash_id=$1",
            [hashBigInt]
        );

        if (result.rows.length === 0) {
            return res.status(404).json({ success: false, message: "Product not found" });
        }

        const {name,cost,quantity,rfid_status}=result.rows[0];
        return res.status(200).json({
            success:true,
            productName:name,
            cost:cost,
            quantity:1,
            hash:hash,
            rfid_status:rfid_status
        });
    } catch(err) {
        console.error("Error searching product:", err);
        return res.status(500).json({success:false,message:"Error searching product"});
    }

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

        res.json({success:"success"})
    }
    catch(err){
        console.error("Error approving purchase:", err);
        res.json({success:"failure"})
    }


})


const PORT=6790
app.listen(PORT, '0.0.0.0',()=>console.log("server is running"))