import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";

const AuthContext=createContext(null)

export const AuthProvider=({children})=>{
    const [isLogin,setisLogin]=useState(false)
    const [Data,setData]=useState([])
    const [UserName,setUserName]=useState("")
    const [Email,setEmail]=useState("")
    const [isAdmin,setisAdmin]=useState(false)
    const [SignUpEmail,setSignUpEmail]=useState("")
    const [SignUpName,setSignUpName]=useState("")
    const [SignUpPhone,setSignUpPhone]=useState("")
    const [SignUpPassword,setSignUpPassword]=useState("")
    const [SignUpCourse,setSignUpCourse]=useState("")
    const [SignUpTitle,setSignUpTitle]=useState("")
    const [ForgotEmail,setForgotEmail]=useState("")

    const SetUserData=(UserName,Email)=>{
        setUserName(UserName)
        setEmail(Email)   
    }

    const SetSignUpFormData=(Name,Title,Email,Phone,Course,Password)=>{
        setSignUpEmail(Email)
        setSignUpName(Name)
        setSignUpCourse(Course)
        setSignUpPassword(Password)
        setSignUpTitle(Title)
        setSignUpPhone(Phone)
    }

    const CheckAdmin=async(Email)=>{
        await axios.get(process.env.REACT_APP_URL+'/admin_accounts').then((res)=>{
            const Data=res.data
            const isEmailPresent = Data.includes(Email);
            if(isEmailPresent){
                setisAdmin(true)
            }else{
                setisAdmin(false)
            }
        }).catch((err)=>{
            console.log(err)
        })
    }

    useEffect(()=>{
        const Token=JSON.parse(localStorage.getItem("Token"))
        if(Token){
            setUserName(Token.UserName)
            CheckAdmin(Token.Email)
            setEmail(Token.Email)
            setisLogin(true)
        }else{
            setisLogin(false)
        }
    },[UserName])

    return(
        <AuthContext.Provider value={{isLogin,Data,UserName,Email,isAdmin,SignUpName,ForgotEmail,SignUpEmail,SignUpCourse,SignUpPassword,SignUpPhone,SignUpTitle,setisAdmin,setForgotEmail,SetSignUpFormData,SetUserData,setisLogin,setData}}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth=()=>{
    return useContext(AuthContext)
}