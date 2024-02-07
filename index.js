const express = require('express');
const app = express()
const port = process.env.PORT || 5000;
const cors = require('cors');
require("dotenv").config()

app.use(cors())
app.use(express.json())

app.get("/", (req, res) => {
    res.send("ecommerce server running")
})

app.listen(port, () => {
    console.log(`ecommerce sever running on ${port}`)
})


const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.tbsccmb.mongodb.net/?retryWrites=true&w=majority`;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    }
});

async function run() {
    try {
        const productCollection = client.db(`${process.env.DB_USER}`).collection("productCollection")
        app.post("/addProduct", async (req, res) => {
            const result = await productCollection.insertOne(req.body)
            res.send(result)
        })
    } finally {
        // Ensures that the client will close when you finish/error

    }
}
run().catch(console.dir);
