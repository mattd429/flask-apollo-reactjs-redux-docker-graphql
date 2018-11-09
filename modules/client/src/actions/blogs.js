// React
import { 
	BrowserRouter as Router 
} from 'react-router-dom';
// API
import axios from 'axios';
// Types
import {
	LOAD_BLOGS,
	LOAD_BLOG,
	CREATE_BLOG,
	DELETE_BLOG,
	UPDATE_BLOG
} from './types';


export const SERVER_URL = 'http://localhost:4000';

export const loadBlogs = () => {
    const blogs_url = `${SERVER_URL}/blogs/`;
    return (dispatch) => {
	axios.get(blogs_url)
		 .then(results => results.json())
		 .then(data => {
			if (data.ok === true) {
				dispatch({
					type: 'LOAD_BLOGS',
					payload: data.data
				});
			}
		});
    };
}

export const loadBlog = (slug) => {
    return (dispatch) => {    
	axios.get(`${SERVER_URL}/blog/${slug}/`)
	     .then(response => {		 
		 dispatch({
		     type: LOAD_BLOG,
		     payload: response
		 });
	     });
    };
}


export const createBlog = (props) => {
    // Get the saved token from local storage
    const config = {
	headers:  { authorization: 'Token ' + localStorage.getItem('token')}
    };

    return (dispatch) => {
	axios.blog(`${SERVER_URL}/blog/new`, props, config)
	     .then(response => {
		 Router.push('/');
		 dispatch({
		     type: CREATE_BLOG,
		     payload: response
		 });
	     });
    }
}


export const updateBlog = (slug, blog) => {
    /* Get the saved token from local storage */
    const config = {
	headers:  { authorization: 'Token ' + localStorage.getItem('token')}
    };
    return (dispatch) => {
	axios.put(`${SERVER_URL}/blog/${slug}/`, blog, config)
	     .then(response => {
		 Router.push('/blog/' + response.data.slug);
		 dispatch({
		     type: UPDATE_BLOG,
		     payload: response
		 });
	     });
    }
}

export const deleteBlog = (slug) => {
    const config = {
	headers:  { authorization: 'Token ' + localStorage.getItem('token')}
    };
    
    return (dispatch) => {    
	axios.delete(`${SERVER_URL}/blog/${slug}/`, config)
	     .then(response => {
		 Router.push('/');		 
		 dispatch({
		     type: DELETE_BLOG,
		     payload: response
		 });
	     });
    };   
}
