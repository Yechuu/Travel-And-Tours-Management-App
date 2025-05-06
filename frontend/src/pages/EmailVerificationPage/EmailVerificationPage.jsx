// React example
import {useState, useEffect} from 'react'
import { useParams, useNavigate } from 'react-router-dom';
import { verifyEmail } from '../../auth/email_verification.js';

const EmailVerificationPage = () => {
  const { token } = useParams();
  const navigate = useNavigate();
  const [status, setStatus] = useState('verifying');

  useEffect(() => {
    const verify = async () => {
      try {
        await verifyEmail(token);
        setStatus('success');
        // alert('success')
        // setTimeout(() => navigate('/login'), 3000);
      } catch (error) {
        setStatus('error');
        // alert(error)
      }
    };
    verify();
  }, [token]);

  return (
    <div className="verification-container">
      {status === 'verifying' && <p>Verifying your email...</p>}
      {status === 'success' && (
        <div className="success-message">
          <p>Email verified successfully!</p>
          <p>Redirecting to login...</p>
        </div>
      )}
      {status === 'error' && (
        <div className="error-message">
          <p>Verification failed</p>
          <button onClick={() => navigate('/resend-verification')}>
            Resend verification email
          </button>
        </div>
      )}
    </div>
  );
}

export default EmailVerificationPage