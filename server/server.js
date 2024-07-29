import express from 'express';
import cors from 'cors';

const app = express();

app.use(cors());

const recipes = [
  {
    recipeSummary: {
      id: 1,
      recipeName: 'Recipe 1',
      recipeImgURL: 'https://via.placeholder.com/150',
    },
  },
  {
    recipeSummary: {
      id: 2,
      recipeName: 'Recipe 2',
      recipeImgURL: 'https://via.placeholder.com/150',
    },
  },
  // ... 48 more recipes
  {
    recipeSummary: {
      id: 50,
      recipeName: 'Recipe 50',
      recipeImgURL: 'https://via.placeholder.com/150',
    },
  },
];

app.get('/api/recipes', (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;
  const startIndex = (page - 1) * limit;
  const endIndex = startIndex + limit;

  const results = recipes
    .slice(startIndex, endIndex)
    .map((recipe) => recipe.recipeSummary);
  res.json(results);
});

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
