/* eslint-disable prettier/prettier */

import * as remx from 'remx';
import filter from 'lodash/filter';
import _find from 'lodash/find';

const initialState = {
    posts: []
};

const state = remx.state(initialState);

const getters = remx.getters({
    getPosts() {
        return state.posts;
    },

    getPost(id) {
        const post = _find(state.posts, {id});
        return post;
    }
});

const setters = remx.setters({
    setPosts(posts) {
        state.posts = posts;
    },

    addPost(post) {
        state.posts = [...state.posts, post];
    },

    updatePost(post) {
        state.posts = state.posts.map(item => {
          if (item.id !== post.id) {
            return item;
          }
          return {
            ...item,
            ...post
          }
        })
      },
      
    deletePost(id) {
        state.posts = filter(state.posts, post => post.id !== id);
    }
});

export const postsStore = {
    ...getters,
    ...setters
};
