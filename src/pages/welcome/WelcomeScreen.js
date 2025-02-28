import React, { useContext, useEffect, useState } from 'react';
import { getProfile, updateProfile, verifyEmail } from '../../apis/profileCalls';
import CustomInput from '../../components/UI/CustomInput';
import CustomButton from '../../components/UI/CustomButton';
import { useNavigate } from 'react-router-dom';
import ExpensesContext from '../../store/expenses-context';

import styles from './styles';
import { useDispatch, useSelector } from 'react-redux';
import { login, logout } from '../../store/slices/AuthSlice';

function WelcomeScreen() {
    const { addUserInfo, changeLoginStatus } = useContext(ExpensesContext);
    
const {isAuthenticated,user}=useSelector(state=>state.authentication);
const dispath=useDispatch();
    const [userData, setUserData] = useState({ userName: '', imageUrl: '' });
    const [show, setShow] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        fetchUser();
    }, []);

    const fetchUser = async () => {
        try {
            const user = JSON.parse(localStorage.getItem('expense-user'));
            if (user?.idToken) {
                setShow(true);
                const response = await getProfile();
                const data = response.users[0];
                setUserData({
                    userName: data.displayName,
                    imageUrl: data.photoUrl,
                });
                dispath(login(data));
            }
        } catch (error) {
            console.error(error);
        }
    };

    const update = async (e) => {
        try {
            e.preventDefault();
            const response = await updateProfile(userData.userName, userData.imageUrl);
            console.log(response);
            alert("Update successful!");
            setShow(false);
        } catch (error) {
            console.error(error);
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUserData(prev => ({
            ...prev,
            [name]: value,
        }));
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
        localStorage.removeItem('expense-user');
        dispath(logout())
        navigate('/', { replace: true });
    };

    return (
        <div style={styles.container}>
            <div style={styles.header}>
                <div style={styles.welcomeText}>
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
                    <div style={styles.inputContainer}>
                        <CustomInput
                            type="text"
                            onChange={handleChange}
                            id="userName"
                            name="userName"
                            required={true}
                            placeholder="Full Name"
                            value={userData.userName}
                            title="Full Name"
                        />
                        <CustomInput
                            type="text"
                            onChange={handleChange}
                            id="imageUrl"
                            name="imageUrl"
                            required={true}
                            placeholder="URL"
                            value={userData.imageUrl}
                            title="Profile Photo URL"
                        />
                    </div>
                    <CustomButton
                        type="button"
                        title="Update"
                        disabled={!userData.userName || !userData.imageUrl}
                        style={styles.updateButton}
                        onClick={update}
                    />
                </div>
            )}
        </div>
    );
}

export default WelcomeScreen;