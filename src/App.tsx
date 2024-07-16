import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/Home'
import Signup from './pages/Signup';
import Header from './components/Header';
import Footer from './components/Footer';

const App: React.FC = () => {

  return (
    <div className='sm:w-[360px] sm:h-[740px] w-full h-dvh bg-white rounded-3xl m-auto flex column'>
      <Router>
        <Header />
        <Routes>
          <Route path='/' element={<Home title='Home' /> } />
          <Route path='/signup' element={<Signup title='Sign Up' /> } />
        </Routes>
      <Footer title='Footer'/>
      </Router>
    </div>
  );
}

export default App;
