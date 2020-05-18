import React from "react";
import { connect } from "react-redux";

import CollectionItem from "../../components/collection-item/collection-item";

import { selectCollection } from "../../redux/modules/shop/selectors";

import "./index.scss";

const CollectionPage = ({ collection }) =>
  console.log(collection) || (
    <div className="collection-page">
      <h2>CollectionPage</h2>
    </div>
  );

const mapStateToProps = (state, ownProps) => ({
  collection: selectCollection(ownProps.match.params.collectionId)(state),
});

export default connect(mapStateToProps)(CollectionPage);

/* 
This is allowing us to dynamic change
what object we are getting based on what route we are on

selectCollection is a function that returns a function
we pass the function that comes out of this function the STATE
Which is why we can access { collections }
*/
