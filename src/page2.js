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
            <h2>Titre: ${post.title}</h2>
            <p>${post.body}</p>
        `;
        postsContainer.appendChild(postElement);

        // Empêcher la propagation du clic pour le lien utilisateur
        let userLink = postElement.querySelector('.user-link');
        userLink.addEventListener('click', (event) => {
        event.stopPropagation(); // Empêche le clic de remonter jusqu'à postElement
        });

        postElement.addEventListener('click', () => {
            // Rediriger vers la page du post complet
            window.location.href = `./page3.html?postId=${post.id}`;
        });
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
