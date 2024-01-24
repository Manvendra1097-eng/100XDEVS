import useLocalStorage from '@/hooks/useLocalStorage';
import { signup } from '@/services/user';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const initialState = {
  firstName: '',
  lastName: '',
  username: '',
  password: '',
};

function Signup() {
  const [userData, setUserData] = useState(initialState);
  const [, setValue] = useLocalStorage('token', '');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { token } = await signup(userData);
      setValue(token);
      setUserData(initialState);
      navigate('/');
    } catch (error) {
      console.log(error);
    }
  };

  const handleChange = (e, field) => {
    const { value } = e.target;
    setUserData({ ...userData, [field]: value });
  };

  return (
    <div className="h-screen w-screen flex items-center justify-center bg-gray-300">
      <div className="flex flex-col gap-4 bg-white p-4 rounded-md shadow-md">
        <div className="flex flex-col gap-2">
          <h1 className="text-center font-bold text-3xl">Sign Up</h1>
          <p className="text-gray-500 font-semibold text-lg text-center w-11/12">
            Enter your information to create an account
          </p>
        </div>
        <div>
          <form onSubmit={handleSubmit} className="flex flex-col gap-2">
            <div className="flex flex-col gap-1">
              <label htmlFor="firstName" className="font-semibold text-lg">
                First Name
              </label>
              <input
                className="border-2 border-slate-400 p-2 rounded font-medium text-gray-600"
                type="text"
                placeholder="John"
                name="firstName"
                id="firstName"
                value={userData.firstName}
                onChange={(e) => handleChange(e, 'firstName')}
              />
            </div>
            <div className="flex flex-col gap-1">
              <label htmlFor="lastName" className="font-semibold text-lg">
                Last Name
              </label>
              <input
                className="border-2 border-slate-400 p-2 rounded font-medium text-gray-600"
                type="text"
                placeholder="Doe"
                name="lastName"
                id="lastName"
                value={userData?.lastName}
                onChange={(e) => handleChange(e, 'lastName')}
              />
            </div>
            <div className="flex flex-col gap-1">
              <label htmlFor="username" className="font-semibold text-lg">
                Email
              </label>
              <input
                className="border-2 border-slate-400 p-2 rounded font-medium text-gray-600"
                type="email"
                placeholder="johndoe@example.com"
                name="username"
                id="username"
                value={userData?.username}
                onChange={(e) => handleChange(e, 'username')}
              />
            </div>
            <div className="flex flex-col gap-1">
              <label htmlFor="password" className="font-semibold text-lg">
                Password
              </label>
              <input
                type="text"
                className="border-2 border-slate-400 p-2 rounded font-medium text-gray-600"
                name="password"
                id="password"
                value={userData?.password}
                onChange={(e) => handleChange(e, 'password')}
              />
            </div>
            <div className="flex flex-col gap-1">
              <button
                type="submit"
                className="bg-black hover:bg-slate-900 text-white py-2 rounded"
              >
                Sign Up
              </button>
              <p className="text-center text-slate-900  font-medium">
                Already have an account?{' '}
                <a href="#" className="underline">
                  Login
                </a>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Signup;
