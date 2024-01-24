import { userAtom } from '@/atom/user';
import useLocalStorage from '@/hooks/useLocalStorage';
import { fetchUser } from '@/services/user';
import { useEffect } from 'react';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useRecoilState, useSetRecoilState } from 'recoil';

function ProtectedRoute() {
  const [value] = useLocalStorage('token', '');
  const setUser = useSetRecoilState(userAtom);
  const location = useLocation();

  useEffect(() => {
    if (value) {
      fetchUser(value)
        .then((data) => setUser(data))
        .catch((err) => console.log(err));
    }
  }, []);

  if (!value || value === '') {
    return <Navigate to="/signin" replace state={{ from: location }} />;
  }
  return <Outlet />;
}

export default ProtectedRoute;
