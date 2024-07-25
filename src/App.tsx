import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './components/Header.tsx';
import Login from './pages/Login.tsx';
import LoginToEmail from './pages/LoginToEmail.tsx';
import Signup from './pages/Signup.tsx';
import FridgeList from './components/Fridge/FridgeList.tsx';
import IngredientView from './pages/IngredientView.tsx';
import IngredientDetailList from './pages/IngredientDetailList.tsx';
import IngredientDetailEdit from './pages/IngredientDetailEdit.tsx';
import Layout from './components/common/Layout.tsx';

function App() {
  return (
    <Router>
      <div className="flex flex-col h-full">
        <Header />
        <main className="h-full  bg-gray-100">
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route index element={<Login />} />
              <Route path="/signup" element={<Signup />} />
              <Route path="/fridges" element={<FridgeList />} />
              <Route path="/login" element={<Login />} />
              <Route path="LoginToEmail" element={<LoginToEmail />} />
            </Route>
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
