import { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext(null)

export const FormProvider = ({ children }) => {
    const [fileData, setfileData] = useState({
        'banner':{},
        'logo':{},
        'brochure':{}
    })
    return (
        <AuthContext.Provider value={{ fileData,setfileData }}>
            {children}
        </AuthContext.Provider>
    )
}

export const useForm = () => {
    return useContext(AuthContext)
}