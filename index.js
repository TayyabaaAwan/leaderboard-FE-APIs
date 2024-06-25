const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser'); 
const cors = require("cors");

const app = express();
const port = process.env.PORT || 8001;

const MongoClient = require('mongodb').MongoClient;
const uri = "mongodb://127.0.0.1:27017/react-form-connection"; 

mongoose.connect('mongodb://127.0.0.1:27017/react-form-connection')
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => console.error('Error connecting to MongoDB:', err));

const themeSchema = new mongoose.Schema({
    inputId: {
        type: String,
        required: true,
    },
    cellBackground: {
        type: String,
        required: true,
    },
    cellBorder: {
        type: String,
        required: true,
    },
    topRowBackground: {
        type: String,
        required: true,
    },
    topRowTextColor: {
        type: String,
        required: true,
    },
    topRowFontSize: {
        type: String,
        required: true,
    },
    topRowFontFamily: {
        type: String,
        required: true,
    },
    cellsFontSize: {
        type: String,
        required: true,
    },
    paginationRowColor: {
        type: String,
        required: true,
    },
    paginationRowTextColor: {
        type: String,
        required: true,
    },
    paginationButtonsBg: {
        type: String,
        required: true,
    },
    currentPageClr: {
        type: String,
        required: true,
    },
    dropDownBg: {
        type: String,
        required: true,
    },
    dropDownTextClr: {
        type: String,
        required: true,
    },
    dropDownBorder: {
        type: String,
        required: true,
    },
    dropDownBorderRadius: {
        type: String,
        required: true,
    },
    customFooterBg: {
        type: String,
        required: true,
    }
});

const collection = mongoose.model('collection', themeSchema);

app.use(bodyParser.json());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cors());

app.post("/", async (req, res) => {
  console.log("Connected to backend");
  try {
    const {
      inputId,
      cellBackground,
    cellBorder,
    topRowBackground,
    topRowTextColor,
    topRowFontSize,
    topRowFontFamily,
    cellsFontSize,
    paginationRowColor,
    paginationRowTextColor,
    paginationButtonsBg,
    currentPageClr,
    dropDownBg,
    dropDownTextClr, 
    dropDownBorder,
    dropDownBorderRadius,
    customFooterBg
    } = req.body;

    const data = {
      inputId: inputId,
      cellBackground:cellBackground,
    cellBorder:cellBorder,
    topRowBackground:topRowBackground,
    topRowTextColor:topRowTextColor,
    topRowFontSize:topRowFontSize,
    topRowFontFamily:topRowFontFamily,
    cellsFontSize:cellsFontSize,
    paginationRowColor:paginationRowColor,
    paginationRowTextColor:paginationRowTextColor,
    paginationButtonsBg:paginationButtonsBg,
    currentPageClr:currentPageClr,
    dropDownBg:dropDownBg,
    dropDownTextClr:dropDownTextClr, 
    dropDownBorder:dropDownBorder,
    dropDownBorderRadius:dropDownBorderRadius,
    customFooterBg:customFooterBg
    };
    console.log(data);
    await collection.insertMany([data]);
    console.log("Response saved in database");
    res.json(data);
    console.log(data);
  } catch (error) {
    console.log("error posting data");
  }
});

//retrieving all data entries from db
app.get("/data", async (req, res) => {
    try {
      const client = await MongoClient.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });
      const db = client.db("react-form-connection"); 
      const collection = db.collection("collections"); 
  
      const data = await collection.find({}).toArray();
      console.log("All Data retrieved from database");
      res.json(data);
      console.log(data);
  
      client.close();
    } catch (error) {
      console.error("Error retrieving all data:", error);
      res.status(500).send("Error retrieving all data");
    }
  });

  //retrieving single data entry in db
  app.get("/data/matchEntry", async (req, res) => {
    try {
      const client = await MongoClient.connect(uri); 
      const db = client.db("react-form-connection");
      const collection = db.collection("collections"); 
  
      const query = { "inputId": "1" }; 
  
      const data = await collection.find(query).toArray(); 
  
      if (!data.length) {
        return res.status(404).send("No data found with navBarBg='purple'");
      }
  
      console.log("Matched Data Entry/Entries retrieved from database");
      res.json(data);
  
      client.close();
    } catch (error) {
      console.error("Error retrieving matched data entry :", error);
      res.status(500).send("Error retrieving matched data entry");
    }
  });
  

app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});
