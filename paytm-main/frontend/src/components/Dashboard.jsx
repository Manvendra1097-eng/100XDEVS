import { useEffect, useState } from 'react';
import { Button } from './ui/button';
import { fetchUsers } from '@/services/user';
import useLocalStorage from '@/hooks/useLocalStorage';
import DropDown from './ui/DropDown';
import SendmoneyCard from './SendmoneyCard';
import { useRecoilValue } from 'recoil';
import { userAtom } from '@/atom/user';

function Dashboard() {
  const [users, setUsers] = useState([]);
  const [value] = useLocalStorage('token', '');
  const user = useRecoilValue(userAtom);

  useEffect(() => {
    fetchUsers(value)
      .then((data) => setUsers(data))
      .catch((err) => console.log(err));
  }, []);

  return (
    <div className="w-screen h-screen space-y-4 overflow-x-hidden">
      <div className="flex items-center justify-between w-10/12 mx-auto py-4">
        <p className="text-2xl font-semibold">Payment App</p>

        <div className="flex items-center gap-4">
          <div className="text-lg font-semibold">Hello, {user.firstName}</div>
          <DropDown>
            <div className="w-8 h-8 bg-slate-300 flex items-center justify-center rounded-full font-semibold text-lg text-slate-700">
              U
            </div>
          </DropDown>
        </div>
      </div>

      <div className="bg-slate-100 h-[2px]"></div>

      <div className="w-10/12 mx-auto">
        <p className="text-xl font-bold">
          Your Balance{' '}
          <span className="text-lg ml-2 text-green-800">
            {' '}
            ₹{Number(user.balance).toFixed(2)}
          </span>
        </p>
      </div>

      <div className="w-10/12 mx-auto flex flex-col gap-3">
        <p className="text-xl font-bold">Users</p>
        <input
          className="w-full p-2 border-2 border-slate-200 rounded-md"
          placeholder="Search users..."
          type="text"
        />

        <div className="mt-4 space-y-2">
          {users.map((user) => (
            <div key={user.username} className="flex justify-between">
              <div className="flex items-center gap-4">
                <div className="w-8 h-8 bg-slate-300 flex items-center justify-center rounded-full font-semibold text-lg text-slate-700">
                  {user.firstName.substring(0, 1)}
                </div>
                <div className="text-lg font-bold">{`${user.firstName} ${user.lastName}`}</div>
              </div>
              <SendmoneyCard userId={user._id} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
