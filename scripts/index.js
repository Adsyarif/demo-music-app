import data from "./../puns.json" assert { type: "json" };
let start = true;
// select pun attribut
let punAtribut = document.querySelector(".pun");

// select modal atribut
let firstModal = document.getElementsByClassName("pop-up")[0];
let secondModal = document.getElementsByClassName("pop-up")[1];
let thirdModal = document.getElementsByClassName("pop-up")[2];
let modalBackGround = document.getElementById("card-form-modal");

// select themes atribut
let containerToggle = document.getElementById("container-toggle");
let btnDay = document.querySelector("#container-day i");
let btnNight = document.querySelector("#container-night i");
let containerDay = document.getElementById("container-day");
let characterSide = document.getElementById("character-image");
let takeNight = false;

// select input form atribut
let inputForm = document.querySelectorAll(".input");
let userInput = [];

// artist
let artistName = "adrisa";
let isPlay;
let songSelected = "";

// button drum kit
let btnAll = document.getElementsByClassName("key-btn");
let btnTotal = btnAll.length;
let drumKitButton = [];

// game property
let gameStart = false;
let level = 0;
let userClickPattern = [];
let gamePattern = [];

//  user data blue print
class userData {
  constructor(name, email, dateTime, brief) {
    this.name = name;
    this.email = email;
    this.dateTime = dateTime;
    this.brief = brief;
  }
}

// dont overhelm. basicly just change the themes to day
const toggleButtonDay = () => {
  containerToggle.classList.add("themes-toggle-day");
  btnDay.classList.add("sun-config-day");
  btnNight.classList.add("moon-config-day");
  containerDay.classList.add("themes-day-day");
  document.querySelector("body").classList.add("themes-day-body");

  containerToggle.classList.remove("themes-toggle-night");
  btnDay.classList.remove("sun-config-night");
  btnNight.classList.remove("moon-config-night");
  containerDay.classList.remove("themes-day-night");
  document.querySelector("body").classList.remove("themes-night-body");
};

// dont overhelm. basicly just change the themes to night
const toggleButtonNight = () => {
  containerToggle.classList.add("themes-toggle-night");
  btnDay.classList.add("sun-config-night");
  btnNight.classList.add("moon-config-night");
  containerDay.classList.add("themes-day-night");
  document.querySelector("body").classList.add("themes-night-body");

  containerToggle.classList.remove("themes-toggle-day");
  btnDay.classList.remove("sun-config-day");
  btnNight.classList.remove("moon-config-day");
  containerDay.classList.remove("themes-day-day");
  document.querySelector("body").classList.remove("themes-day-body");
};

// remove border icon artist
const removeBorder = () => {
  let musicButton = document.querySelectorAll(".song-list > figure");
  for (let btn = 0; btn < musicButton.length; btn++) {
    musicButton[btn].classList.remove("pressed-music");
  }
};

// border icon artist
const animatedBorder = (artist) => {
  let musicButton = document.querySelectorAll(".song-list > figure");
  for (let btn = 0; btn < musicButton.length; btn++) {
    if (musicButton[btn].classList.length > 0) {
      musicButton[btn].classList.toggle("pressed-music");
    }
  }
  document.getElementById(artist + "-song").classList.toggle("pressed-music");
};

// change pause and play button
const changePauseBtn = () => {
  document.getElementById("pause-button").classList.toggle("fa-play");
  document.getElementById("pause-button").classList.toggle("fa-pause");
};

// change button play to pause
const resetBtnPlay = () => {
  document.getElementById("pause-button").classList.remove("fa-play");
  document.getElementById("pause-button").classList.add("fa-pause");
};

// change themes {
const artisTheme = (artistName, themes, isPlay) => {
  iconArtist(artistName, themes, isPlay);
  coverArtist(artistName);
  resetBtnPlay();
};

// change icon aritst
const iconArtist = (artist, themes, isPlay) => {
  let selectedThemes = isNight(themes);
  let iconPath = `./asset/images/image-music/${artist}-logo-${selectedThemes}.webp`;
  let iconPathSrcSet = `./asset/images/image-music/${artist}-logo-night.webp`;
  document.querySelector(".default-img").setAttribute("src", iconPath);
  document
    .querySelector("picture source")
    .setAttribute("srcset", iconPathSrcSet);
  if (isPlay) {
    document.getElementById("control-button").classList.remove("invisible");
  } else {
    document.getElementById("control-button").classList.add("invisible");
  }
};

// convert true/false to night/day
const isNight = (themes) => {
  if (themes) {
    return "night";
  } else {
    return "day";
  }
};

// select image cover
const coverArtist = (artist) => {
  let imagePath = `./../asset/images/image-theme/${artist}-image.webp`;
  document.querySelector(
    ".side-image-cover"
  ).style.backgroundImage = `url(${imagePath})`;
  characterSide.classList.add("active-song");
};

// select play song
const selectSong = (artist, previouslySong) => {
  if (previouslySong == "") {
    // console.log("No Music Previousely");
  } else {
    previouslySong.pause();
  }
  let path = "./../asset/audio/" + artist + "-themes.mp3";
  let song = new Audio(path);
  return song;
};

// control the music button
const musicPlayer = (songSelected, buttonSelect) => {
  if (buttonSelect == "play") {
    songSelected.play();
    songSelected.volume = 0.2;
  } else if (buttonSelect == "pause") {
    songSelected.pause();
  } else {
    songSelected.pause();
    songSelected.currentTime = 0;
  }
};

// dynamics text music information
const musicInformation = (information) => {
  document.querySelector(".text-music-1").innerHTML = information;
  document.querySelector(".text-music-2").innerHTML = information;
};

// add object user
const setUserInformation = (name, email, dateTime, brief) => {
  const user = new userData(name, email, dateTime, brief);
  return user;
};

// form validation
const checkedInput = (dataUser) => {
  if (inputForm.length == userInput.length) {
    firstModal.classList.add("hidden");
    secondModal.classList.add("active");
    localStorage.setItem(dataUser, "userData");
  } else {
    // thirdModal.classList.add("active");
    if (!dataUser.name) {
      document.getElementById("name").classList.add("pressed");
      setTimeout(() => {
        document.getElementById("name").classList.remove("pressed");
      }, 300);
    }
    if (!dataUser.email) {
      document.getElementById("email").classList.add("pressed");
      setTimeout(() => {
        document.getElementById("email").classList.remove("pressed");
      }, 300);
    }
    if (!dataUser.dateTime) {
      document.getElementById("time").classList.add("pressed");
      setTimeout(() => {
        document.getElementById("time").classList.remove("pressed");
      }, 300);
    }
    if (!dataUser.brief) {
      document.getElementById("brief-meet").classList.add("pressed");
      setTimeout(() => {
        document.getElementById("brief-meet").classList.remove("pressed");
      }, 300);
    }
  }
};

// get array input
const countInput = () => {
  userInput = [];
  for (let i = 0; i < inputForm.length; i++) {
    if (inputForm[i].value != "") {
      userInput.push(inputForm[i].value);
    }
  }
  getClientName(userInput[0]);
  getClientEmail(userInput[1]);
  printDateTime(userInput[2]);
};

// get user email
const getClientEmail = (clientEmail) => {
  document.getElementById("client-email").innerHTML = clientEmail;
};

// get user name
const getClientName = (clientName) => {
  document.getElementById("client-name").innerHTML = clientName;
};

// get user date and time
const printDateTime = (inputDateTime) => {
  let timeAppointment = inputDateTime;

  if (timeAppointment) {
    const [datePart, timePart] = timeAppointment.split("T");
    const date = new Date(datePart);
    const time = timePart.split(":")[0] + ":" + timePart.split(":")[1];
    document.getElementById("current-time").innerHTML = time;
    document.getElementById("current-date").innerHTML = date.toDateString();
  } else {
    console.error("Invalid date-time string.");
  }
};

// generate random pun
const punGenerator = () => {
  let randomNumber = Math.ceil(Math.random() * data.length);
  punAtribut.innerHTML = '"' + data[randomNumber].Pun + '"';
  // console.log(data[randomNumber].Pun);
};

// triger pun
const punOnClick = () => {
  punAtribut.classList.add("animated-pun");
  setTimeout(() => {
    punAtribut.classList.remove("animated-pun");
  }, 600);
};

// drum kit
const makeSound = (key, start) => {
  if (start) {
    switch (key) {
      case "w":
        let tom1 = new Audio("./../asset/audio/sound-drum-kit/tom-1.mp3");
        tom1.play();
        tom1.volume = 0.3;
        break;
      case "a":
        let tom2 = new Audio("./../asset/audio/sound-drum-kit/tom-2.mp3");
        tom2.play();
        tom2.volume = 0.3;
        break;
      case "d":
        let tom3 = new Audio("./../asset/audio/sound-drum-kit/tom-3.mp3");
        tom3.play();
        tom3.volume = 0.3;
        break;

      case "i":
        let crash = new Audio("./../asset/audio/sound-drum-kit/crash.mp3");
        crash.play();
        crash.volume = 0.3;
        break;
      case "j":
        let snare = new Audio("./../asset/audio/sound-drum-kit/snare.mp3");
        snare.play();
        snare.volume = 0.3;
        break;
      case " ":
        let kick = new Audio("./../asset/audio/sound-drum-kit/kick-bass.mp3");
        kick.play();
        kick.volume = 0.3;
        break;

      case "space":
        let kickClick = new Audio(
          "./../asset/audio/sound-drum-kit/kick-bass.mp3"
        );
        kickClick.play();
        kickClick.volume = 0.5;
        break;
      case "wrong":
        let wrong = new Audio("./../asset/audio/sound-drum-kit/wrong.mp3");
        wrong.play();
        wrong.volume = 0.2;
      default:
      // console.log(key);
    }
  }
};

const factorKey = (key) => {
  switch (key) {
    case "w":
      let wButton = document.querySelector(".w");
      timeOut(wButton);
      break;
    case "a":
      let aButton = document.querySelector(".a");
      timeOut(aButton);
      break;
    case "d":
      let dButton = document.querySelector(".d");
      timeOut(dButton);
      break;

    case "i":
      let iButton = document.querySelector(".i");
      timeOut(iButton);
      break;
    case "j":
      let jButton = document.querySelector(".j");
      timeOut(jButton);
      break;
    case " ":
      let spaceButton = document.querySelector(".space");
      timeOut(spaceButton);

      break;

    case "space":
      let spaceClick = document.querySelector(".space");
      timeOut(spaceClick);

      break;

    default:
    // console.log(key);
  }
};

const timeOut = (activeButton) => {
  activeButton.classList.add("pressed");
  setTimeout(function () {
    activeButton.classList.remove("pressed");
  }, 300);
};

// add animation to pressed drumkit key
function buttonAnimation(currentKey, start) {
  if (start) {
    factorKey(currentKey);
  }
}

// switch to start the minigames
document.getElementById("game-indicator").addEventListener("click", () => {
  if (!gameStart) {
    document.getElementById("game-indicator").innerHTML = "Level " + level;
    gameStart = true;
    nextSequence(gameStart);
  }
});

// game pattern
const nextSequence = (gameStart) => {
  gameStart = true;
  userClickPattern = [];
  level++;
  document.getElementById("game-indicator").innerHTML = `Level ${level}`;
  let randomNumber = Math.floor(Math.random() * 6);
  let chooseDrumKit = drumKitButton[randomNumber];
  gamePattern.push(chooseDrumKit);
  let drumSelected = document.querySelector("." + chooseDrumKit);

  drumSelected.classList.add("pressed");
  setTimeout(() => {
    drumSelected.classList.remove("pressed");
  }, 500);
  makeSound(chooseDrumKit, gameStart);
};

// game checker solution
const checkAnswer = (currentLevel, gameStart) => {
  if (gameStart) {
    if (gamePattern[currentLevel] === userClickPattern[currentLevel]) {
      // console.log("success");

      if (userClickPattern.length === gamePattern.length) {
        setTimeout(() => {
          nextSequence();
        }, 1000);
      }
    } else {
      // console.log("wrong");
      makeSound("wrong", gameStart);

      document.body.classList.add("game-over");
      setTimeout(() => {
        document.body.classList.remove("game-over");
      }, 200);

      document.getElementById("game-indicator").innerHTML =
        "Game Over, Press here to restart";

      startOver();
    }
  }
};

// end the game over
const startOver = () => {
  gameStart = false;
  level = 0;
  gamePattern = [];
};

// drumkit interactive by click
for (let btn = 0; btn < btnTotal; btn++) {
  let buttonKey = btnAll[btn].innerHTML;
  drumKitButton.push(buttonKey);
  btnAll[btn].addEventListener("click", function () {
    let btnPress = this.innerHTML;
    makeSound(btnPress, start);
  });
}

// drumkit interactive by keyboard
addEventListener("keydown", function (e) {
  makeSound(e.key, start);
  buttonAnimation(e.key, start);

  userClickPattern.push(e.key);

  makeSound(e.key, gameStart);
  checkAnswer(userClickPattern.length - 1, gameStart);
});

// mini games user choose
let buttonsKey = document.querySelectorAll(".key-btn");
buttonsKey.forEach((buttonKey) => {
  buttonKey.addEventListener("click", function () {
    let userChosenPart = this.innerHTML;
    userClickPattern.push(userChosenPart);
    // console.log(userClickPattern);
    makeSound(userChosenPart, gameStart);
    checkAnswer(userClickPattern.length - 1, gameStart);
  });
});

// my skill effect ==== DEPRECATED: TO NOISY lol
// document
//   .getElementById("my-skills-content")
//   .addEventListener("mouseover", () => {
//     const corporateLaugh = new Audio("./../asset/audio/corporate-laugh.mp3");
//     corporateLaugh.play();
//   });

// makes real time day counter
const timeElapsed = Date.now();
const todayDate = new Date(timeElapsed);
document.getElementById("today").innerHTML = todayDate.toDateString();

// event pop up form
document.getElementById("modal-btn").addEventListener("click", () => {
  start = false;
  firstModal.classList.remove("hidden");
  firstModal.classList.add("active");
  modalBackGround.classList.add("block-content");
});

// event submit form button
document.getElementById("submit").addEventListener("click", () => {
  start = false;
  countInput();
  let dataUser = setUserInformation(
    userInput[0],
    userInput[1],
    userInput[2],
    userInput[3]
  );
  checkedInput(dataUser);
});

// close form button
document.getElementById("close-btn").addEventListener("click", () => {
  start = true;
  firstModal.classList.remove("active");
  modalBackGround.classList.remove("block-content");
});

// failed event popup submit form button ==== DEPRECATED: TL Feedback -> Not good for U
// document.getElementById("dismiss-failed").addEventListener("click", () => {
//   thirdModal.classList.remove("active");
// });

// success event popup submit form button
document.getElementById("dismiss-popup").addEventListener("click", () => {
  start = true;
  secondModal.classList.remove("active");
  modalBackGround.classList.remove("block-content");
});

// pun generator
punAtribut.addEventListener("click", () => {
  punGenerator();
  punOnClick();
});

// day themes button
document.getElementById("button-themes-day").addEventListener("click", () => {
  toggleButtonDay();
  takeNight = false;
  iconArtist(artistName, takeNight, isPlay);

  if (takeNight) {
    localStorage.setItem("darkMode", "on");
  } else {
    localStorage.setItem("darkMode", "off");
  }
});

// night themes button
document.getElementById("button-themes-night").addEventListener("click", () => {
  toggleButtonNight();
  takeNight = true;
  iconArtist(artistName, takeNight, isPlay);

  // set the darkMode to local storage with value "on" or "off"
  if (takeNight) {
    localStorage.setItem("darkMode", "on");
  } else {
    localStorage.setItem("darkMode", "off");
  }
});

// declaration getter darkMode
// output "on" or "off"
const darkMode = localStorage.getItem("darkMode");

// execute and describe what happen is "on" or "off"
if (darkMode === "on") {
  toggleButtonNight();
  takeNight = true;
  iconArtist(artistName, takeNight, isPlay);
} else {
  toggleButtonDay();
  takeNight = false;
  iconArtist(artistName, takeNight, isPlay);
}

// agito themesD
document.getElementById("agito-song").addEventListener("click", () => {
  artistName = "agito";
  isPlay = true;
  songSelected = selectSong(artistName, songSelected);
  artisTheme(artistName, takeNight, isPlay);
  animatedBorder(artistName);
  musicPlayer(songSelected, "play");
  musicInformation("Believe Youself");
});

// muse themes
document.getElementById("muse-song").addEventListener("click", () => {
  artistName = "muse";
  isPlay = true;
  songSelected = selectSong(artistName, songSelected);
  artisTheme(artistName, takeNight, isPlay);
  animatedBorder(artistName);
  musicPlayer(songSelected, "play");
  musicInformation("S.Masive Black Hole");
});

// blackpink themes
document.getElementById("blackpink-song").addEventListener("click", () => {
  artistName = "blackpink";
  isPlay = true;
  songSelected = selectSong(artistName, songSelected);
  artisTheme(artistName, takeNight, isPlay);
  animatedBorder(artistName);
  musicPlayer(songSelected, "play");
  musicInformation("How You Like That");
});

// eminem themes
document.getElementById("eminem-song").addEventListener("click", () => {
  artistName = "eminem";
  isPlay = true;
  songSelected = selectSong(artistName, songSelected);
  artisTheme(artistName, takeNight, isPlay);
  animatedBorder(artistName);
  musicPlayer(songSelected, "play");
  musicInformation("ft Rihana - Monster");
});

// click close music button
document.getElementById("close-music").addEventListener("click", () => {
  isPlay = false;
  characterSide.classList.remove("active-song");
  artistName = "adrisa";
  iconArtist(artistName, takeNight, isPlay);
  musicPlayer(songSelected, "stop");
  removeBorder();
  musicInformation("Press logo to play");
});
// click pause and play button
document.getElementById("pause-button").addEventListener("click", () => {
  changePauseBtn();
  let pauseBtn = document.getElementById("pause-button").classList;
  if (pauseBtn[1] == "fa-play") {
    musicPlayer(songSelected, "pause");
  } else {
    musicPlayer(songSelected, "play");
  }
});

// click stop button
document.getElementById("stop-button").addEventListener("click", () => {
  document.getElementById("pause-button").classList.add("fa-play");
  document.getElementById("pause-button").classList.remove("fa-pause");
  musicPlayer(songSelected, "stop");
});
