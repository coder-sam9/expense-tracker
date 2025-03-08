import React, { useContext, useEffect, useState } from 'react';
import { getProfile, updateProfile, verifyEmail } from '../../apis/profileCalls';
import CustomInput from '../../components/UI/CustomInput';
import CustomButton from '../../components/UI/CustomButton';
import { useNavigate } from 'react-router-dom';

import styles from './styles';
import { useDispatch, useSelector } from 'react-redux';
import { login, logout } from '../../store/slices/AuthSlice';
import { fetchExpenses, fetchUserPremiumStatusThunk,resetState } from '../../store/slices/expensesSlice';
import Loader from '../../components/UI/Loader';

function WelcomeScreen() {
    
const {isAuthenticated,user}=useSelector(state=>state.authentication);
const dispatch=useDispatch();
    const [userName, setUserName] = useState('');
    const [userImageUrl, setUserImageUrl] = useState('');
    const [show, setShow] = useState(false);
    const [loading,setLoading]=useState(false);
    const [dataLoading,setDataLoading]=useState(false);
    const navigate = useNavigate();
    const email=JSON.parse(localStorage.getItem('expense-user'))?.email || '';

    useEffect(() => {
        const initializeData = async () => {
          setDataLoading(true);
          try {
            await fetchUser(); // Wait for fetchUser to complete
            await dispatch(fetchUserPremiumStatusThunk(email)) // unwrap() to catch thunk errors
            await dispatch(fetchExpenses(email))
          } catch (error) {
            console.error("Initialization failed:", error);
          } finally {
            setDataLoading(false);
          }
        };
      
        initializeData();
      }, [dispatch]); // Add dispatch as a dependency
    if (dataLoading) {
        return <Loader/>
        
    }
    const fetchUser = async () => {
        try {
            setLoading(true);
            const user = JSON.parse(localStorage.getItem('expense-user'));
            if (user?.idToken) {
                
                setShow(true);
                const response = await getProfile();
                const data = response.users[0];
                setUserName(data.displayName);
                setUserImageUrl(data.photoUrl);
              
                dispatch(login(data));
            }
        } catch (error) {
            console.error(error);
        }
        finally{
            setLoading(false);
        }
    };

    const update = async (e) => {
        try {
            e.preventDefault();
            setLoading(true);
            const response = await updateProfile(userName, userImageUrl);
            console.log(response);
            alert("Update successful!");
            setShow(false);
        } catch (error) {
            console.error(error);
        }finally{   
            setLoading(false);
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        if (name === 'userName') {
            setUserName(value);
        } else if (name === 'imageUrl') {
            setUserImageUrl(value);
        }
    };

    const handleVerifyEmail = async () => {
        try {
            const response = await verifyEmail();
            console.log(response);
        } catch (error) {
            console.error("Error in handleVerifyEmail:", error);
        }
    };

    const handleLogout = () => {
        dispatch(resetState());
        dispatch(logout());
        localStorage.removeItem('expense-user');
        navigate('/', { replace: true });
    };

    return (
        <div style={styles.container}>
            <div style={styles.header}>
                <div style={styles.welcomeText}>
                        <img 
                            src={userImageUrl?userImageUrl:'https://www.gravatar.com/avatar/00000000000000000000000000000000?d=mp&f=y'} 
                            alt="Profile" 
                            style={styles.profilePicture}
                            onError={(e) => {
                                e.target.src = 'https://www.gravatar.com/avatar/00000000000000000000000000000000?d=mp&f=y';
                            }}
                        />
                    
                    <p style={styles.welcomeMessage}>Welcome to the Expense Tracker!!!</p>
                </div>
                <div style={styles.buttonContainer}>
                   {isAuthenticated?
                   <CustomButton
                   type='button'
                   onClick={()=>navigate('/expense')}
                   title='Expenses'
                   style={{ marginRight: 25, width: 100 }}
               />
                   : <CustomButton
                        type='button'
                        onClick={handleVerifyEmail}
                        title='Verify Email'
                        style={{ marginRight: 25, width: 100 }}
                    />}
                    <CustomButton
                        type='button'
                        onClick={handleLogout}
                        title='Log out'
                        style={{ marginRight: 25, width: 100 }}
                    />
                    <p style={styles.profileIncomplete}>
                        Your profile is Incomplete.
                        <span style={styles.completeNow} onClick={() => setShow(true)}>Complete now</span>
                    </p>
                </div>
            </div>
            {show && (
                <div style={styles.profileForm}>
                    <div style={styles.formHeader}>
                        <h4>Contact Details</h4>
                        <button
                            type='button'
                            style={styles.cancelButton}
                            onClick={() => setShow(false)}
                        >
                            Cancel
                        </button>
                    </div>

                    {!loading?(<div style={styles.inputContainer}>
                        <CustomInput
                            type="text"
                            onChange={handleChange}
                            id="userName"
                            name="userName"
                            required={true}
                            placeholder="Full Name"
                            value={userName}
                            title="Full Name"
                        />
                        <CustomInput
                            type="text"
                            onChange={handleChange}
                            id="imageUrl"
                            name="imageUrl"
                            required={true}
                            placeholder="URL"
                            value={userImageUrl}
                            title="Profile Photo URL"
                        />
                    </div>)
                    :<div style={styles.loadingContainer}>
                        <p style={{color:"black",fontSize:'20px'}}>Loading...</p>   
                    </div>
                    }
                    <CustomButton
                        type="button"
                        title="Update"
                        disabled={!userName || !userImageUrl}
                        style={styles.updateButton}
                        onClick={update}
                    />
                </div>
            )}
        </div>
    );
}

export default WelcomeScreen;