// Import Firebase SDKs
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.14.0/firebase-app.js";
import { getFirestore, collection, getDocs, addDoc } from "https://www.gstatic.com/firebasejs/10.14.0/firebase-firestore.js";

// Configuration Firebase
const firebaseConfig = {
    apiKey: "AIzaSyCzOw-8VqfXUjYChfqX2K06goSoiDETlWc",
    authDomain: "tkt-pas-admin-cyborgbulls.firebaseapp.com",
    databaseURL: "https://tkt-pas-admin-cyborgbulls-default-rtdb.europe-west1.firebasedatabase.app",
    projectId: "tkt-pas-admin-cyborgbulls",
    storageBucket: "tkt-pas-admin-cyborgbulls.appspot.com",
    messagingSenderId: "85873062063",
    appId: "1:85873062063:web:c86af7c134581c893ce45a",
    measurementId: "G-EYQNSDCLVL"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firestore
const db = getFirestore(app);

const adherentsList = document.getElementById('adhérents-list');

// Récupérer la collection "Adhérents" de Firebase
const adherentsCollection = collection(db, 'adherents');
getDocs(adherentsCollection).then(snapshot => {
    snapshot.docs.forEach(doc => {
        displayAdherent(doc.data());
    });
});

// Afficher les adhérents dans le tableau
function displayAdherent(data) {
    const row = adherentsList.insertRow();
    row.innerHTML = `
        <td>${data.Nom}</td>
        <td>${data.Prénom}</td>
        <td>${data.Âge}</td>
        <td>${data.Tel}</td>
        <td>${data.Mail}</td>
        <td>${data.Catégorie}</td>
        <td>${data.Passeport}</td>
        <td>${data.Adhésion}</td>
        <td>${data['Sur fil whatsapp']}</td>
        <td>
            <button class="suggest-btn" onclick="suggestModif('${data.Nom}', '${data.Prénom}')">Suggérer</button>
        </td>
    `;
}

// Proposer une modification
function suggestModif(nom, prenom) {
    const suggestion = prompt(`Modifier l'adhérent ${nom} ${prenom}. Entrez les modifications:`);
    if (suggestion) {
        // Envoyer la suggestion à la collection Firebase dédiée
        addDoc(collection(db, 'Modifs_suggestions'), {
            NOM: nom,
            Prénom: prenom,
            suggestion: suggestion,
            status: 'En attente'
        }).then(() => {
            alert('Suggestion envoyée !');
        }).catch((error) => {
            console.error("Erreur lors de l'envoi de la suggestion : ", error);
        });
    }
}

// Mise à jour du timer
setInterval(() => {
    const timerElem = document.getElementById('next-update-timer');
    const nextUpdate = new Date(Date.now() + 30 * 60 * 1000);  // Mises à jour toutes les 30 minutes
    timerElem.textContent = `${nextUpdate.getHours()}:${nextUpdate.getMinutes()}`;
}, 1000);
