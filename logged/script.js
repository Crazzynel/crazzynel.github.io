// Récupération des éléments HTML
const form = document.getElementById('form');
const roulette = document.getElementById('roulette');
const resultat = document.getElementById('resultat');

// Gestion du formulaire
form.addEventListener('submit', (e) => {
    e.preventDefault(); // Empêche la soumission classique du formulaire

    // Récupérer les valeurs des champs
    const prenom1 = document.getElementById('prenom1').value.trim();
    const prenom2 = document.getElementById('prenom2').value.trim();
    const defis = document.getElementById('defis').value.split(',').map(d => d.trim());

    // Créer la liste combinée des défis pour les deux prénoms
    const items = [];
    defis.forEach(defi => {
        items.push(`${prenom1} : ${defi}`);
        items.push(`${prenom2} : ${defi}`);
    });

    // Réinitialiser l'affichage précédent
    resultat.textContent = '';
    roulette.innerHTML = '';

    // Injecter les éléments dans la roulette
    items.forEach(item => {
        const div = document.createElement('div');
        div.textContent = item;
        roulette.appendChild(div);
    });

    // Lancer la roulette avec une animation
    lancerRoulette(items);
});

// Fonction pour animer et choisir un élément aléatoirement
function lancerRoulette(items) {
    const indexAleatoire = Math.floor(Math.random() * items.length);
    const hauteurItem = 50; // Hauteur d'un item (en pixels)
    const deplacement = indexAleatoire * hauteurItem;

    // Appliquer l'animation CSS pour faire défiler
    roulette.style.animation = `spin 2s cubic-bezier(0.25, 0.1, 0.25, 1) forwards`;
    roulette.style.transform = `translateY(-${deplacement}px)`;

    // Afficher le résultat après l'animation
    setTimeout(() => {
        resultat.textContent = `🎉 ${items[indexAleatoire]} 🎉`;
    }, 2000);
}
