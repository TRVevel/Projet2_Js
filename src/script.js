try {
    let reponse = await fetch("https://jsonplaceholder.typicode.com/posts", { method: "GET" });
    let posts = await reponse.json();
    console.log(posts);
    let identifiantComp = 0;

    posts.forEach((post) => {
        if (identifiantComp != post.userId) {
            fetch(`https://jsonplaceholder.typicode.com/users/${post.userId}`)
                .then(reponseUserInfo => {
                    reponseUserInfo.json().then(data => {
                        let userInfo = data;
                        console.log(userInfo.name+ " " + userInfo.id)
                    })
                })


            // let reponseUserInfo = await fetch(`https://jsonplaceholder.typicode.com/users/${post.userId}`, { method: "GET" });
            // let userInfo = await reponseUserInfo.json();

            console.log(typeof post.userId);
            console.log(typeof identifiantComp);
            console.log("postid " + post.userId);

            console.log("IC avant " + identifiantComp);
            identifiantComp = post.userId;
            console.log("IC apres " + identifiantComp);
        }
        // let titrePost = post.title;
        // let contenuePost = post.body;

        // console.log(titrePost);
        // console.log(contenuePost);
        // let postElement = document.createElement("p");
        // postElement.textContent = `userID: ${post.userId} Titre: ${post.title} Contenu: ${post.body}`
        // document.getElementById("post").appendChild(postElement);
    }
    );
} catch (err) {
    console.error(err);
}
console.log(userInfo);