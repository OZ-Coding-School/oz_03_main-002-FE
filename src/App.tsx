import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import NavBar from './components/NavBar';
import Login from './pages/Login';
import LoginToEmail from './pages/LoginToEmail';

function App() {
  const handleLogin = () => {
    // 로그인 로직
    console.log('Login');
  };

  const handleGoogleLogin = () => {
    // Google 로그인 로직
    console.log('Google Login');
  };

  const handleEmailLogin = () => {
    // 이메일 로그인 로직
    console.log('Email Login');
  };

  const handleForgotCredentials = () => {
    // 비밀번호 찾기 로직
    console.log('Forgot Credentials');
  };

  const handleSignUp = () => {
    // 회원가입 로직
    console.log('Sign Up');
  };

  return (
    <Router>
      <div className="App flex flex-col min-h-screen">
        <Header />
        <main className="flex-grow">
          <Routes>
            <Route
              path="/"
              element={
                <div>
                  <h1>냉뚝이 테스트 페이지입니다.</h1>
                </div>
              }
            />
            <Route
              path="/login"
              element={
                <Login
                  onLogin={handleLogin}
                  onGoogleLogin={handleGoogleLogin}
                  onEmailLogin={handleEmailLogin}
                  onForgotCredentials={handleForgotCredentials}
                  onSignUp={handleSignUp}
                />
              }
            />
            <Route
              path="LoginToEmail"
              element={
                <LoginToEmail
                  onLogin={handleLogin}
                  onGoogleLogin={handleGoogleLogin}
                  onForgotCredentials={handleForgotCredentials}
                  onSignUp={handleSignUp}
                />
              }
            />
          </Routes>
        </main>
        <NavBar />
      </div>
    </Router>
  );
}

export default App;
