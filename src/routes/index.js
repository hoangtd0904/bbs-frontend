// import Home from '../pages/Home';
import Posts from '../pages/Posts';
import PostDetails from '../pages/PostDetails';
import CreatePost from '../pages/ModPost/CreatePost';
import EditPost from '../pages/ModPost/EditPost';
import Login from '../pages/Authen/Login';
import Register from '../pages/Authen/Register';

// public routes
const publicRoutes = [
    { path: '/', component: Posts },
    { path: '/posts/detail/:postId', component: PostDetails },
];

// private routes
const privateRoutes = [
    { path: '/posts/add', component: CreatePost },
    { path: '/posts/update', component: EditPost },
];

//auth routes
const authRoutes = [
    { path: '/login', component: Login, layout: null},
    { path: '/register', component: Register, layout: null },
]

export { publicRoutes, privateRoutes, authRoutes };
