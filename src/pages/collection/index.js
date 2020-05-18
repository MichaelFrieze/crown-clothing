import React from "react";
import { connect } from "react-redux";

// import CollectionItem from "../../components/collection-item/collection-item";

import { selectCollection } from "../../redux/modules/shop/selectors";

import "./index.scss";

const CollectionPage = ({ collection }) => (
  <div className="collection-page">
    <h2>CollectionPage</h2>
  </div>
);

const mapStateToProps = (state, ownProps) => ({
  collection: selectCollection(ownProps.match.params.collectionId)(state),
});

export default connect(mapStateToProps)(CollectionPage);
