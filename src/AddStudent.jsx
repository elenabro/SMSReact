import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

function AddStudent() {
  const [id, setId] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [age, setAge] = useState('');
  const [major, setMajor] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const location = useLocation();
  const token = localStorage.getItem('token');

  useEffect(() => {
    if (location.state && location.state.student) {
      const { student } = location.state;
      setId(student.id);
      setFirstName(student.firstName);
      setLastName(student.lastName);
      setAge(student.age);
      setMajor(student.major);
    }
  }, [location.state]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    const method = location.state && location.state.student ? 'PUT' : 'POST';
    const url = method === 'PUT' ? `http://127.0.0.1:8080/students?id=${id}` : 'http://127.0.0.1:8080/students';

    try {
      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
          'token': token,
        },
        body: JSON.stringify({ id, firstName, lastName, age, major }),
      });

      if (response.ok) {
        navigate('/students');
      } else {
        setError('Failed to save student');
      }
    } catch (error) {
      setError('An error occurred while trying to save the student: ' + error.message);
    }
  };

  return (
    <div>
      <h2>{location.state && location.state.student ? 'Edit Student' : 'Add Student'}</h2>
      {error && <p className="error-message">{error}</p>}
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="id">ID:</label>
          <input
            type="text"
            id="id"
            value={id}
            onChange={(e) => setId(e.target.value)}
            required
            disabled={location.state && location.state.student}
          />
        </div>
        <div className="form-group">
          <label htmlFor="firstName">First Name:</label>
          <input
            type="text"
            id="firstName"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="lastName">Last Name:</label>
          <input
            type="text"
            id="lastName"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="age">Age:</label>
          <input
            type="number"
            id="age"
            value={age}
            onChange={(e) => setAge(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="major">Major:</label>
          <input
            type="text"
            id="major"
            value={major}
            onChange={(e) => setMajor(e.target.value)}
            required
          />
        </div>
        <button type="submit">{location.state && location.state.student ? 'Update Student' : 'Add Student'}</button>
      </form>
      <button onClick={() => navigate('/students')}>Back to List</button>
    </div>
  );
}

export default AddStudent;