import React, { useContext, useState } from "react";
import CustomInput from "../../components/UI/CustomInput";
import CustomButton from "../../components/UI/CustomButton";
import { login, resetPassword, signUp } from "../../apis/auth";
import { useNavigate } from "react-router-dom";
import ExpensesContext from "../../store/expenses-context";
import styles from "./styles";
import './LoginScreen.css'

function LoginScreen() {
    const { changeLoginStatus, addUserInfo } = useContext(ExpensesContext);
    const navigate = useNavigate();
    const [input, setInput] = useState({
        email: '',
        password: '',
        confirmPassword: '',
    });
    const [isLoading,setIsLoading]=useState(false);
    const [isLogin, setIsLogin] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setInput(prev => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            // Email validation
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(input.email)) {
                alert("Please enter a valid email address.");
                return;
            }

            // Validation for Sign-Up
            if (!isLogin) {
                if (!input.email || !input.password || !input.confirmPassword) {
                    alert("Please fill all fields.");
                    return;
                }
                if (input.password !== input.confirmPassword) {
                    alert("Passwords do not match.");
                    return;
                }
            }

            // Validation for Login
            if (isLogin) {
                if (!input.email || !input.password) {
                    alert("Please fill all fields.");
                    return;
                }
            }

            // Call the API
            const response = isLogin
                ? await login(input.email, input.password)
                : await signUp(input.email, input.password);
            console.log(response);
            changeLoginStatus(true);
            localStorage.setItem('expense-user', JSON.stringify(response));
            addUserInfo(response);

            alert(isLogin ? "Login successful!" : "Sign-up successful!");
            navigate('/', { replace: true });
        } catch (error) {
            alert(error.response?.data?.error?.message || "An error occurred. Please try again.");
        }
    };
    const handleResetPassword=async () => {
        try {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(input.email)) {
                alert("Please enter a valid email address.");
                return;
            }
            setIsLoading(true)
            const response=await resetPassword(input.email);
            console.log(response);
        } catch (error) {
            console.error(error);

        } finally{
            setIsLoading(false);
        }
    }
    return (
        <div style={styles.loginContainer}>
            <div style={styles.loginFormContainer}>
                <p style={styles.loginTitle}>
                    {isLogin ? 'Login' : 'Sign up'}
                </p>
                <form onSubmit={handleSubmit} style={styles.loginForm}>
                    <CustomInput
                        type={"email"}
                        onChange={handleChange}
                        id="email"
                        name="email"
                        required={true}
                        placeholder={"Email"}
                        title="Email"
                    />
                   {isLoading && isLogin?
                   <div className="loader" style={{
                    marginTop: 20, // Add margin to position the loader
                  }}></div>
                   :
                   <CustomInput
                        type={"password"}
                        onChange={handleChange}
                        id="password"
                        name="password"
                        required={true}
                        placeholder={"Password"}
                        title="Password"
                    />}
                    {!isLogin && (
                        <CustomInput
                            type={"text"}
                            onChange={handleChange}
                            required={true}
                            id='confirmPassword'
                            name='confirmPassword'
                            placeholder={"Confirm Password"}
                            title="Password"
                        />
                    )}

                    <CustomButton
                        type={'submit'}
                        title={isLogin ? 'Login' : 'Sign up'}
                        disabled={
                            isLogin
                                ? !input.email || !input.password
                                : !input.email || !input.password || !input.confirmPassword || input.password !== input.confirmPassword
                        }
                        style={{ marginTop: 20 }}
                    />
                </form>
                {isLogin &&
                <p style={{fontWeight:'400',marginTop:10,color:"blue",textDecoration:'underline',cursor:'pointer'}} onClick={handleResetPassword}>Forget Password</p>
                }
                
            </div>
            <button
                onClick={() => setIsLogin(prev => !prev)}
                style={styles.toggleButton}
            >
                {!isLogin ? 'Have an Account? Login' : `Don't have an Account? Sign Up`}
            </button>
        </div>
    );
}

export default LoginScreen;