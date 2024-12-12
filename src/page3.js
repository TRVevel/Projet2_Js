async function fetchPosts() {
    //Recuperation de la partie qui sert a recupere la donnée provenant de la page 1 (index.html) via le lien
    let queryString = window.location.search;
    console.log(queryString);

    //Recuperation de la valeur de la donnée 
    let urlParams = new URLSearchParams(queryString);
    let postId = urlParams.get('postId')
    console.log(postId);
    //Requete Get du post avec l'Id récuperer
    let postsResponse = await fetch(`https://jsonplaceholder.typicode.com/posts/${postId}`);
    let posts = await postsResponse.json();
    let postsContainer = document.getElementById('posts');

    //Requete Get des informations de l'utilisateur avec le UserId récuperer dans le post
    let userResponse = await fetch(`https://jsonplaceholder.typicode.com/users/${posts.userId}`);
    let user = await userResponse.json();

    // Creer un element pour chaque post
    let postDiv = document.createElement('div');
    postDiv.classList.add('post');
    //avec recuperation des commentaire via requete Get
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
                  if( reponseDelete.ok){
                     console.log(`Post ${posts.id}, supprimé avec succées`)
                     let messageDelete= document.getElementById("confirmationDelPost")
                     messageDelete.textContent="Post supprimé avec succès"
                     postDiv.remove();
                  } else{
                     console.log("error")
                     messageDelete.textContent="Le Post n'a pas pus être supprimer"
                  }
             }
            
            let deleteButton= document.createElement("p");
            deleteButton.textContent="Supprimer le post";
            deleteButton.setAttribute("id",`supPost`);
            postDiv.appendChild(deleteButton);
            
            deleteButton.addEventListener("click",deletePost)

        //Ajouter le post a la page
        postsContainer.appendChild(postDiv);

}
fetchPosts();

