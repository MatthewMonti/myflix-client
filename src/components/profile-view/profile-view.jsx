// UserInfoComponent.js

import React, { useState, useEffect } from 'react';

export const UserInfoComponent = () => {
  const [userInfo, setUserInfo] = useState(null);

  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const token = localStorage.getItem('token'); // Assuming you store token in localStorage
        const response = await fetch('https://movies-flex-6e317721b427.herokuapp.com/api/user', {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        });
        const data = await response.json();
        setUserInfo(data);
      } catch (error) {
        console.error('Error fetching user info:', error);
      }
    };

    fetchUserInfo();
  }, []);

  return (
    <div>
      {userInfo && (
        <div>
          <h2>User Information</h2>
          <p>Username: {userInfo.Username}</p>
          <p>Password: {userInfo.Password}</p>
          <p>Email: {userInfo.Email}</p>
          <p>Birthday: {userInfo.Birthday} </p>
          {/* <p>Birthday: {userInfo.instanceof(date)}</p> */}
          <p></p>
        </div>
      )}
    </div>
  );
};



              