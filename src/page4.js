let isValid = true;
//Sélection du formulaire et tous ses éléments
const formulaire = document.getElementById("postForm");

Array.from(formulaire.elements).forEach((champ) =>
  champ.addEventListener("change", function () {
    isValid = true;
    //Récupération des valeurs des champs
    const userId = parseInt(document.getElementById("userId").value);
    const title = document.getElementById("title").value;
    const body = document.getElementById("body").value;

    //Test/validation du champs "userId"
    if (champ.id === "userId") {
      if (isNaN(userId) || userId <= 0 || userId > 100) {
        document.getElementById("userIdError").textContent =
          "Le UserId doit être un nombre compris entre 0 et 100 !";
        isValid = false;
        return; //empêcher de continuer
      }

      //Test/validation du champs "titre"
      if (champ.id === "title") {
        if (title.length < 5) {
          document.getElementById("titleError").textContent =
            "Le titre du post doit comporter au moins 5 caractères !";
          isValid = false;
          return;
        }
      }
      //Test/validation du champs "contenu"
      if (champ.id === "body") {
        if (body.length < 15) {
          document.getElementById("titleError").textContent =
            "Le contenu du post doit comporter au moins 15 caractères !";
          isValid = false;
          return;
        }
      }
      // Si le champ est valide, on passe au suivant
      if (isValid) {
        // Si ce n'est pas le dernier champ, passe au champ suivant
        if (index + 1 < champs.length) {
          champs[index + 1].focus();
        } else {
          // Si c'est le dernier champ, vous pouvez soumettre le formulaire ou exécuter une autre action
          console.log("Le formulaire est prêt à être soumis.");
        }
      } else {
        // Si le champ n'est pas valide, on reste sur le même champ
        champ.focus();
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

    if (!isValid) {
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
        console.log("Post créé avec succès", data);
      })
      .catch((error) => {
        alert("Une erreur est survenue lors de la création du post.");
        console.error("Erreur lors de la création du post", error);
      });
  });
