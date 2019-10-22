import React from 'react'

const Users = ({ users }) => {
  return (
    <div>
      <center><h1>Users List</h1></center>
      {users.map((user) => (
        <div class="card">
          <div class="card-body">
            <h5 class="card-title">{user.username}</h5>
            <h6 class="card-subtitle mb-2 text-muted">{user.password}</h6>
            <p class="card-text">{user.email}</p>
          </div>
        </div>
      ))}
    </div>
  )
};

export default Users
