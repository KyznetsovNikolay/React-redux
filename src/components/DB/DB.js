import axios from 'axios';

class DB {

    _baseUrl = `https://jsonplaceholder.typicode.com`;

    getData = async (id) => {
        const res = await axios(`${this._baseUrl}${id}`);
        return res.data;
    };

    getAllUsers = async () => {
        return await this.getData('/users/');
    };

    getAllPosts = async () => {
        return await this.getData('/posts/');
    };

    getAllComments = async () => {
        return await this.getData('/comments/');
    };

    // getUser = async (id) => {
    //     return await this.getData(`/users/${id}`);
    // };
    //
    // getPost = async (id) => {
    //     return await this.getData(`/posts/${id}`);
    // };
}
export default DB;