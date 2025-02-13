import Api from "./api";
export const login=async(email,password)=>{
    try {
        
        const resposne =await Api.post(':signInWithPassword',{
            email,password,returnSecureToken:true
        });
        return resposne.data;
    } catch (error) {
        console.error(error);
        throw error;
    }
    }
export const signUp=async(email,password)=>{
    try {
        
        const resposne =await Api.post(':signUp',{
            email,password,returnSecureToken:true
        });
        return resposne.data;
    } catch (error) {
        console.error(error);
        throw error;
    }
    }