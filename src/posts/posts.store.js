/* eslint-disable prettier/prettier */

import * as remx from 'remx';
import filter from 'lodash/filter';

const initialState = {
    posts: []
};

const state = remx.state(initialState);

const getters = remx.getters({
    getPosts() {
        return state.posts;
    }
});

const setters = remx.setters({
    setPosts(posts) {
        state.posts = posts;
    },

    addPost(post) {
        state.posts = [...state.posts, post];
    },
    
    deletePost(id) {
        state.posts = filter(state.posts, post => post.id !== id);
    }
});

export const postsStore = {
    ...getters,
    ...setters
};
