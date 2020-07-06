/* eslint-disable prettier/prettier */

import { postsStore } from "./posts.store";

const baseUrl = 'http://localhost/posts';

export async function fetchPosts() {
    const response = await fetch (baseUrl);
    const posts = await response.json();
    return posts
}

export async function addPost(post) {
    const response = await fetch(baseUrl, {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(post),
    });
    const postToAdd = await response.json();
    return postToAdd
}

export async function deletePost(id) {
    await fetch(`http://localhost:3000/posts/${id}`, {
        method: 'DELETE'
    });
}