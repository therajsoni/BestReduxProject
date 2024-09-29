import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loadData } from '../features/data/dataSlice';
import { logoutUser } from '../features/auth/authSlice';

const Dashboard = () => {
  const dispatch = useDispatch();
  const { items, loading, error } = useSelector((state) => state.data);
  const user = useSelector((state) => state.auth.user);

  useEffect(() => {
    if (user) {
      dispatch(loadData());
    }
  }, [dispatch, user]);

  const handleLogout = () => {
    dispatch(logoutUser());
  };

  if (!user) {
    return <h2>Please login to view your dashboard.</h2>;
  }

  return (
    <div>
      <h2>Dashboard</h2>
      <p>Hello, {user.username}!</p>
      <button onClick={handleLogout}>Logout</button>

      {loading && <p>Loading data...</p>}
      {error && <p>Error: {error}</p>}
      
      <h3>Fetched Data:</h3>
      <ul>
        {items.map((item) => (
          <li key={item.id}>{item.title}</li>
        ))}
      </ul>
    </div>
  );
};

export default Dashboard;
