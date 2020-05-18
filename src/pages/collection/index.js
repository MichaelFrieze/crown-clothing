import React from "react";

import CollectionItem from "../../components/collection-item/collection-item";

import "./index.scss";

const CollectionPage = ({ match }) =>
  console.log(match.params.collectionId) || (
    <div className="collection-page">
      <h2>CollectionPage</h2>
    </div>
  );

export default CollectionPage;

/* 
we can get match.params.categoryId
*/
