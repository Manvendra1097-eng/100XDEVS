import { useState } from 'react';
import { Button } from './ui/button';
import { signin } from '@/services/user';
import useLocalStorage from '@/hooks/useLocalStorage';
import { Link, useNavigate } from 'react-router-dom';

const initialState = {
  username: '',
  password: '',
};

function Signin() {
  const [userData, setUserData] = useState(initialState);
  const [, setValue] = useLocalStorage('token', '');
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { token } = await signin(userData);
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
          <h1 className="text-center font-bold text-3xl">Sign In</h1>
          <p className="text-gray-500 font-semibold text-lg text-center w-11/12">
            Enter your credential to access your account
          </p>
        </div>
        <div>
          <form onSubmit={handleSubmit} className="flex flex-col gap-2">
            <div className="flex flex-col gap-1">
              <label htmlFor="username" className="font-semibold text-lg">
                Email
              </label>
              <input
                className="border-2 border-slate-400 p-2 rounded font-medium text-gray-600"
                type="email"
                placeholder="johndoe@example.com"
                id="username"
                name="username"
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
                id="password"
                name="password"
                value={userData?.password}
                onChange={(e) => handleChange(e, 'password')}
              />
            </div>
            <div className="flex flex-col gap-1">
              <Button type="submit">Sign In</Button>
              <p className="text-center text-slate-900  font-medium">
                Don't have an account?{' '}
                <Link to={'/signup'} className="underline">
                  Sign Up
                </Link>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Signin;
