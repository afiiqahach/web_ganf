import { useState } from 'react';
import { logo } from '../../assets';
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from '../../firebase';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [error, setError] = useState(false)
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const navigate = useNavigate()


  const handleLogin = (e)=>{
    e.preventDefault();

  signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
    // Signed in 
    const user = userCredential.user;
    navigate("/")

    // ...
  })
  .catch((error) => {
    setError(true)
  });


  }
  return (
    <div className="bg-blue-dark h-screen flex items-center justify-center">
      <div className="flex flex-col items-center rounded-lg bg-white w-fit py-7 px-9">
        <img src={logo} alt="Logo GANF" className="w-48 mb-6" />
        <form className="flex flex-col mb-20" action="/" onSubmit={handleLogin}>
          <input
            type="text"
            placeholder="Username"
            className="input-field mb-4"
            onChange={e=>setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            className="input-field"
            onChange={e=>setPassword(e.target.value)}
          />
          <a
            href="/login"
            className="text-end text-blue-dark font-medium mt-2 text-sm hover:underline"
          >
            Forgot Password?
          </a>
          <button className="btn--blue-primary !w-full mt-6" type="submit">
            Login
          </button>
          {error && <span className='text-rose-600 text-center mt-3'>Wrong username or password</span>}
        </form>
        <h1 className="font-handwritten text-3xl text-pink-light">
          HAPPINESS #1
        </h1>
      </div>
    </div>
  );
};

export default Login;
