import * as request from '../utils/httpRequests';

export const getAll = (currentPage, pageSize, order) =>
    request.get(`posts?page=${currentPage}&size=${pageSize}&order=${order}`);

// .then((response) => {
//     setPosts(response.data.content);
//     setTotalPosts(response.data.numberOfElements);
//     setPageCount(response.data.totalPages);
//     setLoading(false);
// })
// .catch((error) => {
//     if (error.code === 'ERR_NETWORK') {
//         alert('Network error, please come back latter!');
//         resetCount(resetTime); // auto reset after 5 mins if user not exit
//     }
// });

export const getPost = (id) => request.get(`posts/${id}`);

export const createPost = (data) => request.post('posts/add', data, { headers: { 'Content-Type': 'multipart/form-data' }, withCredentials: true })

export const download = (id) => request.get(`posts/download/${id}`);
