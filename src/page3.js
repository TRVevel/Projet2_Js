

async function fetchPosts() {
    let userUserId = localStorage.getItem("1");
        console.log(userUserId)
    let postsResponse = await fetch(`https://jsonplaceholder.typicode.com/posts?userId=${userUserId}`);
    let posts = await postsResponse.json();
    let postsContainer = document.getElementById('posts');

    for (let post of posts) {
        let userResponse = await fetch(`https://jsonplaceholder.typicode.com/users/${post.userId}`);
        let user = await userResponse.json();
       



        // Créer un élément pour chaque post
        let postDiv = document.createElement('div');
        postDiv.classList.add('post');

        // Ajouter le titre et le contenu du post
        postDiv.innerHTML = `
        <p class="user-link">
                <strong>User : </strong><a href="https://jsonplaceholder.typicode.com/posts?userId=${post.userId}" target="_blank">${user.name}</a>
            </p>
            <h3>Titre: ${post.title}</h3>
            <p>${post.body}</p>
            <a href="https://jsonplaceholder.typicode.com/posts/${post.id}" target="_blank">Voir le post complet</a>
        `;

        // Ajouter le post à la page
        postsContainer.appendChild(postDiv);
    }
    
}
fetchPosts();
// Appel de la fonction pour charger les posts
