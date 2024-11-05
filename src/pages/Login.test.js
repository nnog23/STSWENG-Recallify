import { render, screen, fireEvent } from '@testing-library/react';
import Login from './Login';

describe('Login Component - Input Handling', () => {
    it('allows inputting an email and password in the Login form', () => {
        render(<Login />);

        // Ensure we are on the Login form (assuming it’s the default or clicking the toggle if needed)
        const toggleToLoginButton = screen.queryByText("Already have an account? Login");
        if (toggleToLoginButton) {
            fireEvent.click(toggleToLoginButton);
        }

        // Get email and password input fields by their id or label text
        const emailInput = screen.getByLabelText(/Email/i);
        const passwordInput = screen.getByLabelText(/Password/i);

        // Input values for login
        fireEvent.change(emailInput, { target: { value: 'testuser@example.com' } });
        fireEvent.change(passwordInput, { target: { value: 'loginpassword' } });

        // Check if inputs reflect the values
        expect(emailInput.value).toBe('testuser@example.com');
        expect(passwordInput.value).toBe('loginpassword');
    });

    it('allows inputting a username, email, and password in the Sign Up form', () => {
        render(<Login />);

        // Toggle to Sign Up form
        fireEvent.click(screen.getByText("Don't have an account? Sign Up"));

        // Get username, email, and password input fields by their id
        const usernameInput = screen.getByLabelText(/Username/i);
        const emailInput = screen.getByLabelText(/Email/i);
        const passwordInput = screen.getByLabelText(/Password/i);

        // Input some values
        fireEvent.change(usernameInput, { target: { value: 'testuser' } });
        fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
        fireEvent.change(passwordInput, { target: { value: 'password123' } });

        // Check if inputs reflect the values
        expect(usernameInput.value).toBe('testuser');
        expect(emailInput.value).toBe('test@example.com');
        expect(passwordInput.value).toBe('password123');
    });
});

describe('Login Component - Form Toggle', () => {
    it('toggles between Login and Sign Up forms', () => {
        render(<Login />);

        // Initial state should show the "Login" form
        expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent('Login');
        expect(screen.queryByLabelText(/Username/i)).not.toBeInTheDocument();
        expect(screen.getByLabelText(/Email/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/Password/i)).toBeInTheDocument();

        // Click toggle button to switch to the "Sign Up" form
        fireEvent.click(screen.getByText("Don't have an account? Sign Up"));

        // Verify that the "Sign Up" form is now displayed
        expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent('Sign Up');
        expect(screen.getByLabelText(/Username/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/Email/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/Password/i)).toBeInTheDocument();

        // Click toggle button to switch back to the "Login" form
        fireEvent.click(screen.getByText('Already have an account? Login'));

        // Verify that the "Login" form is now displayed again
        expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent('Login');
        expect(screen.queryByLabelText(/Username/i)).not.toBeInTheDocument();
        expect(screen.getByLabelText(/Email/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/Password/i)).toBeInTheDocument();
    });
});