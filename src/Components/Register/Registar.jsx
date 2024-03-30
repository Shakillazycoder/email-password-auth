import { createUserWithEmailAndPassword, sendEmailVerification, updateProfile } from "firebase/auth";
import auth from "../../firebase/firebase.config";
import { useState } from "react";

const Registar = () => {

    const [registerError, setRegisterError] = useState('')
    const [success, setSuccess] = useState('')
    const [showPasswords, setShowPasswords] = useState(false)

    const handleRegister = e =>{
        e.preventDefault();
        const name = e.target.name.value
        const email = e.target.email.value
        const password = e.target.password.value
        const accepted = e.target.terms.checked
        console.log(name, email, password);
        setRegisterError('');
        setSuccess('');
        if (password.length < 6){
            setRegisterError('Password must be at least 6 characters')
            return;
        }
        else if (!/^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,}$/.test(password)){
            setRegisterError('Your password must be at least 8 characters, at least a symbol, upper and lower case letters and a number')
            return;
        }

        else if (!accepted) {
            setRegisterError('You must accept the terms and conditions')
            return;
        }

        // create user
        createUserWithEmailAndPassword(auth, email, password)
        .then( result => {
             console.log(result.user);
             setSuccess('user created successfully')
            //  get name
            updateProfile(result.user, {
                displayName: name,
            } )
            .then( () => {
                console.log('user updated successfully');
            })
            .catch( error => {
                 console.error(error);
                 setRegisterError(error.message);
             })

             // send verification email
             sendEmailVerification(result.user)
             .then (() => {
                alert('Please check your email and verify your account');
             })
        })
        .catch( error => {
             console.error(error);
             setRegisterError(error.message);
         })
    }
    return (
        <div>
            <h2 className="text-3xl">Please register</h2>
            <section className="bg-gray-50 dark:bg-gray-900">
  <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
      <a href="#" className="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white">
          <img className="w-8 h-8 mr-2" src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/logo.svg" alt="logo"/>
          ShakilBite    
      </a>
      <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
              <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                  Sign in to your account
              </h1>
              <form onSubmit={handleRegister} className="space-y-4 md:space-y-6" action="#">
                  <div>
                      <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your Name</label>
                      <input type="text" name="name" id="text" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Your Name" required=""/>
                  </div>
                  <div>
                      <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your email</label>
                      <input type="email" name="email" id="email" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="name@company.com" required=""/>
                  </div>
                  <div className="relative">
                      <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password</label>
                      <input type={showPasswords?"text":"password"} name="password" id="password" placeholder="••••••••" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required=""/>
                      <span  className="bg-white right-3 top-10 rounded-2xl cursor-pointer absolute" onClick={() => setShowPasswords(!showPasswords)}>
                        {
                            showPasswords ? <FaRegEyeSlash />
                            : <FaRegEye />
                        }
                      </span>
                  </div>
                  <div className="flex items-center justify-between">
                      <div className="flex items-start">
                          <div className="flex items-center h-5">
                            <input id="remember" aria-describedby="remember" type="checkbox" className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800" required=""/>
                          </div>
                          <div className="ml-3 text-sm">
                            <label htmlFor="remember" className="text-gray-500 dark:text-gray-300">Remember me</label>
                          </div>
                      </div>
                      <a href="#" className="text-sm font-medium text-primary-600 hover:underline dark:text-primary-500">Forgot password?</a>
                  </div>
                  <div className="flex items-center justify-between">
                      <div className="flex items-start">
                          <div className="flex items-center h-5">
                            <input id="terms" name="terms" aria-describedby="terms" type="checkbox" className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800" required=""/>
                          </div>
                          <div className="ml-3 text-sm">
                            <label htmlFor="terms" className="text-gray-500 dark:text-gray-300">Accept our <a className="underline cursor-pointer" href="#">Terms & conditions</a></label>
                          </div>
                      </div>
                      <a href="#" className="text-sm font-medium text-primary-600 hover:underline dark:text-primary-500">Forgot password?</a>
                  </div>
                  <button type="submit" className="w-full text-white bg-indigo-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">Register</button>
                  <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                      If you have already an account? <Link target="_blank" to='/login' className="font-medium text-primary-600 hover:underline dark:text-primary-500">Login</Link>
                  </p>
              </form>
              {
                registerError && (
                    <p className="text-red-500 text-xs mt-2">
                        {registerError}
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
</section>
        </div>
    );
};

export default Registar;
import { FaRegEye } from "react-icons/fa6";
import { FaRegEyeSlash } from "react-icons/fa6";
import { Link } from "react-router-dom";

