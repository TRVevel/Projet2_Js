

async function fetchPosts() {
    let queryString = window.location.search;
    console.log(queryString);

    let urlParams = new URLSearchParams(queryString);

    let postId = urlParams.get('postId')
    console.log(postId);

    let postsResponse = await fetch(`https://jsonplaceholder.typicode.com/posts/${postId}`);
    let posts = await postsResponse.json();
    let postsContainer = document.getElementById('posts');

   
        let userResponse = await fetch(`https://jsonplaceholder.typicode.com/users/${posts.userId}`);
        let user = await userResponse.json();

        // Créer un élément pour chaque post
        let postDiv = document.createElement('div');
        postDiv.classList.add('post');
        let commentsResponse = await fetch(`https://jsonplaceholder.typicode.com/posts/${postId}/comments`);
        let comments = await commentsResponse.json();
        
        
       

        // Ajouter le titre et le contenu du post
        postDiv.innerHTML = `
        <p class="user-link">
                <strong>Utilisateur : </strong><a href="https://jsonplaceholder.typicode.com/posts?userId=${posts.userId}" target="_blank">${user.name}</a>
            </p>
            <h3>Titre: ${posts.title}</h3>
            <p>${posts.body}</p>
            <h3>Commentaires:</h3>
            `;
            for(let comment of comments)(
                postDiv.innerHTML =postDiv.innerHTML + `
                 <p>${comment.email}: ${comment.body} </p>
            `);
            function deletePost(){
           
                console.log("test")
                
                }
                postDiv.innerHTML = postDiv.innerHTML + `
                <a href="javascript:void(0);" onclick="deletePost()">Supprimer</a>
            `;
            
            
            
        
        
        // Ajouter le post à la page
        postsContainer.appendChild(postDiv);
 
}

// Appel de la fonction pour charger les posts
fetchPosts();