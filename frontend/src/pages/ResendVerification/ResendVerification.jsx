import { useState } from 'react';
import { resendVerificationEmail } from '../../auth/email_verification.js';

const ResendVerification = () =>  {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState({ loading: false, message: '', error: '' });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus({ loading: true, message: '', error: '' });
    
    try {
      await resendVerificationEmail(email);
      setStatus({ 
        loading: false, 
        message: 'Verification email sent successfully!', 
        error: '' 
      });
    } catch (error) {
      setStatus({ 
        loading: false, 
        message: '', 
        error: error.message 
      });
    }
  };

  return (
    <div className="resend-verification">
      <h2>Resend Verification Email</h2>
      
      {status.message && (
        <div className="alert alert-success">{status.message}</div>
      )}
      
      {status.error && (
        <div className="alert alert-danger">{status.error}</div>
      )}
      
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="email">Email Address</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="form-control"
          />
        </div>
        
        <button 
          type="submit" 
          className="btn btn-primary"
          disabled={status.loading}
        >
          {status.loading ? 'Sending...' : 'Resend Verification'}
        </button>
      </form>
    </div>
  );
}

export default ResendVerification