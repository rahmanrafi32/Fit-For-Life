const express = require("express");
const cors = require("cors");
const app = express();
const ObjectID = require("mongodb").ObjectID;
require("dotenv").config();
let port = process.env.PORT||3001;
const MongoClient = require("mongodb").MongoClient;
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@firstcluster.bte1v.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`;
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

app.use(express.json());
app.use(cors());

client.connect((err) => {

  const serviceCollection = client.db("Fit-For-Life").collection("service");
  app.post("/addServices", (req, res) => {
    const services = req.body;
    serviceCollection.insertOne(services).then((result) => res.redirect('/'));
  });

  app.get("/services", (req, res) => {
    serviceCollection.find({}).toArray((error, documents) => res.send(documents));
  });

  app.get("/services/:id", (req, res) => {
    serviceCollection.find({ _id: ObjectID(req.params.id) }).toArray((error, documents) => res.send(documents));
  });

  app.delete('/services/:id',(req,res)=>{
    serviceCollection.findOneAndDelete({_id: ObjectID(req.params.id)});
})

  const testimonialCollection = client.db("Fit-For-Life").collection("testimonial");
  app.post("/addTestimonials", (req, res) => {
    const reviews = req.body;
    testimonialCollection.insertOne(reviews).then((result) => console.log(result.insertedCount));
  });

  app.get("/testimonials", (req, res) => {
    testimonialCollection.find({}).toArray((error, documents) =>res.send(documents));
  });

  const newOrdersCollection = client.db("Fit-For-Life").collection("orders");
    app.post("/addOrders", (req, res) => {
      const newOrders = req.body;
      newOrdersCollection.insertOne(newOrders).then((result) => console.log(result.insertedCount));
    });

    app.get("/orders", (req, res) => {
      newOrdersCollection.find({}).toArray((error, documents) => res.send(documents));
    });

    app.put("/orders/:id", (req, res) => {
        const update = req.body.status;
        newOrdersCollection.updateOne({ _id: ObjectID(req.params.id) },{
          $set:{status: req.body.status}
        })
        console.log(update);
    });

    app.get('/order',(req,res)=>{
      const queryData = req.query
      newOrdersCollection.find(queryData).toArray((err,documents)=>{res.json(documents)})
    })

 const adminsCollection = client.db("Fit-For-Life").collection("admin");
  app.post("/addAdmins", (req, res) => {
    const admins = req.body;
    adminsCollection.insertOne(admins).then((result) => console.log(result.insertedCount));
  });

  app.post("/isAdmin", (req, res) => {
    const email = req.body.email;
    adminsCollection.find({admin: email}).toArray((err,documents)=>{res.send(documents.length > 0)})
  });

});

app.get("/", (req, res) => {
  res.send("Server working perfectly");
});

app.listen(port);
