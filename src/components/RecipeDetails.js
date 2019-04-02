import React, { Component, Fragment } from 'react';
import { Link } from 'react-router-dom';

// import { recipe } from '../tempDetails';

export default class RecipeDetails extends Component {
  // constructor(props) {
  //   super(props);
  //   this.state = {
  //     recipe,
  //     url: `https://www.food2fork.com/api/get?key=0d065b1347060372bcabb853c4ca899d&rId=${
  //       this.props.id
  //     }`,
  //   };
  // }

  // async componentDidMount() {
  //   try {
  //     const data = await fetch(this.state.url);
  //     const jsonData = await data.json();
  //     this.setState({
  //       recipe: jsonData.recipe,
  //     });
  //   } catch (err) {
  //     console.log(err);
  //   }
  // }
  state = {
    recipe: { ingredients: [] },
    // recipe,
  };

  async componentDidMount() {
    const { id } = this.props.match.params;
    const { REACT_APP_RECIPE_KEY, REACT_APP_BASE_URL } = process.env;

    const url = `${REACT_APP_BASE_URL}get?key=${REACT_APP_RECIPE_KEY}&rId=${id}`;
    try {
      const data = await fetch(url);
      const jsonData = await data.json();
      this.setState(
        (state, props) => {
          return {
            recipe: jsonData.recipe,
          };
        },
        () => {}
      );
    } catch (err) {
      console.log(err);
    }
  }

  render() {
    const {
      image_url,
      publisher,
      publisher_url,
      source_url,
      title,
      ingredients,
    } = this.state.recipe;
    return (
      <Fragment>
        <div className="container">
          <div className="row">
            <div className="col-10 mx-auto col-md-6 my-3">
              <Link className="btn btn-warning mb-5" to="/">
                Back to recipe list
              </Link>
              <img src={image_url} className="d-block w-100" alt="recipe" />
            </div>
            <div className="col-10 mx-auto col-md-6 my-3">
              <h6 className="text-uppercase">{title}</h6>
              <h6 className="text-warning text-slanted">
                Provided by {publisher}
              </h6>
              <a
                href={publisher_url}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-primary mt-2"
              >
                Publisher Webpage
              </a>
              <a
                href={source_url}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-success mt-2 mx-3"
              >
                Recipe Url
              </a>
              <h2 className="mt-3 mb-4">Ingredients</h2>
              <ul className="list-group mt-4">
                {ingredients.length !== 0 &&
                  ingredients.map((item, index) => {
                    return (
                      <li key={index} className="list-group-item text-slanted">
                        {item}
                      </li>
                    );
                  })}
              </ul>
            </div>
          </div>
        </div>
      </Fragment>
    );
  }
}
