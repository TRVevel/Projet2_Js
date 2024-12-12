
async function fetchPosts() {
    let postsResponse = await fetch('https://jsonplaceholder.typicode.com/posts');
    let posts = await postsResponse.json();
    let postsContainer = document.getElementById('posts');

    for (let post of posts) {
        let userResponse = await fetch(`https://jsonplaceholder.typicode.com/users/${post.userId}`);
        let user = await userResponse.json();

        // Créer un élément pour chaque post
        let postDiv = document.createElement('div');
        postDiv.setAttribute("id",`post-${post.id}`);
        postDiv.classList.add('post');
       


        // Ajouter le titre et le contenu du post
        postDiv.innerHTML = `
            <p class="user-link">
                <strong>Utilisateur : </strong><a href="./page2.html?userId=${post.userId}" >${user.name}</a>
            </p>
            <h3>Titre: ${post.title}</h3>
            <p>${post.body}</p>
            `;

        // Empêcher la propagation du clic pour le lien utilisateur
        let userLink = postDiv.querySelector('.user-link');
        userLink.addEventListener('click', (event) => {
        event.stopPropagation(); // Empêche le clic de remonter jusqu'à postDiv
        });

        postDiv.addEventListener('click', () => {
            // Rediriger vers la page du post complet
            window.location.href = `./page3.html?postId=${post.id}`;
        });
        
        
        // Ajouter le post à la page
        postsContainer.appendChild(postDiv);
        
    }
}

// Appel de la fonction pour charger les posts
fetchPosts();
