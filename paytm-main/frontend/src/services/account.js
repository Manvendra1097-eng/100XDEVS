import axios from 'axios';

const url = 'http://localhost:3000/api/v1/account';

export const transfer = async (transferData, token) => {
  const res = await axios.post(`${url}/transfer`, transferData, {
    headers: {
      Authorization: 'Bearer ' + token,
    },
  });
  console.log(res.data);
  return res.data;
};
