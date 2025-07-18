if(process.env.NODE_ENV !="production"){
    require('dotenv').config();
}

const express = require("express");
const app = express();
const path = require("path");
const mongoose = require("mongoose");
const methodOverride = require("method-override");
const ejsMate = require("ejs-mate");
app.use(methodOverride("_method"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.join(__dirname, "/public")))
const ExpressError = require("./utils/ExpressError.js");
const listingRouter = require("./route/lisiting.js");
const reviewRouter = require("./route/review.js");
const userRouter=require("./route/user.js");

const session=require("express-session");
const MongoStore = require('connect-mongo');
const flash=require("connect-flash");
const passport=require("passport");
const LocalStrategy=require("passport-local");
const User=require("./models/user.js");
// const MONGO_URL = "mongodb://127.0.0.1:27017/wanderlust";
const dbUrl = process.env.ATLASDB_URL;

main().then((res) => {
    console.log("connected to db");
})
    .catch(err => console.log(err));
async function main() {
    await mongoose.connect(dbUrl);
}
app.set("view engine", "ejs");
// app.set('trust proxy', 1);
app.set("views", path.join(__dirname, "/views"));
app.engine("ejs", ejsMate);

const store = MongoStore.create({
    mongoUrl: dbUrl,
    crypto: {
        secret : process.env.SECRET,
    },
    touchAfter: 24*3600,
});

store.on("error",()=>{
    console.log("ERROR in MONGO SESSION STORE",err);
});

sessionOptions={
    store,
    secret:process.env.SECRET,
    resave:false,
    saveUninitialized:true,
    cookie:{
       expires:Date.now() + 7*24*60*60*1000,
       maxAge: 7*24*60*60*1000,
       httpOnly:true,
    }
};

//Root Route
 // app.get("/", (req, res) => {
 //    res.send('root is working fine');
 //    next();
 // });




app.use(session(sessionOptions));
app.use(flash());

app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use((req,res,next)=>{
    res.locals.success=req.flash("success");
    res.locals.error=req.flash("error");
    res.locals.currUser=req.user;
    next();
});

app.use("/listing", listingRouter);
app.use("/listing/:id/reviews", reviewRouter);
app.use("/",userRouter);


app.all("*", (req, res, next) => {
    next(new ExpressError(404, "Page Not Found!!"));
});
//Error handler middleware
app.use((err, req, res, next) => {
    let { status = 500, message = "Something Went Wrong!!" } = err;
    res.status(status).render("error.ejs", { message });
});


app.listen(8080, () => {
    console.log("Listening to port 8080");
});
