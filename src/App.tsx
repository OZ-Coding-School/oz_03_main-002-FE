import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/Home'
import Signup from './pages/Signup';
import Header from './components/Header';
import Footer from './components/Footer';

const App: React.FC = () => {

  return (
    <div className='sm:w-[360px] sm:h-[740px] w-full h-full bg-white m-auto rounded-3xl flex flex-col'>
      <div className='h-full w-full'>
      <Router>
        <Header />
        <Routes>
          <Route path='/' element={<Home title='Home' /> } />
          <Route path='/signup' element={<Signup title='Sign Up' /> } />
        </Routes>
      <Footer title='Footer'/>
      </Router>
      </div>
    </div>
  );
}

export default App;
