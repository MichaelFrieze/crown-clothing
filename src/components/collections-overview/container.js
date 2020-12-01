import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import { selectIsCollectionFetching } from '../../redux/modules/shop/selectors';
import WithSpinner from '../with-spinner';
import CollectionsOverview from './';

const mapStateToProps = createStructuredSelector({
  isLoading: selectIsCollectionFetching,
});

/* 
compose evaluate from right to left
First:
- CollectionsOverview gets passed to WithSpinner
Second:
- What comes out of the first step gets passed to connect()
*/
const CollectionsOverviewContainer = compose(
  connect(mapStateToProps),
  WithSpinner,
)(CollectionsOverview);

/* 
The above is equal to:
const CollectionsOverviewContainer =
connect(mapStateToProps)(WithSpinner(CollectionsOverview))
*/

// ANY CONNECT CODE CAN BE MOVED INTO A CONTAINER
// WE ARE JUST WRAPPING A BASE COMPONENT
// WITH SOME HOC THAT WE PUT INSIDE A CONTAINER FILE

export default CollectionsOverviewContainer;
