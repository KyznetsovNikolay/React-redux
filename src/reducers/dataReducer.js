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

const initialState = {
    users: [],
    posts: [],
    comments: [],
    logIn: false,
    dataLoading: false,
    error: '',
    user: '',
    userExist: false,
    userNotFound: false,
    registry: false,
    existUser:false
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_DATA_LOADING:
            return {
              ...state,
              dataLoading: true
            };
        case GET_DATA_SUCCESS:
            const { users, posts, comments } = action.payload;
            comments.map(comment => comment.date = new Date().toLocaleTimeString());
            return {
                ...state,
                users,
                posts,
                comments,
                dataLoading: false
            };
        case GET_DATA_FAILED:
            return {
              ...state,
              error: action.error
            };
        case CREATE_POST:
            const newPost = action.payload;
            const postId = state.posts[state.posts.length - 1].id;
            newPost.id = postId + 1;
            return {
                ...state,
                posts: [...state.posts, newPost]
            };
        case EDIT_POST:
            const { editId, editPost } = action.payload;
            const findEditPost = state.posts.findIndex(post => post.id === editId);
            const beforeEdit = state.posts.slice(0, findEditPost);
            const afterEdit = state.posts.slice(findEditPost + 1);
            const newEditArray = [...beforeEdit, editPost, ...afterEdit];
            return {
                ...state,
                posts: newEditArray
            };
        case DELETE_POST:
            const id = action.payload;
            const findPost = state.posts.findIndex(post => post.id === id);
            const before = state.posts.slice(0, findPost);
            const after = state.posts.slice(findPost + 1);
            const newArray = [...after, ...before];
            return {
                ...state,
                posts: newArray
            };
        case USER_LOG_IN:
            const name = action.payload;
            return {
              ...state,
              logIn: true,
                user: name,
                userNotFound: false,
                registry: false,
                existUser: false
            };
        case USER_LOG_OUT:
            return {
              ...state,
              logIn: false
            };
        case CREATE_COMMENT:
            const newComment = action.payload;
            const commentId = state.comments[state.comments.length - 1].id;
            newComment.id = commentId + 1;
            const commentsArray = [...state.comments, newComment];
            return {
              ...state,
              comments: commentsArray
            };
        case CREATE_NEW_USER:
            const newUser = action.payload;
            const userId = state.users[state.users.length - 1].id;
            newUser.id = userId + 1;
            const newUserArray = [...state.users, newUser];
            return {
              ...state,
                users: newUserArray,
                userNotFound: false,
                registry: true,
                existUser: false
            };
        case USER_NOT_FOUND:
            return {
              ...state,
              userNotFound: true,
                registry: false
            };
        case USER_EXIST_IN_BASE:
            return {
              ...state,
                existUser: true,
            };
        default:
            return state;
    }
};

export default reducer;