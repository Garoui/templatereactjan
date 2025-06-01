import { useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

function ResetPassword() {
  const { token } = useParams();
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await axios.post(`http://localhost:5000/api/auth/reset-password/${token}`, { password });
    setMessage(res.data.message);
  };

  return (
    <div className="max-w-md mx-auto mt-20 bg-white p-6 rounded shadow">
      <h2 className="text-xl font-bold mb-4">Réinitialiser le mot de passe</h2>
      <form onSubmit={handleSubmit}>
        <input type="password" className="w-full p-2 mb-4 border"
               value={password} onChange={(e) => setPassword(e.target.value)} placeholder="New password" />
        <button className="bg-green-600 text-white w-full py-2 rounded">Réinitialiser</button>
      </form>
      {message && <p className="mt-4 text-green-600">{message}</p>}
    </div>
  );
}

export default ResetPassword;
