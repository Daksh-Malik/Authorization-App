import express, { response } from 'express';
import cors from 'cors';
import mysql from 'mysql2';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import cookieParser from 'cookie-parser';

var salt = 10;

const app = express();
app.use(cors({
    origin: ["http://localhost:3000"],
    methods: ["POST","GET"],
    credentials: true
}));
app.use(express.json());
app.use(cookieParser());

const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "Daksh123@",
    database: "crud_application"
})

const verifyUser = (req,res,next) => {
    const token = req.cookies.token
    if(!token){
        return res.json({Error: "You are not authorized"})
    } else {
        jwt.verify(token, "jwt-secret-key", (err,decoded) => {
            if(err){
                return res.json({Error: "Token is not okay"})
            }
            else{
                req.name = decoded.name
                next()
            }
        })
    }
}

app.get("/", verifyUser, (req,res) => {
    return res.json({Status: "Success", name: req.name})
})

app.get("/logout" , (req,res) => {
    res.clearCookie('token')
    return res.json({Status:"Success"})
})

app.post("/register", (req, res) => {
    const sql = "INSERT INTO signupdata (name,email,password) VALUES (?)";
    bcrypt.hash(req.body.password.toString(), salt, (err, hash) => {
        if (err) {
            console.log(err);
            return res.json({ Error: "Error in hashing the password" });
        }
        const values = [
            req.body.name,
            req.body.email,
            hash
        ]
        db.query(sql, [values], (err, result) => {
            if (err) {
                console.log(err);
                return res.json({ Error: "Error in inserting data" });
            }
            return res.json({ Status: "Success" });
        })
    })
})

app.post("/login", (req,res) => {
    const sql = "SELECT * FROM signupdata WHERE email=?"
    db.query(sql, [req.body.email], (err,data) => {
        if (err) {
            console.log(err);
            return res.json({ Error: "Error in login in server" });
        } 
        if(data.length > 0){
            bcrypt.compare(req.body.password.toString(), data[0].password, (err, response) => {
                if (err) {
                    console.log(err);
                    return res.json({Error: "Password compare error"});
                } 
                if(response){
                    const name = data[0].name;
                    const token = jwt.sign({name}, "jwt-secret-key" , {expiresIn:'1d'}); //last field is optional and gives expiry of 1 day
                    res.cookie('token',token)
                    return res.json({Status: "Success"})
                } else {
                    return res.json({Error: "Password not matched"})
                }
            })
        }
        else{
            res.send("Incorrect Email")
        }
    })
})

app.listen(8080, () => {
    console.log("Server running at port 8080");
})