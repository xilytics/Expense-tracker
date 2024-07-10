import React, { useState } from 'react';
import axios from 'axios';
import styled from 'styled-components';

//Defining styled components
const Container=styled.div`
max-width: 500px;
margin: auto;
padding: 2rem;
background-color: #f8f9fa;
border-radius: 5px;
box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
`;


const Title = styled.h2`
  margin-bottom: 1.5rem;
`;

const Label = styled.label`
  margin-bottom: 0.5rem;
  display: block;
`;

const Input = styled.input`
  margin-bottom: 1rem;
  width: 100%;
  padding: 0.5rem;
  border: 1px solid #ccc;
  border-radius: 4px;
`;

const Button = styled.button`
  width: 100%;
  padding: 0.75rem;
  background-color: #007bff;
  border: none;
  color: white;
  border-radius: 4px;
  cursor: pointer;
  &:hover {
    background-color: #0056b3;
  }
`;

//the styled components for displaying success or error messages
const Message = styled.p`
  margin-top: 1rem;
  color: ${props => (props.success ? 'green' : 'red')};
`;



//Creating the Signup Component
const SignUp = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');

    //Handling form submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
        await axios.post('http://localhost:5001/api/auth/register', {
            email,
            password,
        });
        setMessage('Registration successful');
        } catch (error) {
            if (error.response && error.response.data && error.response.data.msg) {
              setMessage(error.response.data.msg);
            } else {
              setMessage('Error registering user');
            }
          }
    };


    //Rendering the Form
    return (
        <Container>
        <form onSubmit={handleSubmit}>
            <Title>Sign Up</Title>
            <div>
            <Label htmlFor="email">Email:</Label>
            <Input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
            />
            </div>
            <div>
            <Label htmlFor="password">Password:</Label>
            <Input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
            />
            </div>
            <Button type="submit">Sign Up</Button>
            {message && <Message success={message.includes('successful')}>{message}</Message>}
        </form>
        </Container>
    );
};
export default SignUp;
  
  