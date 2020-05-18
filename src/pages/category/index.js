import React from "react";

import CollectionItem from "../../components/collection-item/collection-item";

import "./index.scss";

const CategoryPage = ({ match }) =>
  console.log(match) || (
    <div className="category">
      <h2>CATEGORY PAGE</h2>
    </div>
  );

export default CategoryPage;

/* 
we can get match.params.categoryId
*/
