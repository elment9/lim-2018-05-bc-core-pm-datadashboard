// -----MENU DESPLEGABLE-----
let sideMenu = document.getElementById('side-menu'),
    sideMain = document.getElementById('container-principal');


let openSlideMenu = () => {
    sideMenu.style.width = '250px';
    sideMain.style.marginLeft = '250px';
}

let closeSlideMenu = () => {
    sideMenu.style.width = '0';
    sideMain.style.marginLeft = '0';
}

//------ BOTONES MENU------//
let menuGeneral = document.getElementById('btnShowGeneral');
let menuStudents = document.getElementById('btnShowStudents');
let menuProgress = document.getElementById('btnShowProgress');
let menuSquads = document.getElementById('btnShowSquads');

let selectCampus = document.getElementById('selectCampus');
let selectCohorts = document.getElementById('selectCohorts');
let mainWelcome = document.getElementById('main-welcome');
let mainCampus = document.getElementById('main-campus');


//---------XHR-----//
const getData = (str, url, callback) => {
    const xhr = new XMLHttpRequest();
    xhr.open('GET', url, true);
    xhr.addEventListener('load', event => {
        if (event.target.readyState === 4) {
            if (event.target.status !== 200) {
                return console.error(new Error(`HTTP error: ${event.target.status}`))
            } else {
                const response = JSON.parse(event.target.responseText);
                callback(str, response);
            }
        }
    })
    xhr.send();
}

// //-------COHORTS: Funcion------//
const showCohorts = (id, arrCohorts) => {
    const allCohorts = arrCohorts.filter(element => {
        return element.id.indexOf(id) !== -1;
    });
    
    let contentCohorts = '';

    allCohorts.forEach(cohort => {
        contentCohorts += `<option value=${cohort.id}> ${cohort.id}</option>`;
    })
    selectCohorts.innerHTML = contentCohorts;
}


selectCampus.addEventListener('change', event => {
    const id = event.target.value;
    getData(id, 'https://api.laboratoria.la/cohorts/', showCohorts);
})

// -----GENERAL-----//
const showGeneral = () => {
    console.log('Muestra general');
}

menuGeneral.addEventListener('click', () => {
    mainWelcome.style.display = 'none';
    mainCampus.style.display = 'block';

});

// // -----ESTUDIANTES-----//
// const showStudents = () => {
//     console.log('Aquí alumnas');
// }

// menuStudents.addEventListener('click', showStudents);

// // -----PROGRESO-----//
// const showProgress = () => {
//     console.log('Los cursos van aquí');
// }

// menuProgress.addEventListener('click', showProgress);

// // -----SQUADS-----//
// const showSquads = () => {
//     console.log('Aquí irían los squads');
// }

// menuSquads.addEventListener('click', showSquads);
