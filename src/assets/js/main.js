// -----MENU DESPLEGABLE-----
let sideMenu = document.getElementById('side-menu'),
    sideMain = document.getElementById('main');


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

//---------FETCH-----//
const getData = (str, url, callback) => {
    const xhr = new XMLHttpRequest();
    xhr.open('GET', url, true);
    xhr.addEventListener('load', event => {
        console.log(event.target);
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

//-------CAMPUS: Funcion------//
const showCampus = (idCampus, arrCampuses) => {
    const allCampus = arrCampuses.filter(campus => {
        return campus.id = idCampus;
    })
    console.log(idCampus);
    let contentCampus = '';
    allCampus.forEach(campus => {
        contentCampus += `<option value=${campus.id}> ${campus.name}</option>`;
        selectCampus.innerHTML = contentCampus;
    });
}
//-------CAMPUS: Evento------//
selectCampus.addEventListener('click', event => {
    const idCampus = event.target.id;
    getData(idCampus, 'https://api.laboratoria.la/campuses', showCampus);
});

//-------CAMPUS: Funcion------//
const showCohorts = (idCohorts, arrCohorts) => {
    const allCohorts = arrCohorts.filter(cohorts => {
        return cohorts.id.indexOf(idCohorts) !== -1;
    })
    let contentCohorts = '';
    allCohorts.forEach(element => {
        contentCohorts += `<option value=${cohorts.id}> ${cohorts.id}</option>`;
        selectCohorts.innerHTML = contentCohorts;
    })
}
//-------CAMPUS: Evento------//
selectCohorts.addEventListener('click', event => {
    const idCohorts = event.target.id;
    getData(idCohorts, 'https://api.laboratoria.la/cohorts', showCohorts);
})

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
