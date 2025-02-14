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
export const resetPassword=async(email)=>{
    try {
        console.log('in the reset email',email)
        const resposne =await Api.post(':sendOobCode',{
            email,requestType:'PASSWORD_RESET'
        });
        return resposne.data;
    } catch (error) {
        console.error(error);
        throw error;
    }
    }