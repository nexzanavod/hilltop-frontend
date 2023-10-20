import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  CButton,
  CCard,
  CCardBody,
  CCardGroup,
  CCol,
  CContainer,
  CForm,
  CFormInput,
  CInputGroup,
  CInputGroupText,
  CRow,
  CImage,
} from '@coreui/react';
import CIcon from '@coreui/icons-react';
import { cilLockLocked, cilUser } from '@coreui/icons';
import LoginPage from '../../../assets/images/loginPage.gif';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = () => {
    // Check if email and password match (This is a basic example, replace with your actual authentication logic)
    if (email === 'admin@gmail.com' && password === 'admin123') {
      // Redirect to the dashboard on successful login
      sessionStorage.setItem('key', '110');
      navigate('/dashboard');
    } else {
      setError('Invalid email or password');
    }
  };

  return (
    <div className="bg-light min-vh-100 d-flex flex-row align-items-center">
      <CContainer>
        <CRow className="justify-content-center">
          <CCol md={8}>
            <CCardGroup>
              <CCard className="p-4">
                <CCardBody>
                  <CForm>
                    <h1>Login</h1>
                    <p className="text-medium-emphasis">Sign In to your Hilltop Dashboard</p>
                    {error && <div className="text-danger mb-3">{error}</div>}
                    <CInputGroup className="mb-3">
                      <CInputGroupText>
                        <CIcon icon={cilUser} />
                      </CInputGroupText>
                      <CFormInput
                        placeholder="Email"
                        autoComplete="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                      />
                    </CInputGroup>
                    <CInputGroup className="mb-4">
                      <CInputGroupText>
                        <CIcon icon={cilLockLocked} />
                      </CInputGroupText>
                      <CFormInput
                        type="password"
                        placeholder="Password"
                        autoComplete="current-password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                      />
                    </CInputGroup>
                    <CRow>
                      <CCol xs={12} md={6}>
                        <CButton
                          style={{ backgroundColor: '#B4DA69', border: 'none' }}
                          className="btn px-4"
                          onClick={handleLogin}
                        >
                          Login
                        </CButton>
                      </CCol>
                      <CCol xs={12} md={6} className="text-right">
                        {/* <CButton color="link" className="px-0">
                          Forgot password?
                        </CButton> */}
                      </CCol>
                    </CRow>
                  </CForm>
                </CCardBody>
              </CCard>
              <CCard className="text-white py-5" style={{ backgroundColor: '#B4DA69' }}>
                <CCardBody className="text-center">
                  <CImage src={LoginPage} width={200} height={200} />
                  <div>
                    <h2>Hebrews 12:14</h2>
                    <p>Pursue peace with all people, and holiness, without which no one will see the Lord.</p>
                    <Link to="/register">{/* Add a link to the registration page here */}</Link>
                  </div>
                </CCardBody>
              </CCard>
            </CCardGroup>
          </CCol>
        </CRow>
      </CContainer>
    </div>
  );
};

export default Login;
