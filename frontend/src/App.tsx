import './App.css';
import React, { useState, useEffect, useContext } from 'react';
import Navbar from './components/Navbar/Navbar';
import { Routes, Route, useMatch, useNavigate, useLocation } from 'react-router-dom';
import Login from './components/Login/Login';
import Register from './components/Login/Register';
import Message from './components/Message/Message';
import View from './components/Frontpage/View';
import { UserValues, Post } from './types';
import { getPosts } from './services/postService';
import Commentform from './components/PostingForms/Commentform';
import PostPage from './components/PostPage/PostPage';
import Button from './components/Button/Button';
import { setToken } from './services/serviceUtils';
import { MessageContext } from './context/messageContext';
import Postform from './components/PostingForms/Postform';
import Togglable from './components/Togglable/Togglable';
import useVisibility from './hooks/useVisibility';
import { postMap } from './utils/utils';
function App () {
    const [user, setUser] = useState<UserValues | null>(null);
    const [posts, setPosts] = useState<Post[]>([]);
    const location = useLocation();
    const navigate = useNavigate();
    const { toggleVisibility, isOpen } = useVisibility();
    const alert = useContext(MessageContext);
    const handleUser = (values: UserValues) => {
        localStorage.setItem('loggedUser', JSON.stringify(values));
        setUser(values);
        setToken(values.token);
        navigate('/');
    };

    useEffect(() => {
        const loggedUser = window.localStorage.getItem('loggedUser');
        if (loggedUser) {
          const user = JSON.parse(loggedUser);
          setUser(user);
          setToken(user.token);
        }
    }, []);

    useEffect(() => {
        getPosts().then(result => {
            setPosts(result.map((s: any): Post => postMap(s)));
    }).catch(error => {
        alert?.error('There was a problem loading posts!');
        console.log('Error in getting posts: ', error);
    });
    }, []);

    const logout = () => {
        localStorage.removeItem('loggedUser');
        setUser(null);
        setToken('');
        alert?.success('Logged out!');
        navigate('/');
    };

    const addToList = (post: Post) => {
        setPosts(posts.concat(post));
    };
    const postMatch = useMatch('/post/:id');
    const postMatchResult: Post | undefined | null = postMatch === null ?
    null : posts.find((p: Post) => p.postId === Number(postMatch.params.id));

    return (
        <div className="App">
            <Navbar user={user} logout={logout}/>
            <Message />
            <Routes>
                <Route path='/' element={<View posts={posts} />}/>
                <Route path='/login' element={<Login handleUser={handleUser}/>}/>
                <Route path='/register' element={<Register handleUser={handleUser}/>}/>
                <Route path="/post/:id" element={<PostPage post={postMatchResult} user={user} />} />
            </Routes>
            {user && location.pathname === '/' &&
            <Togglable
                buttonText='Add a post'
                toggleVisibility={toggleVisibility}
                isOpen={isOpen.display}>
                <Postform toggleVisibility={toggleVisibility}/>
            </Togglable >}
        </div>
    );
}

export default App;
