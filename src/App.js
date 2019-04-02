import React, { Component, Fragment } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import './App.css';
import { recipes } from './tempList';
import RecipeList from './components/RecipeList';
import RecipeDetails from './components/RecipeDetails';

const { REACT_APP_RECIPE_KEY, REACT_APP_BASE_URL } = process.env;

class App extends Component {
  state = {
    recipes,
    url: `${REACT_APP_BASE_URL}search?key=${REACT_APP_RECIPE_KEY}`,
    base_url: `${REACT_APP_BASE_URL}search?key=${REACT_APP_RECIPE_KEY}`,
    search: '',
    query: '&q=',
    error: '',
  };

  async getRecipes() {
    const { url } = this.state;
    try {
      const data = await fetch(url);
      const jsonData = await data.json();
      if (jsonData.recipes.length === 0) {
        this.setState(() => {
          return { error: 'Sorry, but your search did not return any results' };
        });
      } else {
        this.setState(() => {
          return { recipes: jsonData.recipes, error: '' };
        });
      }
    } catch (err) {
      console.log(err);
    }
  }

  componentDidMount() {
    this.getRecipes();
  }

  handleChange = e => {
    this.setState({
      search: e.target.value,
    });
  };

  handleSubmit = e => {
    e.preventDefault();
    const { base_url, query, search } = this.state;
    this.setState(
      () => {
        return { url: `${base_url}${query}${search}`, search: '' };
      },
      () => {
        this.getRecipes();
      }
    );
  };

  render() {
    const { recipes, search, error } = this.state;
    const { handleChange, handleSubmit } = this;
    return (
      <Router basename={process.env.PUBLIC_URL}>
        <Fragment>
          <Route
            exact
            path="/"
            render={props => (
              <Fragment>
                <RecipeList
                  recipes={recipes}
                  search={search}
                  error={error}
                  handleChange={handleChange}
                  handleSubmit={handleSubmit}
                />
              </Fragment>
            )}
          />
          <Route path="/details/:id" component={RecipeDetails} />
        </Fragment>
      </Router>
    );
  }
}

export default App;
