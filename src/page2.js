function getUserIdFromUrl() {
    const params = new URLSearchParams(window.location.search);
    return params.get('userId');
}
function displayPosts(posts) {

    postsContainer.innerHTML = '';
    posts.forEach(async post => {
        console.log(post)

        let userResponse = await fetch(`https://jsonplaceholder.typicode.com/users/${userId}`);
        let user = await userResponse.json();


        const postElement = document.createElement('div');
        postElement.className = 'post';
        postElement.innerHTML = `
        <p class="user-link">
                <strong>Utilisateur : </strong><p>${user.name}</p>
            </p>
            <h2>titre:${post.title}</h2>
            <p>${post.body}</p>
        `;
        postsContainer.appendChild(postElement);

    });
}


async function fetchPosts() {
    try {
        const response = await fetch(`https://jsonplaceholder.typicode.com/posts/?userId=${userId}`);
        const posts = await response.json();
        displayPosts(posts);
    } catch (error) {
        postsContainer.innerHTML = `<p>${error}</p>`;
    }

}


const userId = getUserIdFromUrl();
const postsContainer = document.getElementById('posts');

if (!userId) {
    postsContainer.innerHTML = '<p>Error: User ID is not specified in the URL.</p>';
} else {
    fetchPosts();
}
