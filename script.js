
"use strict"

let gameFild = document.querySelector('.gameFild');
let divFather = gameFild.querySelector('.divFather');
let namberNamber = 0;
let noPauser = true;
let timeGame;
let figure;
let figureNext = 'figure';
let matFild;

let fieldWidth;
let fieldHeight;
let blockSize;
let gameSpeed;
let movementSpeed;


let button = document.querySelector('.buttun').addEventListener('click', generation);
generation()
function generation() {
  divFather.innerHTML = '';
  fieldWidth = document.querySelector('.fieldWidth').value;
  fieldHeight = document.querySelector('.fieldHeight').value;
  blockSize = document.querySelector('.blockSize').value;
  gameSpeed = document.querySelector('.gameSpeed').value;
  movementSpeed = document.querySelector('.movementSpeed').value;
  namberNamber = 0;
  matFild = [];
  for (let i = 0; i < fieldHeight; i++) {
    matFild.push([])
    for (let j = 0; j < fieldWidth; j++) {
      matFild[i].push(0)
    }
  }
  gameFild.querySelector('.scoreboard').style.height = 4 * blockSize + 'px';
  gameFild.style.width = matFild[0].length * blockSize + 'px';
  gameFild.style.height = matFild.length * blockSize + 'px';
  noPauser = true;
  gameFild.querySelector('.scoreboard').style.background = '';
  clearInterval(timeGame);
  setTimeout(spaunFigure, 10)
}



const figure0 = {
  mat: [
    [1,],
    [1,],
    [3,],
    [1,],
  ],
  nSum: 4,
  color: '#00BFFF',
};
const figure1 = {
  mat: [
    [0, 0,],
    [1, 3,],
    [0, 1,],
    [0, 1,],
  ],
  nSum: 4,
  color: '#FF00FF',
};
const figure2 = {
  mat: [
    [0, 0,],
    [0, 0,],
    [3, 1,],
    [1, 1,],
  ],
  nSum: 4,
  color: '#D2691E',
};
const figure3 = {
  mat: [
    [0, 0, 0,],
    [0, 0, 0,],
    [1, 3, 1,],
    [0, 1, 0,],
  ],
  nSum: 4,
  color: '#808000',
};
const figure4 = {
  mat: [
    [0, 0, 0,],
    [0, 0, 0,],
    [0, 3, 1,],
    [1, 1, 0,],
  ],
  nSum: 4,
  color: '#FFFF00',
};

gameFild.querySelector('.divFather1').onkeydown = function (event) {
  //document.onkeydown = function (event) {
  if (event.repeat == false && event.code == 'KeyA' && noPauser) {
    upKeyAFather();
  };
  if (event.repeat == false && event.code == 'KeyD' && noPauser) {
    upKeyDFather();
  };
  if (event.repeat == false && event.code == 'KeyS' && noPauser) {
    lowerFather()
  };
  if (event.repeat == false && event.code == 'KeyE' && noPauser) {
    rotateFather();
  };
  if (event.repeat == false && event.code == 'KeyQ' && noPauser) {
    rotateContrFather();

  };
  if (event.repeat == false && event.code == 'KeyR' && noPauser) {
    stapMove();
  };
  // console.log(matFild);
  return false;
};

gameFild.querySelector('.divFather1').onkeyup = function (event) {

  if (event.code == 'KeyS') {
    lowerFather2()
  };
  if (event.code == 'KeyA') {
    upKeyAFather2()
  };
  if (event.code == 'KeyD') {
    upKeyDFather2()
  };
  if (event.code == 'KeyE') {
    rotateFather2();
  };
  if (event.code == 'KeyQ') {
    rotateContrFather2();
  };

  return false;
}

let goLower = 'yes';
function lowerFather() {
  if (goLower == 'yes') {
    lower();
    goLower = setInterval(lower, movementSpeed);
  }
}
function lowerFather2() {
  clearInterval(goLower);
  goLower = 'yes';
}

let goUpKeyA = 'yes';
function upKeyAFather() {
  if (goUpKeyA == 'yes') {
    upKeyA();
    goUpKeyA = setInterval(upKeyA, movementSpeed);
  }
}
function upKeyAFather2() {
  clearInterval(goUpKeyA);
  goUpKeyA = 'yes';
}

let goUpKeyD = 'yes';
function upKeyDFather() {
  if (goUpKeyD == 'yes') {
    upKeyD()
    goUpKeyD = setInterval(upKeyD, movementSpeed);
  }
}
function upKeyDFather2() {
  clearInterval(goUpKeyD);
  goUpKeyD = 'yes';
}

let goRotate = 'yes';
function rotateFather() {
  if (goRotate == 'yes') {
    rotate()
    goRotate = setInterval(rotate, movementSpeed);
  }
}
function rotateFather2() {
  clearInterval(goRotate)
  goRotate = 'yes';
}

let goRotateContr = 'yes';
function rotateContrFather() {
  if (goRotateContr == 'yes') {
    rotateContr()
    goRotateContr = setInterval(rotateContr, movementSpeed);
  }
}
function rotateContrFather2() {
  clearInterval(goRotateContr)
  goRotateContr = 'yes'
}

function rotate() {
  //Находим центр вращения
  let Y;
  let X;
  let matFildPraim_1 = matFild.map((item) => { return item.concat() });

  firstFor: for (let i = 0; i < matFild.length; i++) {
    for (let j = 0; j < matFild[0].length; j++) {
      if (matFild[i][j] == 3) {
        X = j;
        Y = i;
        break firstFor;
      };
    };
  };
  //Создаем matFildMini c разворотом
  const matFildMini = [];
  for (let i = -2; i < 3; i++) {
    matFildMini.push([]);
    for (let j = -2; j < 3; j++) {
      if (matFild[Y + j]) {
        matFildMini[2 + i].push(matFild[Y + j][X - i]);
        if (matFild[Y + j][X - i] == 1 || matFild[Y + j][X - i] == 3) {
          matFild[Y + j][X - i] = 0;
        };
      } else matFildMini[2 + i].push(0);
    };
  };
  let matFildPraim_2 = matFild.map((item) => { return item.concat() });

  //Импортируем matFildMini
  firstFor: for (let i = -2, probe = 1; i < 3; i++) {
    for (let j = -2; j < 3; j++) {
      if (matFildMini[2 + i][2 + j] == 1 || matFildMini[2 + i][2 + j] == 3) {

        //Проверка на свободное пространство
        if (matFild[Y + i][X + j] !== undefined && matFild[Y + i][X + j] !== 2) {
          matFild[Y + i][X + j] = matFildMini[2 + i][2 + j];
        } else {
          i = -2;
          j = -2;
          probe++;
          switch (probe) {
            case 1:
              X++;
              matFild = matFildPraim_2.map((item) => { return item.concat() });
              break;
            case 2:
              X++;
              matFild = matFildPraim_2.map((item) => { return item.concat() });
              break;
            case 3:
              X += - probe + 1;
              matFild = matFildPraim_2.map((item) => { return item.concat() });
              break;
            case 4:
              X--;
              matFild = matFildPraim_2.map((item) => { return item.concat() });
              break;
            case 5:
              matFild = matFildPraim_1.map((item) => { return item.concat() });
              break firstFor;
          };
        };
      };
    };
  };
  vizualMove();
};

function rotateContr() {
  //Находим центр вращения
  let Y;
  let X;
  let matFildPraim_1 = matFild.map((item) => { return item.concat() });


  firstFor: for (let i = 0; i < matFild.length; i++) {
    for (let j = 0; j < matFild[0].length; j++) {
      if (matFild[i][j] == 3) {
        X = j;
        Y = i;
        break firstFor;
      };
    };
  };

  //Создаем matFildMini c разворотом
  const matFildMini = [];
  for (let i = -2; i < 3; i++) {
    matFildMini.push([]);
    for (let j = -2; j < 3; j++) {
      if (matFild[Y - j]) {
        matFildMini[2 + i].push(matFild[Y - j][X + i]);
        if (matFild[Y - j][X + i] == 1 || matFild[Y - j][X + i] == 3) {
          matFild[Y - j][X + i] = 0;
        };
      } else matFildMini[2 + i].push(0);

    };
  };

  let matFildPraim_2 = matFild.map((item) => { return item.concat() });

  //Импортируем matFildMini
  firstFor: for (let i = -2, probe = 1; i < 3; i++) {
    for (let j = -2; j < 3; j++) {
      if (matFildMini[2 + i][2 + j] == 1 || matFildMini[2 + i][2 + j] == 3) {

        //Проверка на свободное пространство
        if (matFild[Y + i] == undefined) {
          matFild = matFildPraim_1.map((item) => { return item.concat() });
          break firstFor;
        }

        if (matFild[Y + i][X + j] !== undefined && matFild[Y + i][X + j] !== 2) {

          matFild[Y + i][X + j] = matFildMini[2 + i][2 + j];
        } else {
          i = -2;
          j = -2;
          probe++;
          switch (probe) {
            case 1:
              X--;
              matFild = matFildPraim_2.map((item) => { return item.concat() });
              break;
            case 2:
              X--;
              matFild = matFildPraim_2.map((item) => { return item.concat() });
              break;
            case 3:
              X += probe - 1;
              matFild = matFildPraim_2.map((item) => { return item.concat() });
              break;
            case 4:
              X++;
              matFild = matFildPraim_2.map((item) => { return item.concat() });
              break;
            case 5:
              matFild = matFildPraim_1.map((item) => { return item.concat() });
              break firstFor;
          };
        };
      };
    };
  };
  //console.log(matFild)
  vizualMove();
};

function vizualBias(row) {

  let rowBias = divFather.querySelectorAll(String('.row' + (row - 1)));
  rowBias.forEach((item) => {
    item.classList.add(`row${row}`);
    item.classList.remove(`row${row - 1}`);
  });
  setTimeout(Bias, 1300);
  function Bias() {
    rowBias.forEach((item) => {
      item.style.top = 0 + blockSize * row + 'px';
    });
  }
};

function vizualDelite(row) {
  let rowDelite = divFather.querySelectorAll(String('.row' + row));

  rowDelite.forEach((item) => {
    item.textContent = '';
    item.style.transition = 1300 + 'ms ease-in';
    item.style.opacity = 0;
    item.style.transform = 'scale(0, 0)';
    item.classList.remove(`row${row}`);
  });

  setTimeout(Delite, 1400);
  function Delite() {
    rowDelite.forEach((item) => item.remove());
  };
};

function upKeyD() {
  //Проверка на свободное пространство справа   
  let check = true;
  firstFor: for (let i = matFild.length - 1; i >= 3; i--) {
    for (let j = matFild[0].length - 1; j >= 0; j--) {
      if ((matFild[i][j] == 1 || matFild[i][j] == 3)
        && (matFild[i][j + 1] === undefined || matFild[i][j + 1] == 2)
        && (matFild[i][j + 1] != 0 && matFild[i][j + 1] != 1)) {
        check = false; break firstFor;
      };
    };
  };
  //Перемещение
  if (check) {
    for (let i = matFild.length - 1; i >= 0; i--) {
      for (let j = matFild[0].length - 1; j >= 0; j--) {
        if (matFild[i][j] == 3) {
          matFild[i][j] = 0;
          matFild[i][j + 1] = 3;
        };
        if (matFild[i][j] == 1 || matFild[i][j] == 3) {
          matFild[i][j] = 0;
          matFild[i][j + 1] = 1;
        };
      };
    };

  };
  vizualMove();
};

function upKeyA() {
  //Проверка на свободное пространство слева
  let check = true;
  firstFor: for (let i = 3; i < matFild.length; i++) {
    for (let j = 0; j < matFild[0].length; j++) {
      if ((matFild[i][j] == 1 || matFild[i][j] == 3)
        && ((matFild[i][j - 1] === undefined || matFild[i][j - 1] == 2)
          && (matFild[i][j - 1] != 0 && matFild[i][j - 1] != 1))
      ) {
        check = false; break firstFor;
      };
    };
  };
  //Перемещение
  if (check) {
    for (let i = 0; i < matFild.length; i++) {
      for (let j = 0; j < matFild[0].length; j++) {
        if (matFild[i][j] == 3) {
          matFild[i][j] = 0;
          matFild[i][j - 1] = 3;
        };
        if (matFild[i][j] == 1) {
          matFild[i][j] = 0;
          matFild[i][j - 1] = 1;
        };
      };
    };
  };

  vizualMove();
};

//spaunFigure();
function spaunFigure() {

  // Проверка на проигрыш
  let check = true;
  for (let i = 0; i < matFild[0].length; i++) {
    if (matFild[3][i] == 2) {
      check = false; break;
    }
  }
  if (check) {
    //0 до 4
    let numberNext = Math.floor(Math.random() * 5);
    let number = numberNext;
    const z1 = matFild[0].length;
    if (figureNext !== 'figure') {
      figure = figureNext;
    } else {
      figure = (number == 0) ? Object.assign({}, figure0) :
        (number == 1) ? Object.assign({}, figure1) :
          (number == 2) ? Object.assign({}, figure2) :
            (number == 3) ? Object.assign({}, figure3) :
              Object.assign({}, figure4);
    }
    figureNext = (number == 0) ? Object.assign({}, figure0) :
      (number == 1) ? Object.assign({}, figure1) :
        (number == 2) ? Object.assign({}, figure2) :
          (number == 3) ? Object.assign({}, figure3) :
            Object.assign({}, figure4);

    //Генерируем фигуру
    for (let i = 0; i < figure.mat.length; i++) {
      for (let j = 0; j < figure.mat[0].length; j++) {
        if (figure.mat[i][j] == 1 || figure.mat[i][j] == 3) {
          matFild[i][Math.ceil(z1 / 2 - 1) + j] = figure.mat[i][j];
        }
      }
    }

    vizualSpaun();
    vizualSpaunMini()
  } else {
    //Блокировка движения
    clearInterval(timeGame);
    gameOver()
  };

};

function vizualSpaunMini() {
  let mini = gameFild.querySelector('.mini');
  mini.querySelectorAll('.blockeMini').forEach((item) => item.remove());
  for (let i = 0; i < figureNext.mat.length; i++) {
    for (let j = 0; j < figureNext.mat[0].length; j++) {
      if (figureNext.mat[i][j] == 1 || figureNext.mat[i][j] == 3) {
        const block = document.createElement('div');
        block.classList.add('blockeMini');
        block.style.background = figureNext.color;
        block.style.left = 0 + 20 * j + 'px';
        block.style.top = 0 + 20 * i + 'px';
        mini.append(block);
      };
    };
  };
};
function gameOver() {
  //Блокировка движения
  noPauser = false;
  clearInterval(timeGame);
  gameFild.querySelector('.scoreboard').style.background = '#800000';
}
function stapMove() {
  noPauser = true;
  timeGame = setInterval(lower, gameSpeed);
};
function deleteRow() {
  let checkCheck = true;
  for (let i = matFild.length - 1, checkPauser = true; i >= 2; i--) {
    //Проверка на укомплектованность ряда
    for (let j = matFild[0].length - 1; j >= 0; j--) {
      if (matFild[i][j] == 0) {
        checkCheck = false;
        checkPauser
        break;
      };
    }
    if (checkCheck) {

      if (checkPauser) {
        //блокировка управления
        noPauser = false;
        //Блокировка движения
        clearInterval(timeGame);
        //Разблоктровка 
        setTimeout(stapMove, 1300);
        checkPauser = false
      }
      //Удаление div
      vizualDelite(i);
      //Удаление и сдвиг ряда в массиве
      for (let ii = i; ii >= 1; ii--) {
        for (let j = matFild[0].length - 1; j >= 0; j--) {
          matFild[ii][j] = matFild[ii - 1][j];
          matFild[ii - 1][j] = 0;
        };
        // Смещение div
        vizualBias(ii);
      };
      i++;
    };
    checkCheck = true;
  };
};

function lower() {
  let check = true;
  //Проверка на свободное пространство с низу  
  firstFor: for (let i = 0; i < matFild.length; i++) {
    for (let j = 0; j < matFild[0].length; j++) {
      if ((matFild[i][j] == 1 || matFild[i][j] == 3)
        && (matFild[i + 1] == undefined || (matFild[i + 1][j] == 2))) {
        check = false;
        break firstFor;
      };
    };
  };

  //Опуск еденичек
  if (check) {
    for (let i = matFild.length - 1; i >= 0; i--) {
      for (let j = matFild[0].length - 1; j >= 0; j--) {
        if (matFild[i][j] == 3) {
          matFild[i][j] = 0;
          matFild[i + 1][j] = 3;
        }
        if (matFild[i][j] == 1) {
          matFild[i][j] = 0;
          matFild[i + 1][j] = 1;
        };
      };
    };

    vizualMove()
  } else {
    // Сброс движения
    lowerFather2()
    upKeyAFather2()
    upKeyDFather2()
    rotateFather2()
    rotateContrFather2()

    //Добавить класс в соответствии с рядом
    const yes = 'yes';
    vizualMove(yes);
    //Резервируем позиции в массиве
    for (let i = matFild.length - 1; i >= 0; i--) {
      for (let j = matFild[0].length - 1; j >= 0; j--) {
        if (matFild[i][j] == 1 || matFild[i][j] == 3) {
          matFild[i][j] = 2;
        };
      };
    };
    // Проверка на уничтожение ряда
    deleteRow()

    //Запускаем новую фигуру
    spaunFigure();
  };
};

function vizualSpaun() {

  for (let i = 0, ID = 1; i < matFild.length; i++) {
    for (let j = 0; j < matFild[0].length; j++) {
      if (matFild[i][j] == 1) {
        const block = document.createElement('div');
        block.classList.add('block');
        block.style.background = figure.color;
        block.style.left = 0 + blockSize * j + 'px';
        block.style.top = 0 + blockSize * i + 'px';
        block.style.width = blockSize + 'px';
        block.style.height = blockSize + 'px';
        block.id = ID;
        ID++;
        block.textContent = fooNamber();
        divFather.append(block);
      };
      if (matFild[i][j] == 3) {
        const block = document.createElement('div');
        block.classList.add('block');
        block.style.background = figure.color;
        block.style.left = 0 + blockSize * j + 'px';
        block.style.top = 0 + blockSize * i + 'px';
        block.style.width = blockSize + 'px';
        block.style.height = blockSize + 'px';
        block.id = 0;
        block.textContent = fooNamber();
        divFather.append(block);
      };
    };
  };
};

function fooNamber() {
  return namberNamber++;
};

function vizualMove(info) {

  for (let i = 0, ID = 1; i < matFild.length; i++) {
    for (let j = 0; j < matFild[0].length; j++) {
      if (matFild[i][j] == 1 || matFild[i][j] == 3) {
        //Заморозка блоков
        if (info == 'yes') {

          if (matFild[i][j] == 1) {
            let block = document.getElementById(String(ID));
            ID++;
            block.classList.add(String('row' + i));
            block.id = '';
          }
          if (matFild[i][j] == 3) {
            let block = document.getElementById(String(0));
            block.classList.add(String('row' + i));
            block.id = '';
          }

          // Передвижение блоков
        } else if (matFild[i][j] == 1) {
          let block = document.getElementById(String(ID));
          ID++;
          block.style.left = 0 + blockSize * j + 'px';
          block.style.top = 0 + blockSize * i + 'px';
        } else {
          let block = document.getElementById(String(0));
          block.style.left = 0 + blockSize * j + 'px';
          block.style.top = 0 + blockSize * i + 'px';
        }
      };
    };
  };
};