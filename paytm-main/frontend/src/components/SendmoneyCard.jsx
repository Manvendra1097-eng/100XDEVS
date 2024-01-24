import { transfer } from '@/services/account';
import { Button } from './ui/button';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { useState } from 'react';
import useLocalStorage from '@/hooks/useLocalStorage';
import { fetchUser } from '@/services/user';
import { useSetRecoilState } from 'recoil';
import { userAtom } from '@/atom/user';

function SendmoneyCard({ userId }) {
  const [amount, setAmount] = useState('');
  const [token] = useLocalStorage('token', '');
  const setUser = useSetRecoilState(userAtom);
  const [loading, setLoading] = useState(false);

  const handleTransfer = async (userId) => {
    try {
      setLoading(true);
      await transfer({ to: userId, amount }, token);
      const user = await fetchUser(token);
      setUser(user);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {loading && (
        <div className="fixed inset-0  flex justify-center items-center bg-slate-200/90">
          <div>sending...</div>
        </div>
      )}
      <Dialog>
        <DialogTrigger asChild>
          <Button>Send Money</Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold">Send Money</DialogTitle>
            <DialogDescription asChild>
              <div className="space-y-6">
                <div className="space-y-2">
                  <div className="flex items-center gap-6 text-xl font-semibold">
                    <div className="bg-green-600 w-8 h-8 p-6 flex items-center justify-center text-xl font-semibold text-white rounded-full">
                      A
                    </div>
                    <p className="text-2xl text-slate-900">Friends's Name</p>
                  </div>
                  <p className="text-sm font-semibold">Amount (in Rs)</p>
                </div>
                <div className="flex flex-col gap-2">
                  <input
                    className="p-2 border-2 border-slate-100 text-slate-500 font-medium "
                    type="text"
                    placeholder="Enter amount"
                    name="amount"
                    value={amount}
                    onChange={(e) => setAmount(Number(e.target.value))}
                  />
                  <DialogClose asChild>
                    <Button
                      onClick={() => handleTransfer(userId)}
                      variant="success"
                    >
                      Initiate Transfer
                    </Button>
                  </DialogClose>
                </div>
              </div>
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </>
  );
}

export default SendmoneyCard;
