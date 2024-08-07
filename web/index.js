// @ts-check
import { join } from "path";
import { readFileSync } from "fs";
import express from "express";
import serveStatic from "serve-static";
import mysql from "mysql";

import shopify from "./shopify.js";
import productCreator from "./product-creator.js";
import PrivacyWebhookHandlers from "./privacy.js";
import mongoose from "mongoose";
import { hostname, type } from "os";

const PORT = parseInt(
  process.env.BACKEND_PORT || process.env.PORT || "3000",
  10
);

const STATIC_PATH =
  process.env.NODE_ENV === "production"
    ? `${process.cwd()}/frontend/dist`
    : `${process.cwd()}/frontend/`;

const app = express();


// Set up Shopify authentication and webhook handling
app.get(shopify.config.auth.path, shopify.auth.begin());
app.get(
  shopify.config.auth.callbackPath,
  shopify.auth.callback(),
  shopify.redirectToShopifyOrAppRoot()
);
app.post(
  shopify.config.webhooks.path,
  shopify.processWebhooks({ webhookHandlers: PrivacyWebhookHandlers })
);

// If you are adding routes outside of the /api path, remember to
// also add a proxy rule for them in web/frontend/vite.config.js

app.use("/api/*", shopify.validateAuthenticatedSession());
app.use("/userdata/*", authenticateUser);

//MYSQL database

const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "shopify",
});

connection.connect();

//MONGO DB connection

let client;

const url =
  // "mongodb+srv://mahadev:ka039814@cluster0.tiauwuh.mongodb.net/auth-demo?retryWrites=true&w=majority";
  "mongodb+srv://shopify_app:UaN8cEXi3GOlH8vC@shopifyapp.hv0u0pc.mongodb.net/?retryWrites=true&w=majority&appName=shopifyApp";
try {
  console.log("git  packages commit12");
  // console.log(url);
  console.log(process.env.DATABASE_URL);
  client = await mongoose.connect(url);
  // client = await mongoose.connect("mongodb://127.0.0.1:27017/shopify");
  console.log("--- Connected to Mongoose Succesfully ---");
} catch (error) {
  console.log("-- Mangoose can't connect!!! ---");
}

let userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  useremail: {
    type: String,
    required: true,
    unique: true,
  },
});

let User = mongoose.model("shopdashboard", userSchema);

async function authenticateUser(req, res, next) {
  let shop = req.query.shop;
  let storeName = await shopify.config.sessionStorage.findSessionsByShop(shop);
  if (shop === storeName[0].shop) {
    next();
  } else {
    res.send("User not Autherised!.");
  }
}

app.use(express.json());

//getting storefront data
app.post("/userdata/userinfo", async (req, res) => {
  let userdata = req.body;

  //multiple end-points get userinfo method get
  // res.status(200).send('Message sent Succefully!!!')

  //single user data method post
  console.log(userdata);
  // res.status(200).send(userdata)
  try {
    let createUser = await User.create({
      username: userdata.username,
      useremail: userdata.useremail,
    });

    // let createUserMySQL = await connection.query(
    //   `INSERT INTO users (name,email) VALUES ('${userdata[0]}',${userdata[1]}')`,
    //   function(error,results,fields){
    //     if(error) throw error
    //   }
    // );
    await connection.query(
      "INSERT INTO users (name,email) VALUES (?,?)",
      [userdata.username, userdata.useremail],
      (error, results) => {
        if (error) {
          console.error(error);
        } else {
          console.log(" in SQL -- New user inserted successfully!");
        }
      }
    );

    console.log("--- User Created Succesfully MONGO --- ");
    res.status(200).json("--- User Created Succesfully --- ");
    return true;
  } catch (error) {
    if (error.code === 11000) {
      return res.json("- User Already exits -");
    } else {
      console.log(error);
    }
  }
});

//read users
app.get("/api/getusers", async (req, res) => {
  try {
    let users = await User.find({});
    res.status(200).send(users);
  } catch (error) {
    console.log(error);
  }
});

//read shop info
app.get("/api/store/info", async (_req, res) => {
  const storeInfo = await shopify.api.rest.Shop.all({
    session: res.locals.shopify.session,
  });
  res.status(200).send(storeInfo);
});

app.get("/api/products/count", async (_req, res) => {
  const countData = await shopify.api.rest.Product.count({
    session: res.locals.shopify.session,
  });
  res.status(200).send(countData);
});

app.get("/api/products/create", async (_req, res) => {
  let status = 200;
  let error = null;

  try {
    await productCreator(res.locals.shopify.session);
  } catch (e) {
    console.log(`Failed to process products/create: ${e.message}`);
    status = 500;
    error = e.message;
  }
  res.status(status).send({ success: status === 200, error });
});

//Read all products
app.get("/api/products/all", async (req, res) => {
  let allProducts = await shopify.api.rest.Product.all({
    session: res.locals.shopify.session,
    // id: 7728140779567,  //desired product by id
  });

  res.status(200).send(allProducts);
});

//upadte a product
app.put("/api/products/update", async (req, res) => {
  let getProduct = req.body;
  let updateProduct = new shopify.api.rest.Product({
    session: res.locals.shopify.session,
  });
  updateProduct.id = getProduct.id;
  updateProduct.title = getProduct.title;

  await updateProduct.save({
    update: true,
  });
  res.status(200).send({ message: "Product updated Succefully!!!" });
});

//create a product
app.post("/api/products/create", async (req, res) => {
  let newProduct = new shopify.api.rest.Product({
    session: res.locals.shopify.session,
  });
  newProduct.title = "New Head Phones";
  newProduct.body_html = "Stylish New Head-Phone Ultra";
  newProduct.vendor = "node-react-store-online";
  newProduct.images = [
    {
      src: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?q=80&w=3540&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
  ];
  await newProduct.save({
    update: true,
  });
  res.status(200).send({ message: "Product created Succesfully!!!" });
});

//delete products specific

app.delete("/api/products/delete", async (req, res) => {
  await shopify.api.rest.Product.delete({
    session: res.locals.shopify.session,
    id: 7729466933295,
  });
  res.status(200).send({ message: "Product deleted succesfulyy!.----" });
});

app.use(shopify.cspHeaders());
app.use(serveStatic(STATIC_PATH, { index: false }));

app.use("/*", shopify.ensureInstalledOnShop(), async (_req, res, _next) => {
  return res
    .status(200)
    .set("Content-Type", "text/html")
    .send(readFileSync(join(STATIC_PATH, "index.html")));
});

app.listen(PORT);
