import { AsyncStorage } from 'react-native'; // we need to import AsyncStorage to use as a storage enginge
import { createStore, applyMiddleware } from 'redux';
import { persistStore, autoRehydrate } from 'redux-persist'; 
import reducers from './../reducers';
import ReduxThunk from 'redux-thunk';


// import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
// import thunk from 'redux-thunk'; // Support for dispatching functions
// import reducers from './../reducers';


// //const store = createStore(reducers, {}, applyMiddleware(thunk));


// export default () => {
//     // const store = createStore(
//     //     combineReducers({
//     //       // root state name(property), reducer that will manage it
//     //       expenses: expensesReducer,
//     //       filters: filtersReducer,
//     //       auth: authReducer
//     //     }),
//     //     composeEnhancers(applyMiddleware(thunk))
//     //   );
//     const store = createStore(reducers, {}, applyMiddleware(thunk));
//     return store;
// };

// export const myStore = createStore(reducers, {}, applyMiddleware(ReduxThunk, autoRehydrate()));
// // Enable persistence
// persistStore(store)

// export default configureStore = (onComplete) => { 
//     const store = autoRehydrate()(createStoreWithMiddleware)(reducers);
//     persistStore(store, { storage: AsyncStorage }, onComplete);

//     return store;
// }; 


