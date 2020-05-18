import React from "react";
import { Route } from "react-router-dom";

import CollectionsOverview from "../../components/collections-overview";
import CategoryPage from "../category";

const Shop = ({ match }) => (
  <div className="shop-page">
    <Route exact path={`${match.path}`} component={CollectionsOverview} />
    <Route path={`${match.path}/:categoryId`} component={CategoryPage} />
  </div>
);

export default Shop;

/* 
Nested Routing in Shop Page

We have access to match object because
our shop page is being nested in a route
look at App to see it. 

3 things are passed into our component from App
match, location, and history
Route does this

we want match because we want to display match.path

Now, let's explain both of these lines:
    <Route exact path={`${match.path}`} component={CollectionsOverview} />
    <Route path={`${match.path}/:categoryId`} component={CategoryPage} />

The first one is the path of the page we are on. It's an exact path of just /shop
As long as it is only /shop, then it will display CollectionsOverview component

The second one is using /shop/:categoryId and that gets:
match.params.categoryId
For examples /shop/hats
Then it will display CategoryPage component. 

*/
