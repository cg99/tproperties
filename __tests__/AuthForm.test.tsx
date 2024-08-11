import { render, screen } from '@testing-library/react';
import AuthForm from '../src/components/AuthForm';

describe('AuthForm', () => {
  it('renders a form with email and password fields', () => {
    render(<AuthForm />);
    expect(screen.getByPlaceholderText(/email/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/password/i)).toBeInTheDocument();
  });
});
