import React, { Component, Fragment } from 'react';
import { Link } from 'react-router-dom';

export default class Recipe extends Component {
  render() {
    const {
      image_url,
      title,
      source_url,
      publisher,
      recipe_id,
    } = this.props.recipe;
    return (
      <Fragment>
        <div className="col-10 mx-auto col-md-6 col-lg-4 my-3">
          <div className="card">
            <img
              src={image_url}
              className="img-card-top"
              style={{ height: '14rem' }}
              alt="recipe"
            />
            <div className="card-body text-capitalize">
              <h6>{title}</h6>
              <h6 className="text-warning text-slanted">
                provided by {publisher}
              </h6>
            </div>
            <div className="card-footer">
              <Link className="btn btn-primary" to={`/details/${recipe_id}`}>
                Details
              </Link>
              <a
                href={source_url}
                className="btn btn-success mx-2"
                target="_blank"
                rel="noopener noreferrer"
              >
                Recipe Url
              </a>
            </div>
          </div>
        </div>
      </Fragment>
    );
  }
}
