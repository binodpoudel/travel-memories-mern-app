import { FETCH_ALL, FETCH_BY_SEARCH, FETCH_POST, CREATE, UPDATE, DELETE, LIKE, COMMENT } from '../constants/actionTypes'; // Why I use constants is because if we miss a typing  or typo error we easily find.

/// Little explain what does below code means..  A reducer is a function which takes two arguments - current state and an action. that determines changes to an application's state.It uses the actions it receives to determine this change. Redux help manage an application's state changes in a single store so that they behave consistenly.

export default (state = { isLoading: true, posts: [] }, action) => {
  switch (action.type) {
    case 'START_LOADING':
      return { ...state, isLoading: true };
    case 'END_LOADING':
      return { ...state, isLoading: false };
    case FETCH_ALL:
      return {
        ...state,
        posts: action.payload.data,
        currentPage: action.payload.currentPage,
        numberOfPages: action.payload.numberOfPages,
      };
    case FETCH_BY_SEARCH:
      return { ...state, posts: action.payload.data };
    case FETCH_POST:
      return { ...state, post: action.payload.post };
    case LIKE:
      return { ...state, posts: state.posts.map((post) => (post._id === action.payload._id ? action.payload : post)) };

      case COMMENT: 
      return { ...state, 
               posts: state.posts.map((post) =>  { 
           // change the post that just received a comment ....
                if(post._id === action.payload._id) {
                  return action.payload; 
                }
                return post; // return all the other posts normally...
        }),
      };  

    case CREATE:
      return { ...state, posts: [...state.posts, action.payload] };
    case UPDATE:
      return { ...state, posts: state.posts.map((post) => (post._id === action.payload._id ? action.payload : post)) };
    case DELETE:
      return { ...state, posts: state.posts.filter((post) => post._id !== action.payload) };
    default:
      return state;
  }
};

