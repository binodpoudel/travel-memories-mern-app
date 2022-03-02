import { START_LOADING, END_LOADING, FETCH_ALL, FETCH_POST, FETCH_BY_SEARCH, CREATE, UPDATE, DELETE, LIKE, COMMENT } from '../constants/actionTypes'; /* Why I use constants is because if we miss a typing  or typo error we easily find.*/
import * as api from '../api/index.js'; /* Api connection from frontend to backend this ways.. .....*/

/* Below code  logic for getPost.*/
/* I do logic in Posts Reducers for STAR_LOADING and END_LOADING AND I USE HERE.*/
/*logic i use postDetails.jsx there.*/

export const getPost = (id) => async (dispatch) => {
  try {
    dispatch({ type: START_LOADING });

    const { data } = await api.fetchPost(id);

    dispatch({ type: FETCH_POST, payload: { post: data } });
  } catch (error) {
    console.log(error);
  }
};

/* Below code  logic for getPosts.*/
/* we pass here page as a parmeter because when we post somethings and fetch anykind post page this we use pagination.jsx page.*/

export const getPosts = (page) => async (dispatch) => {
  try {
    dispatch({ type: START_LOADING });
    const { data: { data, currentPage, numberOfPages } } = await api.fetchPosts(page);

    dispatch({ type: FETCH_ALL, payload: { data, currentPage, numberOfPages } });
    dispatch({ type: END_LOADING });
  } catch (error) {
    console.log(error);
  }
};

/* Below code  logic for getPostsBySearch.*/
/* The code below is getPostbysearch. I created this and I use here redux thunk for asynchronity action logic and we use home.js and dispatch.*/
export const getPostsBySearch = (searchQuery) => async (dispatch) => {
  try {
    dispatch({ type: START_LOADING });
    const { data: { data } } = await api.fetchPostsBySearch(searchQuery); /* this mean communication to backend and i create in api index.js.*/

    dispatch({ type: FETCH_BY_SEARCH, payload: { data } });
    dispatch({ type: END_LOADING });
  } catch (error) {
    console.log(error);
  }
};

/* Below logic for create new post.*/
export const createPost = (post, history) => async (dispatch) => {
  try {
    dispatch({ type: START_LOADING });
    const { data } = await api.createPost(post);

    dispatch({ type: CREATE, payload: data });

    history.push(`/posts/${data._id}`);
  } catch (error) {
    console.log(error);
  }
};

/* Below logic for updatePost.*/

export const updatePost = (id, post) => async (dispatch) => {
  try {
    const { data } = await api.updatePost(id, post);

    dispatch({ type: UPDATE, payload: data });
  } catch (error) {
    console.log(error);
  }
};

/* Below logic for likePost.*/
/* Like Post, we don't need to use dispatch start_loading. That is why I am not using it here.*/

export const likePost = (id) => async (dispatch) => {
  const user = JSON.parse(localStorage.getItem('profile'));

  try {
    const { data } = await api.likePost(id, user?.token);

    dispatch({ type: LIKE, payload: data });
  } catch (error) {
    console.log(error);
  }
};

/* Below logic for commentPost.*/
/* Below code value means finalComment and  id, means post._id ( we are passing in the commentSection file inside handleClick dispatch).*/
export const commentPost = (value, id) => async (dispatch) => {

  try {
    const  { data }  = await api.comment(value, id); /* here action creater api called*/
    console.log(data)
    dispatch({ type: COMMENT, payload: data }); /*This code deals with redux thunk and send our comment commentSections.js  and fetch all.*/
    return data.comments;  /* return new comment*/
  } catch (error) {
    console.log(error);
  }
};

/* Below logic for deletePost.*/

export const deletePost = (id) => async (dispatch) => {
  try {
    await await api.deletePost(id);

    dispatch({ type: DELETE, payload: id });
  } catch (error) {
    console.log(error);
  }
};
