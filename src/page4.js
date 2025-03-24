//Initialisation des indicateurs pour test envoie POST
let indicUser = true;
let indicTitre = true;
let indicContenu = true;
//Sélection du formulaire et tous ses éléments
const formulaire = document.getElementById("postForm");

Array.from(formulaire.elements).forEach((champ) =>
  champ.addEventListener("change", function () {
    //Récupération des valeurs des champs
    const userId = parseInt(document.getElementById("userId").value);
    const title = document.getElementById("title").value;
    const body = document.getElementById("body").value;

    //Test/validation du champs "userId"
    if (champ.id === "userId") {
      if (isNaN(userId) || userId <= 0 || userId > 100) {
        document.getElementById("userIdError").textContent =
          "Le UserId doit être un nombre compris entre 0 et 100 !";
        indicUser = false;
        return; //empêcher de continuer
      } else {
        indicUser = true;
        document.getElementById("userIdError").textContent = "";
      }
    }
    //Test/validation du champs "titre"
    if (champ.id === "title") {
      if (title.length < 5) {
        document.getElementById("titleError").textContent =
          "Le titre du post doit comporter au moins 5 caractères !";
        indicTitre = false;
        return;
      } else {
        indicTitre = true;
        document.getElementById("titleError").textContent = "";
      }
    }
    //Test/validation du champs "contenu"
    if (champ.id === "body") {
      if (body.length < 15) {
        document.getElementById("bodyError").textContent =
          "Le contenu du post doit comporter au moins 15 caractères !";
        indicContenu = false;
        return;
      } else {
        indicContenu = true;
        document.getElementById("bodyError").textContent = "";
      }
    }
  })
);
document
  .getElementById("postForm")
  .addEventListener("submit", function (event) {
    event.preventDefault();

    // Réinitialiser les messages d'erreur
    document.getElementById("userIdError").textContent = "";
    document.getElementById("titleError").textContent = "";
    document.getElementById("bodyError").textContent = "";

    // Récupérer les valeurs du formulaire
    const userId = parseInt(document.getElementById("userId").value);
    const title = document.getElementById("title").value;
    const body = document.getElementById("body").value;

    // Validation des champs
    if (!indicUser || !indicTitre || !indicContenu) {
      document.getElementById("infirmationMessage").style.display = "block";
      document.getElementById("confirmationMessage").style.display = "none";
      return; // Si le formulaire n'est pas valide, on arrête l'envoi
    }

    // Créer l'objet post
    const postData = {
      userId: userId,
      title: title,
      body: body,
    };

    // Envoi de la requête POST
    fetch("https://jsonplaceholder.typicode.com/posts", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(postData),
    })
      .then((response) => response.json())
      .then((data) => {
        // Affichage du message de confirmation
        document.getElementById("confirmationMessage").style.display = "block";
        document.getElementById("infirmationMessage").style.display = "none";
        console.log("Post créé avec succès", data);
      })
      .catch((error) => {
        alert("Une erreur est survenue lors de la création du post.");
        console.error("Erreur lors de la création du post", error);
      });
  });
