import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './components/Header.tsx';
import Login from './pages/Login.tsx';
import LoginToEmail from './pages/LoginToEmail.tsx';
import Signup from './pages/Signup.tsx';
import IngredientView from './pages/IngredientView.tsx';
import IngredientDetailList from './pages/IngredientDetailList.tsx';
import IngredientDetailEdit from './pages/IngredientDetailEdit.tsx';

function App() {
  // const handleLogin = () => {
  //   // 로그인 로직
  //   console.log('Login');
  // };

  // const handleGoogleLogin = () => {
  //   // Google 로그인 로직
  //   console.log('Google Login');
  // };

  // const handleEmailLogin = () => {
  //   // 이메일 로그인 로직
  //   console.log('Email Login');
  // };

  // const handleForgotCredentials = () => {
  //   // 비밀번호 찾기 로직
  //   console.log('Forgot Credentials');
  // };

  // const handleSignUp = () => {
  //   // 회원가입 로직
  //   console.log('Sign Up');
  // };

  return (
    <Router>
      <div className="flex flex-col h-full">
        <Header />
        <main className="h-full  bg-gray-100">
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
                // onLogin={handleLogin}
                // onGoogleLogin={handleGoogleLogin}
                // onEmailLogin={handleEmailLogin}
                // onForgotCredentials={handleForgotCredentials}
                // onSignUp={handleSignUp}
                />
              }
            />
            <Route
              path="LoginToEmail"
              element={
                <LoginToEmail
                // onLogin={handleLogin}
                // onGoogleLogin={handleGoogleLogin}
                // onForgotCredentials={handleForgotCredentials}
                // onSignUp={handleSignUp}
                />
              }
            />
            <Route path="/signup" element={<Signup />} />
            <Route path="/IngredientView" element={<IngredientView />} />
            <Route path="/ingredients/:id" element={<IngredientDetailList />} />
            <Route
              path="/ingredients/:id/edit"
              element={<IngredientDetailEdit />}
            />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
