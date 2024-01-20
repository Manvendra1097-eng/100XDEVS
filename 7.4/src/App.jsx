import { RecoilRoot, useRecoilState, useRecoilValue } from 'recoil';
import './App.css';
import {
  jobsCount,
  messageCount,
  networkCount,
  notificationCount,
  totalNotification,
} from './store/atoms/atom';

function App() {
  const notifications = useRecoilValue(notificationCount);
  const jobs = useRecoilValue(jobsCount);
  const [messages, setMessages] = useRecoilState(messageCount);
  const networks = useRecoilValue(networkCount);
  const totalNotifications = useRecoilValue(totalNotification);

  return (
    <div>
      <button>Network({networks >= 100 ? '90+' : notifications})</button>
      <button>Jobs({jobs})</button>
      <button>Notification({notifications})</button>
      <button>Message({messages})</button>
      <button onClick={() => setMessages((c) => c + 1)}>
        Me({totalNotifications})
      </button>
    </div>
  );
}

export default App;
