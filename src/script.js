// Fonction pour récupérer les posts
async function fetchPosts() {
    const postsResponse = await fetch('https://jsonplaceholder.typicode.com/posts');
    const posts = await postsResponse.json();
    const postsContainer = document.getElementById('posts');

    for (const post of posts) {
        const userResponse = await fetch(`https://jsonplaceholder.typicode.com/users/${post.userId}`);
        const user = await userResponse.json();

        // Créer un élément pour chaque post
        const postDiv = document.createElement('div');
        postDiv.classList.add('post');

        // Ajouter le titre et le contenu du post
        postDiv.innerHTML = `
        <p class="user-link">
                <strong>Utilisateur : </strong><a href="https://jsonplaceholder.typicode.com/posts?userId=${post.userId}" target="_blank">${user.name}</a>
            </p>
            <h3>Titre: ${post.title}</h3>
            <p>${post.body}</p><h3>${post.title}</h3>
            <p>${post.body}</p>
            <a href="./page2.html" target="_blank">Voir le post complet</a>
            
        `;

        // Ajouter le post à la page
        postsContainer.appendChild(postDiv);
        postMessage
    }
}

// Appel de la fonction pour charger les posts
fetchPosts();