import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Form, Button, Badge, Modal, Alert, Tabs, Tab } from 'react-bootstrap';
import { Search, Heart, Clock, Users, ChefHat, Plus, ShoppingCart, ArrowLeft, Star, Filter, Utensils } from 'lucide-react';
import { Link } from 'react-router-dom';

const RecipeFinder = () => {
  const [recipes, setRecipes] = useState([]);
  const [filteredRecipes, setFilteredRecipes] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedDiet, setSelectedDiet] = useState('');
  const [selectedDifficulty, setSelectedDifficulty] = useState('');
  const [selectedCookTime, setSelectedCookTime] = useState('');
  const [selectedRecipe, setSelectedRecipe] = useState(null);
  const [favorites, setFavorites] = useState([]);
  const [mealPlan, setMealPlan] = useState([]);
  const [showRecipeModal, setShowRecipeModal] = useState(false);
  const [showMealPlanModal, setShowMealPlanModal] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');
  const [activeTab, setActiveTab] = useState('all');

  // Enhanced mock recipe data
  const mockRecipes = [
    {
      id: 1,
      title: 'Spaghetti Carbonara',
      image: 'https://images.pexels.com/photos/4518843/pexels-photo-4518843.jpeg?auto=compress&cs=tinysrgb&w=800',
      cookTime: 20,
      servings: 4,
      difficulty: 'Medium',
      diet: 'vegetarian',
      cuisine: 'Italian',
      rating: 4.8,
      ingredients: [
        '400g spaghetti',
        '200g pancetta or guanciale',
        '4 large eggs',
        '100g Parmesan cheese, grated',
        '2 cloves garlic, minced',
        'Black pepper, freshly ground',
        'Salt to taste',
        '2 tbsp olive oil'
      ],
      instructions: [
        'Bring a large pot of salted water to boil and cook spaghetti according to package instructions',
        'While pasta cooks, heat olive oil in a large pan and fry pancetta until crispy',
        'In a bowl, whisk together eggs, Parmesan cheese, and black pepper',
        'Drain pasta, reserving 1 cup of pasta water',
        'Add hot pasta to the pan with pancetta',
        'Remove from heat and quickly add egg mixture, tossing constantly',
        'Add pasta water gradually until creamy consistency is achieved',
        'Serve immediately with extra Parmesan and black pepper'
      ],
      nutrition: { calories: 520, protein: 22, carbs: 65, fat: 18, fiber: 3 },
      tags: ['comfort-food', 'quick', 'italian', 'pasta']
    },
    {
      id: 2,
      title: 'Chicken Tikka Masala',
      image: 'https://images.pexels.com/photos/2474661/pexels-photo-2474661.jpeg?auto=compress&cs=tinysrgb&w=800',
      cookTime: 45,
      servings: 6,
      difficulty: 'Hard',
      diet: 'gluten-free',
      cuisine: 'Indian',
      rating: 4.9,
      ingredients: [
        '1kg chicken breast, cubed',
        '400ml coconut milk',
        '400g canned tomatoes',
        '2 large onions, diced',
        '4 cloves garlic, minced',
        '2 tbsp garam masala',
        '1 tbsp turmeric',
        '1 tbsp cumin',
        '1 tbsp paprika',
        '1 cup plain yogurt',
        'Fresh coriander for garnish',
        '2 tbsp vegetable oil',
        'Salt and pepper to taste'
      ],
      instructions: [
        'Marinate chicken in yogurt, half the spices, salt and pepper for 2 hours',
        'Heat oil in a large pan and cook marinated chicken until golden',
        'Remove chicken and set aside',
        'In the same pan, sauté onions until golden brown',
        'Add garlic and remaining spices, cook for 1 minute',
        'Add canned tomatoes and simmer for 10 minutes',
        'Stir in coconut milk and bring to a gentle simmer',
        'Return chicken to the pan and simmer for 15 minutes',
        'Garnish with fresh coriander and serve with rice or naan'
      ],
      nutrition: { calories: 380, protein: 35, carbs: 12, fat: 22, fiber: 4 },
      tags: ['spicy', 'indian', 'curry', 'protein-rich']
    },
    {
      id: 3,
      title: 'Quinoa Buddha Bowl',
      image: 'https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&w=800',
      cookTime: 30,
      servings: 2,
      difficulty: 'Easy',
      diet: 'vegan',
      cuisine: 'Healthy',
      rating: 4.6,
      ingredients: [
        '1 cup quinoa',
        '1 ripe avocado, sliced',
        '1 cup chickpeas, cooked',
        '2 cups fresh spinach',
        '1 cucumber, diced',
        '1 large carrot, julienned',
        '1/4 cup pumpkin seeds',
        '3 tbsp tahini',
        '2 tbsp lemon juice',
        '1 tbsp maple syrup',
        '1 clove garlic, minced',
        '2 tbsp water'
      ],
      instructions: [
        'Rinse quinoa and cook according to package instructions',
        'Roast chickpeas with olive oil and spices at 400°F for 20 minutes',
        'Prepare tahini dressing by whisking tahini, lemon juice, maple syrup, garlic, and water',
        'Massage spinach with a little lemon juice and salt',
        'Prepare all other vegetables',
        'Assemble bowls with quinoa as the base',
        'Arrange vegetables and chickpeas on top',
        'Drizzle with tahini dressing and sprinkle with pumpkin seeds'
      ],
      nutrition: { calories: 420, protein: 18, carbs: 52, fat: 16, fiber: 12 },
      tags: ['healthy', 'vegan', 'bowl', 'nutritious']
    },
    {
      id: 4,
      title: 'Beef Stir Fry',
      image: 'https://images.pexels.com/photos/2456435/pexels-photo-2456435.jpeg?auto=compress&cs=tinysrgb&w=800',
      cookTime: 15,
      servings: 4,
      difficulty: 'Easy',
      diet: 'keto',
      cuisine: 'Asian',
      rating: 4.4,
      ingredients: [
        '500g beef sirloin, sliced thin',
        '2 bell peppers, sliced',
        '1 large broccoli head, cut into florets',
        '3 tbsp soy sauce',
        '1 tbsp sesame oil',
        '2 tbsp vegetable oil',
        '3 cloves garlic, minced',
        '1 inch fresh ginger, grated',
        '2 green onions, chopped',
        '1 tbsp cornstarch',
        '1 tsp red pepper flakes'
      ],
      instructions: [
        'Marinate beef with soy sauce and cornstarch for 15 minutes',
        'Heat vegetable oil in a wok or large pan over high heat',
        'Stir-fry beef until browned, about 3-4 minutes, then remove',
        'Add more oil if needed, then stir-fry garlic and ginger for 30 seconds',
        'Add bell peppers and broccoli, stir-fry for 3-4 minutes',
        'Return beef to the pan',
        'Add sesame oil, soy sauce, and red pepper flakes',
        'Stir-fry for another 2 minutes until vegetables are tender-crisp',
        'Garnish with green onions and serve immediately'
      ],
      nutrition: { calories: 320, protein: 28, carbs: 8, fat: 20, fiber: 3 },
      tags: ['quick', 'asian', 'stir-fry', 'low-carb']
    },
    {
      id: 5,
      title: 'Greek Salad',
      image: 'https://images.pexels.com/photos/1213710/pexels-photo-1213710.jpeg?auto=compress&cs=tinysrgb&w=800',
      cookTime: 10,
      servings: 4,
      difficulty: 'Easy',
      diet: 'vegetarian',
      cuisine: 'Mediterranean',
      rating: 4.5,
      ingredients: [
        '4 large tomatoes, cut into wedges',
        '1 cucumber, sliced',
        '1 red onion, thinly sliced',
        '200g feta cheese, cubed',
        '100g Kalamata olives',
        '3 tbsp extra virgin olive oil',
        '1 tbsp red wine vinegar',
        '1 tsp dried oregano',
        'Salt and pepper to taste',
        'Fresh oregano for garnish'
      ],
      instructions: [
        'Cut tomatoes into wedges and place in a large bowl',
        'Add sliced cucumber and red onion',
        'Add feta cheese cubes and olives',
        'In a small bowl, whisk together olive oil, vinegar, and dried oregano',
        'Season dressing with salt and pepper',
        'Pour dressing over salad and toss gently',
        'Let sit for 10 minutes to allow flavors to meld',
        'Garnish with fresh oregano before serving'
      ],
      nutrition: { calories: 220, protein: 8, carbs: 12, fat: 18, fiber: 4 },
      tags: ['fresh', 'mediterranean', 'salad', 'no-cook']
    },
    {
      id: 6,
      title: 'Chocolate Chip Cookies',
      image: 'https://images.pexels.com/photos/230325/pexels-photo-230325.jpeg?auto=compress&cs=tinysrgb&w=800',
      cookTime: 25,
      servings: 24,
      difficulty: 'Easy',
      diet: 'vegetarian',
      cuisine: 'American',
      rating: 4.7,
      ingredients: [
        '2 1/4 cups all-purpose flour',
        '1 tsp baking soda',
        '1 tsp salt',
        '1 cup butter, softened',
        '3/4 cup granulated sugar',
        '3/4 cup brown sugar',
        '2 large eggs',
        '2 tsp vanilla extract',
        '2 cups chocolate chips'
      ],
      instructions: [
        'Preheat oven to 375°F (190°C)',
        'Mix flour, baking soda, and salt in a bowl',
        'Cream butter and both sugars until fluffy',
        'Beat in eggs and vanilla',
        'Gradually mix in flour mixture',
        'Stir in chocolate chips',
        'Drop rounded tablespoons onto ungreased baking sheets',
        'Bake 9-11 minutes until golden brown',
        'Cool on baking sheet for 2 minutes before transferring'
      ],
      nutrition: { calories: 180, protein: 2, carbs: 24, fat: 9, fiber: 1 },
      tags: ['dessert', 'baking', 'sweet', 'classic']
    }
  ];

  useEffect(() => {
    setRecipes(mockRecipes);
    setFilteredRecipes(mockRecipes);
    
    const savedFavorites = localStorage.getItem('recipeFavorites');
    if (savedFavorites) {
      setFavorites(JSON.parse(savedFavorites));
    }
    
    const savedMealPlan = localStorage.getItem('recipeMealPlan');
    if (savedMealPlan) {
      setMealPlan(JSON.parse(savedMealPlan));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('recipeFavorites', JSON.stringify(favorites));
  }, [favorites]);

  useEffect(() => {
    localStorage.setItem('recipeMealPlan', JSON.stringify(mealPlan));
  }, [mealPlan]);

  useEffect(() => {
    let filtered = recipes;

    // Filter by tab
    if (activeTab === 'favorites') {
      filtered = filtered.filter(recipe => favorites.includes(recipe.id));
    }

    // Filter by search term
    if (searchTerm) {
      filtered = filtered.filter(recipe =>
        recipe.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        recipe.ingredients.some(ingredient =>
          ingredient.toLowerCase().includes(searchTerm.toLowerCase())
        ) ||
        recipe.tags.some(tag =>
          tag.toLowerCase().includes(searchTerm.toLowerCase())
        )
      );
    }

    // Filter by diet
    if (selectedDiet) {
      filtered = filtered.filter(recipe => recipe.diet === selectedDiet);
    }

    // Filter by difficulty
    if (selectedDifficulty) {
      filtered = filtered.filter(recipe => recipe.difficulty === selectedDifficulty);
    }

    // Filter by cook time
    if (selectedCookTime) {
      const timeRanges = {
        'quick': [0, 20],
        'medium': [21, 45],
        'long': [46, 999]
      };
      const [min, max] = timeRanges[selectedCookTime];
      filtered = filtered.filter(recipe => recipe.cookTime >= min && recipe.cookTime <= max);
    }

    setFilteredRecipes(filtered);
  }, [searchTerm, selectedDiet, selectedDifficulty, selectedCookTime, recipes, favorites, activeTab]);

  const showNotification = (message) => {
    setAlertMessage(message);
    setShowAlert(true);
    setTimeout(() => setShowAlert(false), 3000);
  };

  const toggleFavorite = (recipeId) => {
    const recipe = recipes.find(r => r.id === recipeId);
    setFavorites(prev => {
      const isFavorite = prev.includes(recipeId);
      if (isFavorite) {
        showNotification(`${recipe.title} removed from favorites`);
        return prev.filter(id => id !== recipeId);
      } else {
        showNotification(`${recipe.title} added to favorites! ❤️`);
        return [...prev, recipeId];
      }
    });
  };

  const addToMealPlan = (recipe) => {
    const mealPlanItem = {
      id: Date.now(),
      recipeId: recipe.id,
      title: recipe.title,
      day: 'Monday',
      mealType: 'dinner',
      servings: recipe.servings
    };
    setMealPlan(prev => [...prev, mealPlanItem]);
    showNotification(`${recipe.title} added to meal plan! 🍽️`);
  };

  const removeFromMealPlan = (mealId) => {
    const meal = mealPlan.find(m => m.id === mealId);
    setMealPlan(prev => prev.filter(m => m.id !== mealId));
    showNotification(`${meal.title} removed from meal plan`);
  };

  const generateShoppingList = () => {
    const allIngredients = mealPlan.reduce((acc, mealItem) => {
      const recipe = recipes.find(r => r.id === mealItem.recipeId);
      if (recipe) {
        acc.push(...recipe.ingredients);
      }
      return acc;
    }, []);

    return [...new Set(allIngredients)];
  };

  const clearFilters = () => {
    setSearchTerm('');
    setSelectedDiet('');
    setSelectedDifficulty('');
    setSelectedCookTime('');
  };

  const getDifficultyColor = (difficulty) => {
    switch (difficulty) {
      case 'Easy': return 'success';
      case 'Medium': return 'warning';
      case 'Hard': return 'danger';
      default: return 'secondary';
    }
  };

  const getDietColor = (diet) => {
    switch (diet) {
      case 'vegan': return 'success';
      case 'vegetarian': return 'info';
      case 'keto': return 'warning';
      case 'gluten-free': return 'primary';
      default: return 'secondary';
    }
  };

  const renderStars = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;

    for (let i = 0; i < fullStars; i++) {
      stars.push(<Star key={i} size={14} fill="currentColor" className="text-warning" />);
    }

    if (hasHalfStar) {
      stars.push(<Star key="half" size={14} fill="currentColor" className="text-warning" style={{ opacity: 0.5 }} />);
    }

    return stars;
  };

  return (
    <Container className="py-5">
      {/* Header */}
      <Row className="mb-4">
        <Col>
          <div className="d-flex justify-content-between align-items-center">
            <div className="d-flex align-items-center">
              <Link to="/" className="btn btn-outline-primary me-3">
                <ArrowLeft size={20} />
              </Link>
              <div>
                <h1 className="display-4 fw-bold text-primary mb-0">Recipe Finder</h1>
                <p className="lead text-muted mb-0">Discover delicious recipes and plan your meals</p>
              </div>
            </div>
            <Button
              variant="outline-primary"
              onClick={() => setShowMealPlanModal(true)}
              className="d-flex align-items-center gap-2"
            >
              <ShoppingCart size={20} />
              Meal Plan ({mealPlan.length})
            </Button>
          </div>
        </Col>
      </Row>

      {/* Alert */}
      {showAlert && (
        <Row className="mb-3">
          <Col>
            <Alert variant="success" className="d-flex align-items-center">
              <ChefHat size={20} className="me-2" />
              {alertMessage}
            </Alert>
          </Col>
        </Row>
      )}

      {/* Search and Filter */}
      <Row className="mb-4">
        <Col>
          <Card className="border-0 shadow-sm">
            <Card.Body>
              <Row className="g-3">
                <Col md={4}>
                  <div className="position-relative">
                    <Search size={18} className="position-absolute top-50 start-0 translate-middle-y ms-3 text-muted" />
                    <Form.Control
                      type="text"
                      placeholder="Search recipes, ingredients, or tags..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      style={{ paddingLeft: '2.5rem' }}
                    />
                  </div>
                </Col>
                <Col md={2}>
                  <Form.Select
                    value={selectedDiet}
                    onChange={(e) => setSelectedDiet(e.target.value)}
                  >
                    <option value="">All Diets</option>
                    <option value="vegan">Vegan</option>
                    <option value="vegetarian">Vegetarian</option>
                    <option value="keto">Keto</option>
                    <option value="gluten-free">Gluten-Free</option>
                  </Form.Select>
                </Col>
                <Col md={2}>
                  <Form.Select
                    value={selectedDifficulty}
                    onChange={(e) => setSelectedDifficulty(e.target.value)}
                  >
                    <option value="">All Levels</option>
                    <option value="Easy">Easy</option>
                    <option value="Medium">Medium</option>
                    <option value="Hard">Hard</option>
                  </Form.Select>
                </Col>
                <Col md={2}>
                  <Form.Select
                    value={selectedCookTime}
                    onChange={(e) => setSelectedCookTime(e.target.value)}
                  >
                    <option value="">Any Time</option>
                    <option value="quick">Quick (≤20 min)</option>
                    <option value="medium">Medium (21-45 min)</option>
                    <option value="long">Long (45+ min)</option>
                  </Form.Select>
                </Col>
                <Col md={2}>
                  <Button
                    variant="outline-secondary"
                    className="w-100"
                    onClick={clearFilters}
                  >
                    <Filter size={18} className="me-2" />
                    Clear
                  </Button>
                </Col>
              </Row>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* Tabs */}
      <Row className="mb-4">
        <Col>
          <Tabs
            activeKey={activeTab}
            onSelect={(k) => setActiveTab(k)}
            className="border-0"
          >
            <Tab eventKey="all" title={`All Recipes (${recipes.length})`} />
            <Tab eventKey="favorites" title={`Favorites (${favorites.length})`} />
          </Tabs>
        </Col>
      </Row>

      {/* Stats */}
      <Row className="mb-4">
        <Col md={3}>
          <Card className="text-center border-0 shadow-sm">
            <Card.Body>
              <ChefHat size={40} className="text-primary mb-3" />
              <h3 className="text-primary">{filteredRecipes.length}</h3>
              <p className="text-muted mb-0">Recipes Found</p>
            </Card.Body>
          </Card>
        </Col>
        <Col md={3}>
          <Card className="text-center border-0 shadow-sm">
            <Card.Body>
              <Heart size={40} className="text-danger mb-3" />
              <h3 className="text-danger">{favorites.length}</h3>
              <p className="text-muted mb-0">Favorites</p>
            </Card.Body>
          </Card>
        </Col>
        <Col md={3}>
          <Card className="text-center border-0 shadow-sm">
            <Card.Body>
              <Utensils size={40} className="text-success mb-3" />
              <h3 className="text-success">{mealPlan.length}</h3>
              <p className="text-muted mb-0">Meal Plan Items</p>
            </Card.Body>
          </Card>
        </Col>
        <Col md={3}>
          <Card className="text-center border-0 shadow-sm">
            <Card.Body>
              <ShoppingCart size={40} className="text-warning mb-3" />
              <h3 className="text-warning">{generateShoppingList().length}</h3>
              <p className="text-muted mb-0">Shopping Items</p>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* Recipe Grid */}
      <Row className="g-4">
        {filteredRecipes.map(recipe => (
          <Col md={6} lg={4} key={recipe.id}>
            <Card className="h-100 border-0 shadow-sm recipe-card">
              <div className="position-relative">
                <Card.Img
                  variant="top"
                  src={recipe.image}
                  alt={recipe.title}
                  style={{ height: '200px', objectFit: 'cover' }}
                />
                <Button
                  variant={favorites.includes(recipe.id) ? 'danger' : 'outline-light'}
                  className="position-absolute top-0 end-0 m-2"
                  onClick={() => toggleFavorite(recipe.id)}
                >
                  <Heart size={16} fill={favorites.includes(recipe.id) ? 'currentColor' : 'none'} />
                </Button>
                <div className="position-absolute bottom-0 start-0 m-2">
                  <Badge bg="dark" className="d-flex align-items-center">
                    {renderStars(recipe.rating)}
                    <span className="ms-1">{recipe.rating}</span>
                  </Badge>
                </div>
              </div>
              
              <Card.Body className="d-flex flex-column">
                <Card.Title className="h5">{recipe.title}</Card.Title>
                <p className="text-muted small mb-2">{recipe.cuisine} Cuisine</p>
                
                <div className="mb-3">
                  <Badge bg={getDietColor(recipe.diet)} className="me-2">
                    {recipe.diet}
                  </Badge>
                  <Badge bg={getDifficultyColor(recipe.difficulty)}>
                    {recipe.difficulty}
                  </Badge>
                </div>
                
                <div className="d-flex justify-content-between text-muted mb-3">
                  <div className="d-flex align-items-center">
                    <Clock size={16} className="me-1" />
                    <small>{recipe.cookTime} min</small>
                  </div>
                  <div className="d-flex align-items-center">
                    <Users size={16} className="me-1" />
                    <small>{recipe.servings} servings</small>
                  </div>
                </div>

                <div className="mb-3">
                  {recipe.tags.slice(0, 3).map((tag, index) => (
                    <Badge key={index} bg="light" text="dark" className="me-1 mb-1">
                      #{tag}
                    </Badge>
                  ))}
                </div>
                
                <div className="mt-auto d-flex gap-2">
                  <Button
                    variant="primary"
                    size="sm"
                    className="flex-fill"
                    onClick={() => {
                      setSelectedRecipe(recipe);
                      setShowRecipeModal(true);
                    }}
                  >
                    View Recipe
                  </Button>
                  <Button
                    variant="outline-success"
                    size="sm"
                    onClick={() => addToMealPlan(recipe)}
                  >
                    <Plus size={16} />
                  </Button>
                </div>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>

      {filteredRecipes.length === 0 && (
        <Row className="mt-5">
          <Col className="text-center">
            <ChefHat size={64} className="text-muted mb-3" />
            <h4 className="text-muted">
              {activeTab === 'favorites' && favorites.length === 0
                ? 'No favorite recipes yet'
                : 'No recipes found'
              }
            </h4>
            <p className="text-muted">
              {activeTab === 'favorites' && favorites.length === 0
                ? 'Start adding recipes to your favorites!'
                : 'Try adjusting your search or filter criteria'
              }
            </p>
          </Col>
        </Row>
      )}

      {/* Recipe Detail Modal */}
      <Modal show={showRecipeModal} onHide={() => setShowRecipeModal(false)} size="lg">
        {selectedRecipe && (
          <>
            <Modal.Header closeButton>
              <Modal.Title className="d-flex align-items-center">
                {selectedRecipe.title}
                <Button
                  variant="link"
                  size="sm"
                  onClick={() => toggleFavorite(selectedRecipe.id)}
                  className="ms-2"
                >
                  <Heart 
                    size={20} 
                    fill={favorites.includes(selectedRecipe.id) ? 'currentColor' : 'none'}
                    className={favorites.includes(selectedRecipe.id) ? 'text-danger' : 'text-muted'}
                  />
                </Button>
              </Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Row>
                <Col md={6}>
                  <img
                    src={selectedRecipe.image}
                    alt={selectedRecipe.title}
                    className="img-fluid rounded mb-3"
                  />
                  
                  <div className="mb-3">
                    <div className="d-flex align-items-center mb-2">
                      {renderStars(selectedRecipe.rating)}
                      <span className="ms-2 fw-bold">{selectedRecipe.rating}</span>
                      <span className="text-muted ms-1">rating</span>
                    </div>
                    <Badge bg={getDietColor(selectedRecipe.diet)} className="me-2">
                      {selectedRecipe.diet}
                    </Badge>
                    <Badge bg={getDifficultyColor(selectedRecipe.difficulty)}>
                      {selectedRecipe.difficulty}
                    </Badge>
                  </div>
                  
                  <div className="d-flex justify-content-between mb-3">
                    <div className="text-center">
                      <Clock size={20} className="text-primary" />
                      <div className="fw-bold">{selectedRecipe.cookTime} min</div>
                      <small className="text-muted">Cook Time</small>
                    </div>
                    <div className="text-center">
                      <Users size={20} className="text-success" />
                      <div className="fw-bold">{selectedRecipe.servings}</div>
                      <small className="text-muted">Servings</small>
                    </div>
                    <div className="text-center">
                      <Utensils size={20} className="text-warning" />
                      <div className="fw-bold">{selectedRecipe.cuisine}</div>
                      <small className="text-muted">Cuisine</small>
                    </div>
                  </div>
                  
                  <h6>Nutrition (per serving):</h6>
                  <Row className="text-center">
                    <Col xs={6} className="mb-2">
                      <div className="fw-bold text-primary">{selectedRecipe.nutrition.calories}</div>
                      <small className="text-muted">Calories</small>
                    </Col>
                    <Col xs={6} className="mb-2">
                      <div className="fw-bold text-success">{selectedRecipe.nutrition.protein}g</div>
                      <small className="text-muted">Protein</small>
                    </Col>
                    <Col xs={6} className="mb-2">
                      <div className="fw-bold text-warning">{selectedRecipe.nutrition.carbs}g</div>
                      <small className="text-muted">Carbs</small>
                    </Col>
                    <Col xs={6} className="mb-2">
                      <div className="fw-bold text-info">{selectedRecipe.nutrition.fat}g</div>
                      <small className="text-muted">Fat</small>
                    </Col>
                  </Row>

                  <div className="mt-3">
                    <h6>Tags:</h6>
                    {selectedRecipe.tags.map((tag, index) => (
                      <Badge key={index} bg="light" text="dark" className="me-1 mb-1">
                        #{tag}
                      </Badge>
                    ))}
                  </div>
                </Col>
                
                <Col md={6}>
                  <h6>Ingredients:</h6>
                  <ul className="list-unstyled">
                    {selectedRecipe.ingredients.map((ingredient, index) => (
                      <li key={index} className="mb-1">
                        <small>• {ingredient}</small>
                      </li>
                    ))}
                  </ul>
                  
                  <h6 className="mt-4">Instructions:</h6>
                  <ol>
                    {selectedRecipe.instructions.map((step, index) => (
                      <li key={index} className="mb-2">
                        <small>{step}</small>
                      </li>
                    ))}
                  </ol>
                </Col>
              </Row>
            </Modal.Body>
            <Modal.Footer>
              <Button
                variant="outline-success"
                onClick={() => addToMealPlan(selectedRecipe)}
              >
                <Plus size={16} className="me-2" />
                Add to Meal Plan
              </Button>
              <Button variant="secondary" onClick={() => setShowRecipeModal(false)}>
                Close
              </Button>
            </Modal.Footer>
          </>
        )}
      </Modal>

      {/* Meal Plan Modal */}
      <Modal show={showMealPlanModal} onHide={() => setShowMealPlanModal(false)} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>Meal Plan & Shopping List</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Row>
            <Col md={6}>
              <h6>Meal Plan ({mealPlan.length} items):</h6>
              {mealPlan.length === 0 ? (
                <div className="text-center py-4">
                  <Utensils size={48} className="text-muted mb-3" />
                  <p className="text-muted">No meals planned yet</p>
                  <p className="text-muted small">Add recipes to start planning your meals!</p>
                </div>
              ) : (
                <div style={{ maxHeight: '300px', overflowY: 'auto' }}>
                  {mealPlan.map(meal => (
                    <Card key={meal.id} className="mb-2 border-0 bg-light">
                      <Card.Body className="py-2">
                        <div className="d-flex justify-content-between align-items-center">
                          <div>
                            <div className="fw-semibold">{meal.title}</div>
                            <small className="text-muted">
                              {meal.day} • {meal.mealType} • {meal.servings} servings
                            </small>
                          </div>
                          <Button
                            variant="outline-danger"
                            size="sm"
                            onClick={() => removeFromMealPlan(meal.id)}
                          >
                            <Trash2 size={14} />
                          </Button>
                        </div>
                      </Card.Body>
                    </Card>
                  ))}
                </div>
              )}
            </Col>
            
            <Col md={6}>
              <h6>Shopping List ({generateShoppingList().length} items):</h6>
              {mealPlan.length === 0 ? (
                <div className="text-center py-4">
                  <ShoppingCart size={48} className="text-muted mb-3" />
                  <p className="text-muted">Add meals to generate shopping list</p>
                </div>
              ) : (
                <div style={{ maxHeight: '300px', overflowY: 'auto' }}>
                  {generateShoppingList().map((ingredient, index) => (
                    <div key={index} className="d-flex align-items-center mb-2">
                      <Form.Check type="checkbox" className="me-2" />
                      <small>{ingredient}</small>
                    </div>
                  ))}
                </div>
              )}
            </Col>
          </Row>
        </Modal.Body>
        <Modal.Footer>
          {mealPlan.length > 0 && (
            <Button
              variant="outline-danger"
              onClick={() => {
                setMealPlan([]);
                showNotification('Meal plan cleared!');
              }}
            >
              Clear Meal Plan
            </Button>
          )}
          <Button variant="secondary" onClick={() => setShowMealPlanModal(false)}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default RecipeFinder;