import React, { useState } from 'react';
import { Button, TextField, Typography, Container, Paper } from '@mui/material';

export default function Login() {
    const [isLogin, setIsLogin] = useState(true);

    const toggleForm = () => {
        setIsLogin(!isLogin);
    };

    return (
        <Container  class="flex items-center justify-center min-h-screen bg-gray-100" component="main" maxWidth="xs">
            <Paper elevation={3} style={{ padding: '20px' }}>
                <Typography variant="h5" component="h1" align="center">
                    {isLogin ? "Login" : "Sign Up"}
                </Typography>

                {/* Login Form */}
                {isLogin && (
                    <form id="login-form" noValidate style={{ marginTop: '20px' }}>
                        <TextField
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            label="Email"
                            type="email"
                            id="login-email"
                        />
                        <TextField
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            label="Password"
                            type="password"
                            id="login-password"
                        />
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            // color="primary"

                            style={{ backgroundColor: '#808080', color: '#FFFFFF', marginTop: '16px' }}
                        >
                            Login
                        </Button>
                    </form>
                )}

                {/* Signup Form */}
                {!isLogin && (
                    <form id="signup-form" noValidate style={{ marginTop: '20px' }}>
                        <TextField
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            label="Username"
                            type="text"
                            id="signup-username"
                        />
                        <TextField
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            label="Email"
                            type="email"
                            id="signup-email"
                        />
                        <TextField
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            label="Password"
                            type="password"
                            id="signup-password"
                        />
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            // color="primary"
                            style={{ backgroundColor: '#808080', marginTop: '16px' }}
                        >
                            Sign Up
                        </Button>
                    </form>
                )}

                {/* Toggle Button */}
                <div style={{textAlign: 'center', marginTop: '16px' }}>
                    <Button onClick={toggleForm}
                        style={{ color: '#000000'}}>
                        {isLogin ? "Don't have an account? Sign Up" : "Already have an account? Login"}
                    </Button>
                </div>
            </Paper>
        </Container>
    );
}
