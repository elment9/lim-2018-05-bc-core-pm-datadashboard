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
let mainStudents = document.getElementById('main-students');
let mainProgress = document.getElementById('main-progress');
let mainSquads = document.getElementById('main-squads');


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

menuGeneral.addEventListener('click', () => {
    mainCampus.style.display = 'block';
    mainWelcome.style.display = 'none';
    mainStudents.style.display = 'none';
    mainProgress.style.display = 'none';
    mainSquads.style.display ='none';

});

// // -----ESTUDIANTES-----//
menuStudents.addEventListener('click', () => {
    mainStudents.style.display = 'block';
    mainCampus.style.display = 'none';
    mainProgress.style.display = 'none';
    mainSquads.style.display ='none';
    mainWelcome.style.display = 'none';
   
});

// // -----PROGRESO-----//
menuProgress.addEventListener('click', () => {
    mainProgress.style.display = 'block';
    mainCampus.style.display = 'none';
    mainStudents.style.display = 'none';
    mainSquads.style.display ='none';
    mainWelcome.style.display = 'none';
});

// // -----SQUADS-----//
menuSquads.addEventListener('click', () => {
    mainSquads.style.display ='block';
    mainProgress.style.display = 'none';
    mainCampus.style.display = 'none';
    mainStudents.style.display = 'none';
    mainWelcome.style.display = 'none';

});
