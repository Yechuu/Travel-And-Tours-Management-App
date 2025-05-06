// api/auth.js
export const verifyEmail = async (token) => {
    const response = await fetch('http://localhost:8000/api/account/verify-email/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ token }),
    });
    
    if (!response.ok) {
      throw new Error('Verification failed');
    }
    return response.json();
  };

  export const resendVerificationEmail = async (email) => {
    const response = await fetch('http://localhost:8000/api/account/resend-verification/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email }),
    });
    
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || 'Failed to resend verification email');
    }
    return response.json();
  };