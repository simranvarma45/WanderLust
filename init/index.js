const mongoose= require("mongoose");
const initData=require("./data.js");
const Listing=require("../models/listing.js");
const MONGO_URL="mongodb://127.0.0.1:27017/wanderlust";
main().then((res) => {
    console.log("connected to db");
})
    .catch(err => console.log(err));
async function main() {
    await mongoose.connect(MONGO_URL);
}
const initDB=async ()=>{
    await Listing.deleteMany({});
    initData.data=initData.data.map((obj)=>({...obj,owner:"6635e05b44e02589c3a4b33a"}));
    await Listing.insertMany(initData.data);
    console.log("Data was inserted");
}
initDB();