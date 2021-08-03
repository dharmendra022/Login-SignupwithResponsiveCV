const express = require("express");
const path =require("path");
const app =express();
const hbs =require("hbs");


require("./db/conn");
const Register= require("./models/register");
const { json}  =require("express");







const { Console } = require("console");
const { request } = require("http");

const port= process.env.PORT || 3000;


 const static_path =path.join(__dirname,"../public");
 const template_path =path.join(__dirname,"../templates/views");
 const partials_path =path.join(__dirname,"../templates/partials");


app.use(express.json());
app.use(express.urlencoded({extended:false}));

app.use(express.static(static_path));
app.set("view engine","hbs");
app.set("views",template_path);
hbs.registerPartials(partials_path);

app.get("/register",(req,res)=>{
    res.render("register");
})
app.get("/",(req,res)=>{
    res.render("index");
    // res.status(201).send("register");
})

app.post("/register",async(req,res)=>{
    try{
        console.log(req.body);
        // res.send(req.body.firstname);

        const password=req.body.password;
        const cpassword=req.body.cnfpassword;
        if(password==cnfpassword){

            const registerEmployee = new Register({
                firstname:req.body.firstname,
                lastname:req.body.lastname,
                email:req.body.email,
                phone:req.body.phone,
                age:req.body.age,
                password:password,
                cnfpassword:cpassword
            })

            const registered =await  registerEmployee.save();
            res.status(201).render("register");

        }else{

        }res.send("password are not matching");

    }catch(error){
        res.status(400).send(error);
    }
})


app.listen(port,()=>{
    console.log(`server is runing at port no ${port}`);
})