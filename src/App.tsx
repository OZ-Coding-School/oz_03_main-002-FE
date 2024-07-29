import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './components/Header.tsx';
import Login from './pages/Login.tsx';
import Signup from './pages/Signup.tsx';
import FridgeList from './components/Fridge/FridgeList.tsx';
import IngredientView from './pages/IngredientView.tsx';
import IngredientDetailList from './pages/IngredientDetailList.tsx';
import Layout from './components/common/Layout.tsx';
import RecipesView from './pages/RecipesView.tsx';
import RecipeDetail from './pages/RecipeDetail.tsx';
import { recipes } from './data/recipeData.json';

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
              <Route path="/recipes" element={<RecipesView />} />
              <Route
                path="/recipes/:id"
                element={<RecipeDetail recipes={recipes} />}
              />
            </Route>
            <Route path="/IngredientView" element={<IngredientView />} />
            <Route path="/ingredients/:id" element={<IngredientDetailList />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
