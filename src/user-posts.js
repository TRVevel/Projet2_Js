function getUserIdFromUrl() {
    const params = new URLSearchParams(window.location.search);
    return params.get('userid');
}

function displayPosts(posts) {
    postsContainer.innerHTML = '';
    posts.forEach(post => {
        const postElement = document.createElement('div');
        postElement.className = 'post';
        postElement.innerHTML = `
            <h2>${post.title}</h2>
            <p>${post.body}</p>
        `;
        postsContainer.appendChild(postElement);
    });
}

async function fetchPosts() {
    try {
        const response = await fetch(`https://jsonplaceholder.typicode.com/posts?userId=${userId}`);
        const posts = await response.json();
        displayPosts(posts);
    } catch (error) {
        postsContainer.innerHTML = '<p>Error: Failed to load data.</p>';
    }
}

const userId = getUserIdFromUrl();
const postsContainer = document.getElementById('posts');

if (!userId) {
    postsContainer.innerHTML = '<p>Error: User ID is not specified in the URL.</p>';
} else {
    fetchPosts();
}
