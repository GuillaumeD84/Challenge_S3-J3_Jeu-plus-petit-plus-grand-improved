// debugger;

function launchGame() {


  // Coeur du jeu
  function myGame() {

    // Définition du jeu + paramètres
    var game = {
      name: "Jeu du plus petit ou du plus grand",
      objective: "Trouver le nombre généré aléatoirement entre les 2 intervalles donnés et en un nombre de coup limité",
      language: "FR",
      bounds: [1, 1000],
      attempt: 10
    };

    // Variable contenant le dernier nombre proposé par le joueur
    var userNumber = 0;

    // Variable contenant le nombre aléatoire à trouver. Il est généré grâce aux bornes (bounds) définie dans la variable 'game'
    var numberRand = Math.random() * game.bounds[1] + game.bounds[0];
    numberRand = Math.floor(numberRand);
    console.log("Nombre à trouver : " + numberRand);

    // Indique si le joueur à gagné sa partie ou non
    var isWin = false;

    // Variable contenant divers données relatives à la partie en cours
    var gameState = {
      randNum: numberRand,
      userNum: userNumber,
      initialAttempt: game.attempt,
      remainingTry: game.attempt,
      userVictory: isWin
    };

    // Texte explicatif pour le joueur sur les règles du jeu
    alert("Je viens de générer un nombre entre " + game.bounds[0] + " et " + game.bounds[1] + ". Pourras tu le trouver en moins de " + game.attempt + " essais ?");

    // Boucle principale du jeu
    // while (Est-ce que le joueur à gagné ? && Lui reste il des tentatives ?)
    while (isWin === false && gameState.remainingTry) {
      userNumber = prompt("Quel nombre proposes tu ?\nCoups restants : " + gameState.remainingTry);
      console.log("Nombre proposé par le joueur : " + userNumber);

      gameState.remainingTry--;
      gameState.userNum = userNumber;

      // On compare le nombre proposé par le joueur avec le nombre à trouver
      if (userNumber > numberRand) {
        if (gameState.remainingTry) alert("Plus PETIT.");
      }
      else if (userNumber < numberRand) {
        if (gameState.remainingTry) alert("Plus GRAND.");
      }
      // Si les 2 nombres sont identiques le joueur à gagné
      else {
        isWin = true;
        gameState.userVictory = isWin;
      }
    }
    return gameState;
  }



  // Récupère l'objet renvoyé à la fin de la partie et affiche le résultat en alert() au joueur
  function analyseGameMessage(results) {
    console.log(results);

    if (results.userVictory === true) alert("Félicitation !\nEt en seulement " + (results.initialAttempt - results.remainingTry) + " coups !");
    else alert("Dommage !\nIl fallait trouver le " + results.randNum + " !");
  }



  // Permet de modifier notre HTML pour y intégrer dans le tableau les résultats
  function addResultsToHTML(results) {

    // On initialise la var tabResultsDisplayText. Les valeurs indiquées dans l'objet ci-dessous ne servent qu'à la compréhension, elle seront modifiées juste après.
    var tabResultsDisplayText = {
      results: "win/loose",
      attempts: "numberOfAttempt",
      numToFind: "randNumber"
    };

    // On modifie tabResultsDisplayText d'après le résultat (results) de la partie
    if (results.userVictory === true) tabResultsDisplayText.results = "Gagné";
    else tabResultsDisplayText.results = "Perdu";
    tabResultsDisplayText.attempts = results.initialAttempt - results.remainingTry;
    tabResultsDisplayText.numToFind = results.randNum;

    // On ajoute dans notre HTML la ligne du tableau
    document.getElementById("tabRowResults").innerHTML += "<tr><td>" + (document.getElementById("tabRowResults").childElementCount + 1) + "</td><td>" + tabResultsDisplayText.results + "</td><td>" + tabResultsDisplayText.attempts + "</td><td>" + tabResultsDisplayText.numToFind + "</td></tr>";
  }

  // Lance le jeu et les 2 fonctions affichant en alert() et ajoutant dans notre HTML, les résultats
  var results = myGame();
  analyseGameMessage(results);
  addResultsToHTML(results);

  // On demande au joueur s'il souhaite rejouer
  var replayGame = confirm("On rejoue ?");
  if (replayGame) launchGame();
}

// Fonction comptant le nombre de "Gagné" et "Perdu" dans le tableau et affiche une image quand le joueur à plus gagné que perdu
function analyseScore() {
  var gamesResultText = document.getElementById("tabRowResults").textContent;
  var countWin = (gamesResultText.match(/Gagné/g) || []).length;
  var countLose = (gamesResultText.match(/Perdu/g) || []).length;

  if (countWin >= 2) console.log(countWin + " victoires");
  else console.log(countWin + " victoire");
  if (countLose >= 2) console.log(countLose + " défaites");
  else console.log(countLose + " défaite");

  if (countWin > countLose) document.getElementById("winImage").style.visibility = "visible";
  else document.getElementById("winImage").style.visibility = "hidden";
}
