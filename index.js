var root,
  documents,
  media,
  currentDirectory,
  dirList,
  catList,
  audioList,
  audio,
  ending;

function Directory(name, files, hidden_files) {
  this.name = name;
  this.parent_folder = this;
  this.folders = [];
  this.files = files;
  this.hidden_files = hidden_files;
}

root = new Directory("", [], [".hackademint.sh"]);

documents = new Directory(
  "/documents",
  ["boris_is_watching_you.sh", "flag.txt"],
  []
);

media = new Directory(
  "/media",
  ["note.txt", "ma_musique_préférée.mp3", "wonkas_welcome_song.mp3"],
  []
);

root.folders = [documents, media];
documents.parent_folder = root;
media.parent_folder = root;

currentDirectory = root;

dirList = {
  root: root,
  documents: documents,
  media: media,
};

catList = {
  "boris_is_watching_you.sh": "Nothing to cat here.",
  "flag.txt": `<pre>  Sur sa palette, le peintre s’aperçut avec horreur
  Qu’il n’avait plus aucune couleur.
  Ne restait que du blanc et du noir.
  Pourtant, son ours, il l’aurait souhaité bariolé,  
  Aussi coloré qu’un arc-en-ciel.
  C’était raté.
  Il se demanda comment l’habiller avec ce qui lui restait.
  Des pois ? Trop dalmatien.
  Des rayures ? Le zèbre serait jaloux.
  Et s’il dessinait juste des taches ovales
  sur les oreilles et les yeux ?
  Pas assez, se dit-il avant d’ajouter deux larges bandes
  au niveau des pattes.
  Quel drôle de costume, lui dit sa fille passant par là.
  Noir et blanc, ton panda ?
  Mais pourquoi ?
  Ne voulant point avouer ses véritables raisons,
  Le peintre chercha des explications.
  C'est Boris le panda, lui dit-il sans attendre,
  Et devant lui tu présenteras tes offrandes,
  Sinon sa vengence sera terrible,
  Et la suite n'est pas lisible.

  Pas Pierre Cornette
  </pre>`,
  "note.txt": "Commande 'play' pour jouer un .mp3 et 'pause' pour arrêter.",
  ".hackademint.sh": "Nothing to cat here",
  "ma_musique_préférée.mp3": "Nothing to cat here",
  "wonkas_welcome_song.mp3": "Nothing to cat here",
};

audioList = ["ma_musique_préférée.mp3", "wonkas_welcome_song.mp3"];

ending = [false, false, false, false];

(function (window) {
  "use strict";

  function checkEnding() {
    var total = 0;
    for (let i = 0; i < ending.length; i++) {
      if (ending[i]) {
        total += 1;
      }
    }
    console.log("Secrets found : " + total + "/" + ending.length);
    if (ending[0] && ending[1] && ending[2] && ending[3]) {
      grandFinal();
    }
  }

  function grandFinal() {
    var homeDiv = document.createElement("div");
    homeDiv.innerHTML = `
    <div class="home_container">
        <h2>Bravo !</h2>
        <p>Tu as trouvé les principaux secrets ! Y en a-t-il d'autres ? ;) N'hésite pas à installer Pandux sur ton ordinateur ! C'est bien mieux que Windows ou Ubuntu, et c'est "Boris Approved"... Ah, et attends cinq secondes !<p>
    </div>`;
    homeDiv.setAttribute("class", "home");
    document.body.appendChild(homeDiv);

    setTimeout(function () {
      window.location = "https://youtu.be/ARSP-m97g2w";
    }, 5000);
  }

  function pwd(currentDirectory) {
    var terminal_div = document.getElementsByClassName("terminal");
    var pv = document.createElement("p");
    pv.innerHTML = "/home/boris" + currentDirectory.name;
    pv.setAttribute("class", "terminal__line");
    $(pv).appendTo(terminal_div);
  }

  function cd(curDir, nextDir) {
    if (curDir.folders.includes(nextDir) || nextDir === curDir.parent_folder) {
      currentDirectory = nextDir;
      var terminal_div = document.getElementsByClassName("terminal");
      var pv = document.createElement("p");
      pv.innerHTML =
        "Vous êtes maintenant dans " + "/home/boris" + currentDirectory.name;
      pv.setAttribute("class", "terminal__line");
      $(pv).appendTo(terminal_div);
    } else {
      var terminal_div = document.getElementsByClassName("terminal");
      var pv = document.createElement("p");
      pv.innerHTML =
        "Ce dossier n'est fils de votre dossier courant. Vous êtes toujours dans " +
        "/home/boris" +
        currentDirectory.name;
      pv.setAttribute("class", "terminal__line");
      $(pv).appendTo(terminal_div);
    }
  }

  function ls(curDir, includeHidden) {
    var terminal_div = document.getElementsByClassName("terminal");
    var pv = document.createElement("p");

    if (includeHidden) {
      pv.innerHTML += `&emsp;<span class='blue'>.</span><br/>`;
      pv.innerHTML += `&emsp;<span class='blue'>..</span><br/>`;
    }

    for (let i = 0; i < curDir.folders.length; i++) {
      pv.innerHTML +=
        `&emsp;<span class='blue'>` + curDir.folders[i].name + `</span><br/>`;
    }

    for (let i = 0; i < curDir.files.length; i++) {
      pv.innerHTML += `&emsp;` + curDir.files[i] + `<br/>`;
    }

    if (includeHidden) {
      for (let i = 0; i < curDir.hidden_files.length; i++) {
        pv.innerHTML +=
          `&emsp;<span style='font-style: italic'>` +
          curDir.hidden_files[i] +
          `</span><br/>`;
      }
    }

    $(pv).appendTo(terminal_div);
  }

  function cat(curDir, fileName) {
    if (
      curDir.files.includes(fileName) ||
      curDir.hidden_files.includes(fileName)
    ) {
      var terminal_div = document.getElementsByClassName("terminal");
      var mes = document.createElement("p");
      mes.innerHTML = catList[fileName];
      $(mes).appendTo(terminal_div);
      if (fileName == "flag.txt") {
        ending[2] = true;
        checkEnding();
      }
    } else {
      var terminal_div = document.getElementsByClassName("terminal");
      var mes = document.createElement("p");
      mes.innerHTML = "Aucun fichier de ce nom ici.";
      mes.setAttribute("class", "terminal__line");
      $(mes).appendTo(terminal_div);
    }
  }

  function play(curDir, fileName) {
    var terminal_div = document.getElementsByClassName("terminal");
    var mes = document.createElement("p");
    if (
      curDir.files.includes(fileName) ||
      curDir.hidden_files.includes(fileName)
    ) {
      var url = "./res/audio/" + fileName;
      if (audioList.includes(fileName)) {
        audio = new Audio(url);
        audio.play();
        mes.innerHTML = "Playing : " + fileName;
        if (fileName == "ma_musique_préférée.mp3") {
          ending[3] = true;
          checkEnding();
        }
      } else {
        mes.innerHTML = "Ce fichier n'est pas un audio.";
      }
    } else {
      mes.innerHTML = "Aucun fichier de ce nom ici.";
    }
    mes.setAttribute("class", "terminal__line");
    $(mes).appendTo(terminal_div);
  }

  function pause() {
    audio.pause();
  }

  function borisIsWatchingYou() {
    var terminal_div = document.getElementsByClassName("terminal");
    var section = document.createElement("section");
    section.innerHTML = `
                        <style>
                        .container {
                          width: 100%;
                        }
                        .eye {
                          position: relative;
                          display: inline-block;
                          border-radius: 50%;
                          height: 30px;
                          width: 30px;
                          background: #CCC;
                        }
                        .eye:after {
                          position: absolute;
                          bottom: 17px;
                          right: 10px;
                          width: 10px;
                          height: 10px;
                          background: #000;
                          border-radius: 50%;
                          content: " ";
                        }</style>
                        <script>
      $(".demo-11").mousemove(function (event) {
        var eye = $(".eye");
        var x = eye.offset().left + eye.width() / 2;
        var y = eye.offset().top + eye.height() / 2;
        var rad = Math.atan2(event.pageX - x, event.pageY - y);
        var rot = rad * (180 / Math.PI) * -1 + 180;
        eye.css({
          "-webkit-transform": "rotate(" + rot + "deg)",
          "-moz-transform": "rotate(" + rot + "deg)",
          "-ms-transform": "rotate(" + rot + "deg)",
          transform: "rotate(" + rot + "deg)",
        });
      });
    </script>
                        <div class='.container'>
                            <div class='eye'></div>
                            <div class='eye'></div>
                        </div>`;
    section.setAttribute("class", "move-area");
    $(section).appendTo(terminal_div);
    ending[0] = true;
    checkEnding();
  }

  function hackademint() {
    var terminal_div = document.getElementsByClassName("terminal");
    var mes = document.createElement("pre");
    mes.innerHTML = `
    You've been hacked.
    You've been hacked.
    You've been hacked.
    You've been hacked.
    You've been hacked.
    You've been hacked.
    You've been hacked.
    You've been hacked.
    You've been hacked.
    You've been hacked.
    You've been hacked.
    You've been hacked.
    You've been hacked.
    You've been hacked.
    You've been hacked.
    You've been hacked.
    You've been hacked.
    You've been hacked.
    You've been hacked.
    You've been hacked.
    You've been hacked.
    You've been hacked.
    You've been hacked.
    You've been hacked.
    You've been hacked.
    You've been hacked.
    You've been hacked.
    You've been hacked.
    You've been hacked.
    You've been hacked.
    You've been hacked.
    You've been hacked.
    You've been hacked.
    You've been hacked.`;
    $(mes).appendTo(terminal_div);
    var pv = document.createElement("p");
    pv.innerHTML = `Parce que c'est de là que je viens, et parce qu'il faut toujours mieux un hacker *au* BDA qu'un hacker *contre* le BDA... <br/> 
      A méditer pour ceux qui hésitent encore à voter pour moi ;)`;
    $(pv).appendTo(terminal_div);
    window.open("https://www.hackademint.org/", "_blank").focus();
    ending[1] = true;
    checkEnding();
  }

  var search_form = document.getElementsByClassName("search__form");

  function tKiToi() {
    var homeDiv = document.createElement("div");
    homeDiv.innerHTML = `
    <div class="home_container">
        <h2>Moi c'est Julien !</h2>
        <p>Peut-être m'avez-vous vu glisser ma tête par-ci par-là à divers endroits du foyer depuis le début de l'année, surtout là où on peut trouver soit un ordinateur, soit un instrument de musique... Tout ce qui est clavier, ça me connaît : que ce soit celui du piano désaccordé du Club Zik ou celui de mon PC ! A l’aide de ce dernier, je compte bien tout mettre en œuvre faire rayonner l'esprit panda dans les confins du Dark Web - et du web normal aussi pour commencer ;) -. Voici donc ma candidature au poste de responsable web !</p>
        <div class="close_home" href="">x</div>
    </div>`;
    homeDiv.setAttribute("class", "home");
    document.body.appendChild(homeDiv);

    $(".close_home").click(function () {
      $(".home").remove();
      console.log("Home Erased");
    });
  }

  function p0ur9uo1() {
    var homeDiv = document.createElement("div");
    homeDiv.innerHTML = `
    <div class="home_container">
        <h2>Parce que</h2>
        <p>C’est le rôle parfait pour quelqu’un qui cherche à concilier art et informatique ; et c’est mon cas ! En voyant le boulot des 2A cette année et ce qu’ils sont parvenus à faire, j’ai regretté ne pas avoir passé plus de temps au foyer au premier semestre : postuler BDA semble être la meilleure façon de demander pardon à Boris pour ma discrétion et de rattraper le temps perdu. (Tkt Boris, je te prépare des offrandes javascriptement pandastiques !).</p>
        <div class="close_home" href="">x</div>
    </div>`;
    homeDiv.setAttribute("class", "home");
    document.body.appendChild(homeDiv);

    $(".close_home").click(function () {
      $(".home").remove();
      console.log("Home Erased");
    });
  }

  function css_117() {
    var homeDiv = document.createElement("div");
    homeDiv.innerHTML = `
    <div class="home_container">
        <h2>CSS 117</h2>
        <p>Dans le milieu, on me nomme CSS 117 : agent front-end. Tu veux du React ? J’ai. Du Typescript ? J’ai. Du Javascript sans bug ? J’ai. Du CSS lisible ? J’ai. Et je peux continuer longtemps comme ça. Habile !</p>
        <div class="close_home" href="">x</div>
    </div>`;
    homeDiv.setAttribute("class", "home");
    document.body.appendChild(homeDiv);

    $(".close_home").click(function () {
      $(".home").remove();
      console.log("Home Erased");
    });
  }

  function css_117() {
    var homeDiv = document.createElement("div");
    homeDiv.innerHTML = `
    <div class="home_container">
        <h2>CSS 117</h2>
        <p>Dans le milieu, on me nomme CSS 117 : agent front-end. Tu veux du React ? J’ai. Du Typescript ? J’ai. Du Javascript sans bug ? J’ai. Du CSS lisible ? J’ai. Et je peux continuer longtemps comme ça. Habile !</p>
        <div class="close_home" href="">x</div>
    </div>`;
    homeDiv.setAttribute("class", "home");
    document.body.appendChild(homeDiv);

    $(".close_home").click(function () {
      $(".home").remove();
      console.log("Home Erased");
    });
  }

  function en_bref() {
    var homeDiv = document.createElement("div");
    homeDiv.innerHTML = `
    <div class="home_container">
        <h2>Bref...</h2>
        <p>Pour faire court : je suis hyper motivé à m’investir pour le BDA et la meilleure façon pour moi de le faire, c’est au travers de ce poste de Respo Web ! Alors j’ai hâte de pouvoir faire mes preuves pendant la campagne ! Gloire au Panda !</p>
        <div class="close_home" href="">x</div>
    </div>`;
    homeDiv.setAttribute("class", "home");
    document.body.appendChild(homeDiv);

    $(".close_home").click(function () {
      $(".home").remove();
      console.log("Home Erased");
    });
  }

  function bonus() {
    var homeDiv = document.createElement("div");
    homeDiv.innerHTML = `
    <div class="home_container">
        <h2>Au fait...</h2>
        <p>Pendant que j'y pense, j'ai caché quelques surprises... J'offre une div à la personne qui les trouve toutes ;) <p>
        <div class="close_home" href="">x</div>
    </div>`;
    homeDiv.setAttribute("class", "home");
    document.body.appendChild(homeDiv);

    $(".close_home").click(function () {
      $(".home").remove();
      console.log("Home Erased");
    });
  }

  function ascii_boris() {
    var ascii_panda = `
    ░░░░░░░░▄██▄░░░░░░▄▄░░
    ░░░░░░░▐███▀░░░░░▄███▌
    ░░▄▀░░▄█▀▀░░░░░░░░▀██░
    ░█░░░██░░░░░░░░░░░░░░░
    █▌░░▐██░░▄██▌░░▄▄▄░░░▄
    ██░░▐██▄░▀█▀░░░▀██░░▐▌
    ██▄░▐███▄▄░░▄▄▄░▀▀░▄██
    ▐███▄██████▄░▀░▄█████▌
    ▐████████████▀▀██████░
    ░▐████▀██████░░█████░░
    ░░░▀▀▀░░█████▌░████▀░░
    ░░░░░░░░░▀▀███░▀▀▀░░░░`;

    var panda_div = document.createElement("pre");
    panda_div.innerHTML = ascii_panda;
    var terminal_div = document.getElementsByClassName("terminal");
    $(panda_div).appendTo(terminal_div);
  }

  function merci() {
    var terminal_div = document.getElementsByClassName("terminal");
    var pv = document.createElement("p");
    pv.innerHTML = "Pandamicalement vôtre !";
    pv.setAttribute("class", "terminal__line");
    $(pv).appendTo(terminal_div);
  }

  var navigationLink = $(".terminal__line a");

  navigationLink.click(function (e) {
    if ($(this).hasClass("T_ki_t0i")) {
      tKiToi();
    } else if ($(this).hasClass("p0ur9uo1")) {
      p0ur9uo1();
    } else if ($(this).hasClass("css_117")) {
      css_117();
    } else if ($(this).hasClass("en_bref")) {
      en_bref();
    } else if ($(this).hasClass("bonus")) {
      bonus();
    } else if ($(this).hasClass("ascii_boris")) {
      ascii_boris();
    } else if ($(this).hasClass("merci!")) {
      merci();
    }
  });

  $(search_form).submit(function (event) {
    var binder = $("input").val();
    var terminal_div = document.getElementsByClassName("terminal");
    $(".terminal").addClass("binding");

    var commands = document.createElement("p");
    commands.innerHTML = "Execute: <span class='green'>" + binder + "</span>";
    commands.setAttribute("class", "terminal__line");
    $(commands).appendTo(terminal_div);

    if ("T_ki_t0i" === $("input").val()) {
      tKiToi();
    } else if ("p0ur9uo1" === $("input").val()) {
      p0ur9uo1();
    } else if ("css_117" === $("input").val()) {
      css_117();
    } else if ("en_bref" === $("input").val()) {
      en_bref();
    } else if ("bonus" === $("input").val()) {
      bonus();
    } else if ("ascii_boris" === $("input").val()) {
      ascii_boris();
    } else if ("merci!" === $("input").val() || "merci" === $("input").val()) {
      merci();
    } else if ("pwd" === $("input").val()) {
      pwd(currentDirectory);
    } else if ("cd" === $("input").val().split(" ")[0]) {
      if ($("input").val().split(" ")[1] === "..") {
        cd(currentDirectory, currentDirectory.parent_folder);
      } else {
        cd(currentDirectory, dirList[$("input").val().split(" ")[1]]);
      }
    } else if ("ls" === $("input").val()) {
      ls(currentDirectory, false);
    } else if ("ls -a" === $("input").val() || "ls -la" === $("input").val()) {
      ls(currentDirectory, true);
    } else if ("cat" === $("input").val().split(" ")[0]) {
      cat(currentDirectory, $("input").val().split(" ")[1]);
    } else if ("play" === $("input").val().split(" ")[0]) {
      play(currentDirectory, $("input").val().split(" ")[1]);
    } else if ("pause" === $("input").val().split(" ")[0]) {
      pause();
    } else if (
      "./boris_is_watching_you.sh" === $("input").val() &&
      currentDirectory.name == "/documents"
    ) {
      borisIsWatchingYou();
    } else if (
      "./.hackademint.sh" === $("input").val() &&
      currentDirectory.name == ""
    ) {
      hackademint();
    }

    $("input").val("");

    event.preventDefault();
  });
})(window);
