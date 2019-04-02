import React, { Component, Fragment } from 'react';
import Recipe from './Recipe';
import RecipeSearch from './RecipeSearch';

export default class RecipeList extends Component {
  render() {
    const { recipes, search, error, handleChange, handleSubmit } = this.props;
    return (
      <Fragment>
        <RecipeSearch
          search={search}
          handleChange={handleChange}
          handleSubmit={handleSubmit}
        />
        <div className="container my-5">
          <div className="row">
            <div className="col-10 mx-auto col-md-6 text-center text-uppercase mb-3">
              <h1 className="text-slanted">Recipe List</h1>
            </div>
          </div>
          <div className="row">
            {error ? (
              <div className="col-10 mx-auto col-md-6 text-center text-uppercase mb-3">
                <div className="alert alert-danger" role="alert">
                  {error}
                </div>
              </div>
            ) : (
              recipes.map(recipe => {
                return <Recipe key={recipe.recipe_id} recipe={recipe} />;
              })
            )}
          </div>
        </div>
      </Fragment>
    );
  }
}
