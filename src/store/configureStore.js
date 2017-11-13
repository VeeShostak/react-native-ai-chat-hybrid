



import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk'; // Support for dispatching functions
import reducers from './../reducers';


//const store = createStore(reducers, {}, applyMiddleware(thunk));


export default () => {
    // const store = createStore(
    //     combineReducers({
    //       // root state name(property), reducer that will manage it
    //       expenses: expensesReducer,
    //       filters: filtersReducer,
    //       auth: authReducer
    //     }),
    //     composeEnhancers(applyMiddleware(thunk))
    //   );
    const store = createStore(reducers, {}, applyMiddleware(thunk));
    return store;
};