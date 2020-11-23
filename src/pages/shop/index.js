import React from 'react';
import { Route } from 'react-router-dom';
import { connect } from 'react-redux';

import {
  firestore,
  convertCollectionsSnapshotToMap,
} from '../../firebase/firebase';

import { updateCollections } from '../../redux/modules/shop/actions';

import WithSpinner from '../../components/with-spinner';

import CollectionsOverview from '../../components/collections-overview';
import CollectionPage from '../collection';

const CollectionsOverviewWithSpinner = WithSpinner(CollectionsOverview);
const CollectionPageWithSpinner = WithSpinner(CollectionPage);

class ShopPage extends React.Component {
  state = {
    loading: true,
  };

  unsubscribeFromSnapshot = null;

  componentDidMount() {
    const { updateCollections } = this.props;
    const collectionRef = firestore.collection('collections');

    collectionRef.get().then(snapshot => {
      const collectionsMap = convertCollectionsSnapshotToMap(snapshot);
      updateCollections(collectionsMap);
      this.setState({ loading: false });
    });

    /* 
    This is the old observer pattern. The problem is that in other projects
    we might not be using the observable/obesrver pattern or we might
    have our own server of some kind that is not firebase. So this implementation
    may not work. 

    Instead, we could use a promise based pattern. So the implementation above
    shows how to do that while also still leveraging firebase. Above, we treated it
    like some regular API endpoint because firebase allows us to do this. 

    there is 2 ways to do this. 
    1. leverage the firestore collectionRef object that we get back from the
    firestore library. Except instead of returning the observable style of object
    we see below (below this comment section), we return promisses (right below). 

    like this:
    collectionRef.get().then(snapshot => {
      const collectionsMap = convertCollectionsSnapshotToMap(snapshot);
      updateCollections(collectionsMap);
      this.setState({ loading: false });
    });

    2. The second is the native fetch way of doing it that will be shown later. 

    in order for us to use the collectionRef in a 
    promise oriented manner instead of using onsnapshot (observer), what we use is .get()

    What this does for us, is it makes an API call to fetch back the data associated
    to this collectionRef, which will be the exact same as the snapshot object that
    we are getting back from our back-end. 

    The only difference is that instead now we call .then()
    collectionRef.get().then()

    Which means this is a promise.
    And we pass our snapshot transformation into the .then()

    and we can use the observer and promise way interchangeably and 
    it behaves exactly the same way. 

    The only problem with the promise way is the only time we will
    ever get new data from our back-end is when we remount our shop page component

    This is because we are no longer leveraging the live update stream style
    that the observable pattern lended us when we were using onSnapshot as before

    No we are just doing one-off API's calls inside our componentdidmount
    leveraging the promise chain style of doing async event handling. 

    The OTHER OPTION is to use the fetch pattern. But for now I am saving this and pushing.


    This is the old observer/observable pattern using onSnapshot:
    this.unsubscribeFromSnapshot = collectionRef.onSnapshot(snapshot => {
      const collectionsMap = convertCollectionsSnapshotToMap(snapshot);
      updateCollections(collectionsMap);
      this.setState({ loading: false });
    });

    To clarify, this is the promise way of doing it:
    collectionRef.get().then(snapshot => {
      const collectionsMap = convertCollectionsSnapshotToMap(snapshot);
      updateCollections(collectionsMap);
      this.setState({ loading: false });
    });
    
    */

    // ========================================================================
    // ========================================================================

    /* 
    Moving on from that, let's talk about doing it the fetch pattern. 
    The fetch pattern is probably more common if we are using any other 
    type of database

    firebase actually allows us to use their database as API's
    which are accessible by URL. Check out firebase docs about
    Making Rest calls. 
    https://firebase.google.com/docs/firestore/use-rest-api#making_rest_calls

    First I need to find my project ID by going to my firebase dashboard
    then going to project settings. 
    crwn-db-a5823

    https://firestore.googleapis.com/v1/projects/YOUR_PROJECT_ID/databases/(default)/documents/cities/LA

    So, my URL is this:
    https://firestore.googleapis.com/v1/projects/crwn-db-a5823/databases/(default)/documents/cities/LA

    Need to get rid of the cities/LA too:
    https://firestore.googleapis.com/v1/projects/crwn-db-a5823/databases/(default)/documents/

    Now let's implement this using the native fetch api. 
    fetch(
      'https://firestore.googleapis.com/v1/projects/crwn-db-a5823/databases/(default)/documents/collections',
    )
      .then(response => response.json())
      .then(collections => console.log(collections));

    Notice we are not dealing with snapshot so it's a good idea to console.log() this to see what is going on. 

    We will see that we get an object that gives us a documents array. 
    Inside this array, we have objects that represent the collection documents
    that we have inside. However, the fields are actually on a fields property. 
    And the fields have an actual name of the field by not the value. 

    The value is actually in another property called arrayValue. 
    Then, on the arrayValue, we see that it's buried deep.
    It's extremely nested like 8 levels just to get the values. 
    So, let's not use them. 

    But, if we did want to use this then it would look similar to the promise way. 
    We would still want to convert the collections to a map. Then fire update collections. 
    Then set the state. 
    */
  }

  render() {
    const { match } = this.props;
    const { loading } = this.state;
    return (
      <div className="shop-page">
        <Route
          exact
          path={`${match.path}`}
          render={props => (
            <CollectionsOverviewWithSpinner isLoading={loading} {...props} />
          )}
        />
        <Route
          path={`${match.path}/:collectionId`}
          render={props => (
            <CollectionPageWithSpinner isLoading={loading} {...props} />
          )}
        />
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  updateCollections: collectionsMap =>
    dispatch(updateCollections(collectionsMap)),
});

export default connect(null, mapDispatchToProps)(ShopPage);
