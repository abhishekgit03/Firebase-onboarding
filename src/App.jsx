import { useEffect, useState } from 'react'
import { useFirebase } from './context/Firebase'
import { onAuthStateChanged,signOut } from 'firebase/auth'
import './App.css'

function App() {
  const firebase=useFirebase()
  console.log(firebase)
  const [email,setEmail] =useState('')
  const [password,setPassword] =useState('')
  const [user,setUser]=useState(null);

  useEffect(()=>{
    onAuthStateChanged(firebase.firebaseAuth,(user)=>
    {
      if(user)
      {
        setUser(user);
      }
      else
      {
        console.log("You are logged out");
        setUser(null);
      }
    })
  },[])

  if (user!=null)
  {
    return (
      <div className='Userview'>
      <h2>Hello {user.email}</h2>
      <button onClick={()=> signOut(firebase.firebaseAuth)} class=" w-24 text-white bg-blue-600 bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">Logout</button>
      </div>
    )
  }
  return (
    <>
      <h1 class="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">Firebase Auth Demo</h1>
      {/* <input 
      type="email"
      placeholder=' Enter Email'
      required
      value={email}
      onChange={e => setEmail(e.target.value)}  />
      <input 
      type="password"
      placeholder=' Enter Password'
      required 
      value={password}
      onChange={e => setPassword(e.target.value)} />
      <button onClick={firebase.signupwithGoogle}>Sign up with Google</button>
       <button onClick={()=>{
        firebase.signupUser(email,password)
        firebase.putData(("users/"+"test"),{email})
      }
        }>Signup</button>
         <button onClick={()=>
          {
            firebase.signinwithEmail(email,password)
            console.log("Sign in successful")
         }}>Sign in</button> */}
         <section class="bg-gray-50 dark:bg-gray-900">
    <div class="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
      <div class="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
          <div class="p-6 space-y-4 md:space-y-6 sm:p-8">
              <h1 class="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                  Sign in to your account
              </h1>
              <form class="space-y-4 md:space-y-6" action="#">
                  <div>
                      <label for="email" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your email</label>
                      <input type="email"
                       value={email}
                       onChange={e => setEmail(e.target.value)} 
                      name="email" id="email" class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="name@company.com" required=""/>
                  </div>
                  <div>
                      <label for="password" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password</label>
                      <input
                       value={password}
                       onChange={e => setPassword(e.target.value)} 
                        type="password" name="password" id="password" placeholder="••••••••" class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required=""/>
                  </div>
                  <div class="flex items-center justify-between">
                      <div class="flex items-start">
                          <div class="flex items-center h-5">
                            <input id="remember" aria-describedby="remember" type="checkbox" class="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800" required=""/>
                          </div>
                          <div class="ml-3 text-sm">
                            <label for="remember" class="text-gray-500 dark:text-gray-300">Remember me</label>
                          </div>
                      </div>
                      <a href="#" class="text-sm font-medium text-primary-600 hover:underline dark:text-primary-500">Forgot password?</a>
                  </div>
                  <button type="submit"
                  onClick={()=>
                    {
                      firebase.signinwithEmail(email,password)
                      console.log("Sign in successful")
                    }}
                    class="w-full text-white bg-blue-600 bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">Sign in</button>
                  <p class="text-sm font-light text-gray-500 dark:text-gray-400">
                      Don’t have an account yet? 
                      <button 
                      onClick={()=>{
                        firebase.signupUser(email,password)
                        firebase.putData(("users/"+"test"),{email})
                      }}
                       class="font-medium text-blue-600 text-primary-600 hover:underline dark:text-primary-500">Sign up</button>
                  </p>
                  <button 
                     onClick={firebase.signupwithGoogle}
                      
                       class="font-medium text-blue-600 text-primary-600 hover:underline dark:text-primary-500">
                        <img
                        width="200vh"
                        class="bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow"
                        src="https://www.drupal.org/files/issues/2020-01-26/google_logo.png"></img>
                      </button>
                      
                 
              </form>
          </div>
      </div>
  </div>
</section>
    </>
  )
}

export default App
