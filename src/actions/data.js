import DB from '../components/DB';
import {
    CREATE_POST,
    DELETE_POST,
    EDIT_POST,
    GET_DATA_FAILED,
    GET_DATA_LOADING,
    GET_DATA_SUCCESS,
    USER_LOG_IN,
    CREATE_COMMENT,
    CREATE_NEW_USER,
    USER_LOG_OUT,
    USER_NOT_FOUND,
    USER_EXIST_IN_BASE
} from '../constants';

const actions = {
    createPost(newPost) {
        return {
            type: CREATE_POST,
            payload: newPost
        };
    },
    editPost(editPost, editId) {
        const postId = { editPost, editId };
        return {
            type: EDIT_POST,
            payload: postId
        };
    },
    deletePost(deleteId) {
        return {
            type: DELETE_POST,
            payload: deleteId
        };
    },
    getData() {
        return async (dispatch, getStore) => {
            dispatch({
                type: GET_DATA_LOADING
            });
            try {
                const data = new DB();
                const posts = await data.getAllPosts();
                const users = await data.getAllUsers();
                const comments = await data.getAllComments();
                const allData = { posts, users, comments };
                dispatch({
                    type: GET_DATA_SUCCESS,
                    payload: allData
                });
            } catch (err) {
                dispatch({
                    type: GET_DATA_FAILED,
                    error: err.message
                });
            }
        };
    },
    logIn(name) {
        return {
          type: USER_LOG_IN,
            payload: name
        };
    },
    logOut() {
        return {
            type: USER_LOG_OUT
        };
    },
    createComment(newComment) {
        return {
            type: CREATE_COMMENT,
            payload: newComment
        };
    },
    createUser(newUser) {
        return {
          type: CREATE_NEW_USER,
          payload: newUser
        };
    },
    userNotFound() {
        return {
          type: USER_NOT_FOUND
        };
    },
    userInBase() {
        return {
          type: USER_EXIST_IN_BASE
        };
    }
};

export default actions;