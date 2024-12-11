



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

        // Creer un élément pour chaque post
        let postDiv = document.createElement('div');
        postDiv.classList.add('post');
        let commentsResponse = await fetch(`https://jsonplaceholder.typicode.com/posts/${postId}/comments`);
        let comments = await commentsResponse.json();
        
       

        // Ajouter le titre et le contenu du post
        postDiv.innerHTML = `
        <p class="user-link">
                <strong>Utilisateur : </strong><a href="./page2.html?userId=${posts.userId}" target="_blank">${user.name}</a>
            </p>
            <h3>Titre: ${posts.title}</h3>
            <p>${posts.body}</p>  
            <h3>Commentaires:</h3>
            `;
            for(let comment of comments)(
                postDiv.innerHTML =postDiv.innerHTML + `
                 <p>${comment.email}: ${comment.body} </p>
            `);

           async function deletePost(){
                let reponseDelete = await fetch(`https://jsonplaceholder.typicode.com/posts/${postId}`, {
                    method: 'DELETE',
                  });
                  if( reponseDelete.ok)(
                     console.log(`Post ${posts.id}, supprimer avec succées`)
                   ); else(
                     console.log("error")
                   )
             }
            
            let deleteButton= document.createElement("p");
            deleteButton.textContent="Supprimer le post";
            postDiv.appendChild(deleteButton);
            deleteButton.addEventListener("click",deletePost)
           
        
        
        //Ajouter le post a la page
        postsContainer.appendChild(postDiv);

        
 
}
// let homeButton= document.getElementById("home");
// homeButton.addEventListener("onClick", )
// Appel de la fonction pour charger les posts
fetchPosts();

