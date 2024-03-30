import { sendPasswordResetEmail, signInWithEmailAndPassword } from "firebase/auth";
import auth from "../../firebase/firebase.config";
import { useRef, useState } from "react";

const Login = () => {
    const [loginError, setLoginError] = useState('');
    const [success, setSuccess] = useState('');
    const [showPasswords, setShowPasswords] = useState(false);
    const emailRef = useRef(null);

    const handleLogin = e => {
        e.preventDefault();
        const email = e.target.email.value;
        const password = e.target.password.value;
        console.log(email, password);
        setLoginError('');
        setSuccess('');


        if(password.length < 6){
            setLoginError('Password must be at least 6 characters long');
            return;
           }
        else if (!/^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,}$/.test(password)) {
            setLoginError('Your password must be at least 8 characters, at least a symbol, upper and lower case letters and a number');
            return;
        }
        
        // login success
        signInWithEmailAndPassword(auth, email, password)
        .then( result => {
             console.log(result.user);
             if(result.user.emailVerified){
                setSuccess('login successfully');
             }else{
                setLoginError('Please verify your account')
             }
        })
        .catch( error => {
             console.error(error);
             setLoginError(error.message);
         })
    }

    const handleRestPassword = () => {
        const email = emailRef.current.value
        if (!email){
            alert('please provide an email address')
        }
        else if(!/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email)){
           console.log('please write a valid email');
           return;
        }

        // send validation email 
        sendPasswordResetEmail(auth, email)
       .then(() => {
        alert('please check your email address')
       })
       .catch( error => {
        console.error(error);
       })
    }


    return (
        <div className="hero min-h-screen bg-base-200">
  <div className="hero-content flex-col lg:flex-row-reverse">
    <div className="text-center lg:text-left">
      <h1 className="text-5xl font-bold">Login now!</h1>
    </div>
    <div className="card shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
      <form onSubmit={handleLogin} className="card-body">
        <div className="form-control">
          <label className="label">
            <span className="label-text">Email</span>
          </label>
          <input ref={emailRef} type="email" name="email" placeholder="email" className="input input-bordered" required />
        </div>
        <div className="form-control relative">
          <label className="label">
            <span className="label-text">Password</span>
          </label>
          <input type={showPasswords?"text":"password"} name="password" placeholder="password" className="input input-bordered" required />
          <span className="cursor-pointer absolute right-4 bottom-12" onClick={() => setShowPasswords(!showPasswords)}>
              {
                showPasswords ? <FaRegEye></FaRegEye> : <FaRegEyeSlash></FaRegEyeSlash>
              }
          </span>
          <label className="label">
            <a onClick={handleRestPassword} href="#" className="label-text-alt link link-hover">Forgot password?</a>
          </label>
        </div>
        <div>
            <h2>Don’t have an account yet? <Link className="underline text-red-500 cursor-pointer" target="_blank" to='/register'>Register</Link></h2>
        </div>
        <div className="form-control mt-6">
          <button className="btn btn-primary">Login</button>
        </div>
      </form>
      {
        loginError && (
            <p className="text-red-500 text-xs mt-2">
                {loginError}
            </p>
        )
      }
      {
        success && (
            <p className="text-green-500 text-xs mt-2">
                {success}
            </p>
        )
      }
    </div>
  </div>
</div>
    );
};

export default Login;
import { FaRegEye } from "react-icons/fa6";
import { FaRegEyeSlash } from "react-icons/fa6";
import { Link } from "react-router-dom";
