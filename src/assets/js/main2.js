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

/********************************************** Seleccion del DOM************************************************ */
const mainWelcome = document.getElementById('main-welcome');
const mainCampus = document.getElementById('main-campus');
const mainStudents = document.getElementById('main-students');
const mainProgress = document.getElementById('main-progress');
const mainSquads = document.getElementById('main-squads');

const menuGeneral = document.getElementById('btnShowGeneral');
const menuStudents = document.getElementById('btnShowStudents');
const menuProgress = document.getElementById('btnShowProgress');
const menuSquads = document.getElementById('btnShowSquads');

const selectCampus = document.getElementById('selectCampus');
const selectCohorts = document.getElementById('selectCohorts');
const totalUser = document.getElementById('totalUser');
const totalCourse = document.getElementById('totalCourse');

let tableStudent = document.getElementById('tableStudent');
let container = document.getElementById('container');

let options = {
    cohort: null,
    cohortData: {
        users: null,
        progress: null,
    },
    orderBy: 'name',
    orderByDirection: 'ASC',
    search: '',
};
/**************************************************Funciones complementarias********************************** */

//---------XHR--------//
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

/***********************************************Asociando eventos**************************************/

menuGeneral.addEventListener('click', e => {
    e.preventDefault();
    mainCampus.style.display = 'block';
    mainWelcome.style.display = 'none';
    mainStudents.style.display = 'none';
    mainProgress.style.display = 'none';
    mainSquads.style.display = 'none';
})

const showProgress = (str, obj) => {
    // console.log(str);
    // console.log(obj);
    options.cohortData.progress = obj;
    let usersStats = processCohortData(options);
    let template = '';
    template += `
    <tr>
    <td>Nombre</td>
    <td>Porcentaje</td>
    <td>Ejercicio %</td>
    <td>Quiz %</td>
    <td>Quiz Score</td>
    <td>Quiz AVG</td>
    <td>Lecturas %</td>
    </tr>
    `

    usersStats.forEach((user) => {
        template +=
        ` <tr>
            <td id='name'> ${user.name} </td>
            <td> ${user.stats.percent} </td>
            <td> ${user.stats.exercises.percent} </td>
            <td> ${user.stats.quiz.percent} </td>
            <td> ${user.stats.quiz.scoreSum} </td>
            <td> ${user.stats.quiz.scoreAvg} </td>
            <td> ${user.stats.reads.percent} </td>
         </tr>
         `

    });
    container.innerHTML = template;
}

const showUsers = (str, arr) => {
    options.cohortData.users = arr;
    getData(str, `https://api.laboratoria.la/cohorts/${str}/progress`, showProgress);
    // console.log(str);
    // console.log(arr);
}

const showCohorts = (str, arr) => {
    const allCohorts = arr.filter(element => {
        return element.id.startsWith(str);
    });

    allCohorts.forEach(element => {
        selectCohorts.insertAdjacentHTML('beforeend', `<option value=${element.id}>${element.id}</option>`);
    })

    selectCohorts.addEventListener('change', e => {
        allCohorts.forEach(element => {
            if (element.id === e.target.value) {
                options.cohort = element;
                let numCourse = Object.keys(element.coursesIndex);
                totalUser.innerHTML = `<h3>${element.usersCount}</h3><p>Usuarixs</p>`;
                totalCourse.innerHTML = `<h3>${numCourse.length}</h3><p>Cursos</p>`;
            }
        })
        getData(e.target.value, `https://api.laboratoria.la/cohorts/${e.target.value}/users`, showUsers);
    })
}

const showCampus = (str, arr) => {
    // console.log(arr);
    arr.forEach(element => {
        //console.log(element.id);
        //console.log(element.name);
        selectCampus.insertAdjacentHTML('beforeend', `<option id=${element.id} value=${element.id}>${element.name}</option>`);
    });

    selectCampus.addEventListener('change', e => {
        console.log(e.target.value);
        getData(e.target.value, 'https://api.laboratoria.la/cohorts/', showCohorts);
    })

}

getData('', 'https://api.laboratoria.la/campuses/', showCampus);

menuStudents.addEventListener('click', () => {
    mainStudents.style.display = 'block';
    mainCampus.style.display = 'none';
    mainProgress.style.display = 'none';
    mainSquads.style.display = 'none';
    mainWelcome.style.display = 'none';
});

menuProgress.addEventListener('click', () => {
    mainProgress.style.display = 'block';
    mainCampus.style.display = 'none';
    mainStudents.style.display = 'none';
    mainSquads.style.display = 'none';
    mainWelcome.style.display = 'none';
});

menuSquads.addEventListener('click', () => {
    mainSquads.style.display = 'block';
    mainProgress.style.display = 'none';
    mainCampus.style.display = 'none';
    mainStudents.style.display = 'none';
    mainWelcome.style.display = 'none';

});