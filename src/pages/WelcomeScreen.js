import React, { useEffect, useState } from 'react'
import { getProfile, updateProfile, verifyEmail } from '../apis/apiCalls'
import CustomInput from '../components/CustomInput';
import CustomButton from '../components/CustomButton';
import { useNavigate } from 'react-router-dom';
function WelcomeScreen() {
    const [userData ,setUserData]=useState({userName:'',imageUrl:''});
    const [show,setShow]=useState(false);
    const navigate=useNavigate()
    useEffect(()=>{
        fetchUser();
    },[])

    const fetchUser=async()=>{
        try {
            
            const user=JSON.parse(localStorage.getItem('expense-user'));
            if(user?.idToken){
                setShow(true);
                const response= await getProfile();
                const data=response.users[0];
                setUserData({
                    userName:data.displayName,
                    imageUrl:data.photoUrl
                })
            }
        } catch (error) {
            console.error(error);
            
        }
    }

    const update=async(e)=>{
        try {
            e.preventDefault();
            const resposne=await updateProfile(userData.userName,userData.imageUrl);
            console.log(resposne);
            alert("Update successful!");
            setShow(false)
        } catch (error) {
            
        }
    }
    const handleChange = (e) => {
        const { name, value } = e.target;
    setUserData(prev => ({
            ...prev,
            [name]: value,
        }));
    };
    const handleVerifyEmail=async()=>{
        try {
            const response=await verifyEmail();
        } catch (error) {
            console.error("the error in the handle verify email",error);
            
        }
    }
    const handleLogout=()=>{
        localStorage.removeItem('expense-user');
        navigate('/')
    }
  return (
    <div style={{
        height: "100vh",
        width: "100vw",
        display: "flex",
        justifyContent: "flex-start",
        alignItems: "center",
        flexDirection: 'column',
        backgroundColor:'white'
    }}>
        <div style={{display:'flex',justifyContent:'space-between',width:'100%',border:'1px solid black',alignItems:'center'}}>
            
        <div style={{padding:20}}>
<p style={{fontWeight:'500',fontStyle:'italic'}}>

        Welcome to the Expense Tracker!!!

        </p>
        </div>
        <div style={{ display:'flex',flexDirection:'row'}}>
            <CustomButton type='button' onClick={handleVerifyEmail} title='Verify Email' style={{marginRight:25,width:100}}/>
            <CustomButton type='button' onClick={handleLogout} title='Log out' style={{marginRight:25,width:100}}/>
<p style={{fontWeight:'light',minWidth:300,fontStyle:'italic',paddingLeft:10,paddingRight:10,marginRight:20,padding:8,borderRadius:50,backgroundColor:'#c0c0c0',color:'#303030'}}>

        Your profile is Incomplete.<span style={{color:'blue',cursor: 'pointer', textDecoration: 'underline'}} onClick={()=>setShow(true)}>Complete now</span>

        </p>
        </div>
        </div>
        {show && <div style={{padding:20,display:'flex',flexDirection:'column',width:'50%',justifyContent:'flex-start',alignItems:'flex-start',boxShadow:'2px 2px 5px 5px grey',marginTop:20}}>
            <div style={{display:'flex',flexDirection:'row',width:'100%',justifyContent:'space-between',paddingInline:20}}>
                <h4>
                    Contact Details
                </h4>
                <button type='button' style={{backgroundColor:'white',padding:5,color:'red',border:'1px solid red',fontWeight:'700',borderRadius:5}}
                onClick={()=>setShow(false)}
                >
                    Cancel
                </button>
            </div>
            <div style={{display:'flex',flexDirection:'column',width:'100%',justifyContent:'space-between',paddingInline:20}}>
                <CustomInput  type={"text"}
                        onChange={handleChange}
                        id="userName"
                        name="userName"
                        required={true}
                        placeholder={"Full Name"}
                        value={userData.userName}
                        title="Full Name"/>
                <CustomInput  type={"imageUrl"}
                        onChange={handleChange}
                        id="imageUrl"
                        name="imageUrl"
                        required={true}
                        placeholder={"URL"}
                        value={userData.imageUrl}
                        title="Profile Photo URL"/>
            </div>
        <CustomButton  type={'button'}
                        title={'Update'}
                        disabled={!userData.userName || !userData.imageUrl
                        }
                        style={{marginTop:20,width:70,}}
                        onClick={update}/>
        </div>}
        </div>
  )
}

export default WelcomeScreen