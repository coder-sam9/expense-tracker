import React, { useState } from 'react'
import { updateProfile } from '../apis/apiCalls'
import CustomInput from '../components/CustomInput';
import CustomButton from '../components/CustomButton';
function WelcomeScreen() {
    const [userData ,setUserData]=useState({userName:'',imageUrl:''});
    const [show,setShow]=useState(false);
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
        <div style={{}}>
<p style={{fontWeight:'light',fontStyle:'italic',paddingLeft:10,paddingRight:10,marginRight:20,padding:8,borderRadius:50,backgroundColor:'#c0c0c0',color:'#303030'}}>

        Your profile is Incomplete.<span style={{color:'blue',cursor: 'pointer', textDecoration: 'underline'}} onClick={()=>{setShow(true);console.log('its working')}}>Complete now</span>

        </p>
        </div>
        </div>
        {show && <div style={{padding:20,display:'flex',flexDirection:'column',width:'50%',justifyContent:'flex-start',alignItems:'flex-start',boxShadow:'2px 2px 5px 5px grey',marginTop:20}}>
            <div style={{display:'flex',flexDirection:'row',width:'100%',justifyContent:'space-between',paddingInline:20}}>
                <h4>
                    Contact Details
                </h4>
                <button type='button' style={{backgroundColor:'white',padding:5,color:'red',border:'1px solid red',fontWeight:'700',borderRadius:5}}>
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
                        title="Full Name"/>
                <CustomInput  type={"imageUrl"}
                        onChange={handleChange}
                        id="imageUrl"
                        name="imageUrl"
                        required={true}
                        placeholder={"URL"}
                        title="Profile Photo URL"/>
            </div>
        <CustomButton  type={'button'}
                        title={'Update'}
                        disabled={!userData.userName || !userData.imageUrl
                        }
                        style={{marginTop:20,width:'10%',}}
                        onClick={update}/>
        </div>}
        </div>
  )
}

export default WelcomeScreen