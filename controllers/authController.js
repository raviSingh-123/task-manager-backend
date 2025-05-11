import { comparePassword, hashPassword } from "../helpers/authHelper.js";
import userModel from "../models/userModel.js";
import JWT from 'jsonwebtoken';
export const registerController = async(req,res)=>{
    try {
        const{name,email,password,phone} = req.body;
        //validation
        if(!name){
           return res.send({message:'Name is required'});
        }
        if(!email){
            return res.send({message:'Email is required'});
        }
        if(!password){
            return res.send({message:'Password is required'});
        }
        if(!phone){
            return res.send({message:'Phone no. is required'});
        }


        //existing user check
        const existingUser = await userModel.findOne({email});
        if(existingUser){
            return res.status(400).send({
                success: false,
                message: 'Email already exists. Please login instead.'
            });
        }

        //registerUser

        const hashedPassword = await hashPassword(password);

        //save password
        const user = await new userModel({name,email,phone,password:hashedPassword}).save()
        res.status(201).send({
            success:true,
            message:'User created successfully',
            user
        })

    } catch (error) {
        console.log(error);
        res.status(500).send({
            success:false,
            message:'Error in register',
            error
        })
    }
}


export const loginController = async(req,res)=>{
 try {
    const{email,password} = req.body;
    //validation
    if(!email || !password){
        return res.status(400).send({
            success: false,
            message: 'Email and password are required'
        });
    }

    //check user
    const user = await userModel.findOne({email});
    if(!user){
        return res.status(404).send({
            success: false,
            message: 'Email is not registered'
        });
    }

    const match = await comparePassword(password,user.password);
    if(!match){
         return res.status(401).send({
            success: false,
            message: 'Invalid Password'
        });
    }

    //token
    const token = await JWT.sign({_id:user._id},process.env.JWT_SECRET,{expiresIn:'5d'});
    
    res.status(200).send({
        success: true,
        message: 'Login successful',
        token
    });
    
 } catch (error) {
    console.log(error);
    res.status(500).send({
        success: false,
        message: 'Error in Login',
        error
    });
 }
}