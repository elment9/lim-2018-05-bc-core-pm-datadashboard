// -----MENU DESPLEGABLE-----
let sideMenu = document.getElementById('side-menu'),
    sideMain = document.getElementById('main');


let openSlideMenu = () => {
    sideMenu.style.width = '250px';
    sideMain.style.marginLeft = '250px';
}

let closeSlideMenu = () =>{
    sideMenu.style.width = '0';
    sideMain.style.marginLeft = '0';
 }

//------ BOTONES MENU------//
let menuGeneral = document.getElementById('btnShowGeneral');
let menuStudents = document.getElementById('btnShowStudents');
let menuProgress = document.getElementById('btnShowProgress');
let menuSquads = document.getElementById('btnShowSquads');

let selectCampus = document.getElementById('selectCampus');

//---------FETCH-----//
const getData = (string, url, callback) => {
    const xhr = new XMLHttpRequest();
    xhr.open('GET', url, true);
    xhr.addEventListener('load', event => {
        if (event.target.readyState === 4) {
            if (event.target.status === 200) {
                return console.error(new error())
            }
        }

    })
}

//-------CAMPUS------//
// const showCampus = () => {}

selectCampus.addEventListener('click', event => {

});


// -----GENERAL-----//

const showGeneral = () => {
    console.log('Muestra general');
}

menuGeneral.addEventListener('click', showGeneral);

// -----ESTUDIANTES-----//
const showStudents = () => {
    console.log('Aquí alumnas');
}

menuStudents.addEventListener('click', showStudents);

// -----PROGRESO-----//

const showProgress = () => {
    console.log('Los cursos van aquí');
}

menuProgress.addEventListener('click', showProgress);

// -----SQUADS-----//

const showSquads = () => {
    console.log('Aquí irían los squads');
}

menuSquads.addEventListener('click', showSquads);
