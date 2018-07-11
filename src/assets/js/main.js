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
const menuGeneral = document.getElementById('btnShowGeneral');
const menuStudents = document.getElementById('btnShowStudents');
const menuProgress = document.getElementById('btnShowProgress');
const menuSquads = document.getElementById('btnShowSquads');
const tableStudent = document.getElementById('tableStudent');
let selectCampus = document.getElementById('selectCampus');
let selectCohorts = document.getElementById('selectCohorts');

let mainWelcome = document.getElementById('main-welcome');
let mainCampus = document.getElementById('main-campus');
let mainStudents = document.getElementById('main-students');
let mainProgress = document.getElementById('main-progress');
let mainSquads = document.getElementById('main-squads');

//---------GENERAL DATA--------//
const totalUser = document.getElementById('totalUser');
const totalCourse = document.getElementById('totalCourse');
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

// printData = (users) => {
//     let print = '';
//     print +=
//         `<tr>
//     <th> Nombres </th>
//     <th> General % </th>
//     <th> Ejercicios % </th>
//     <th> Quiz %</th>
//     <th> Score </th>
//     <th> Promedio </th>
//     <th> Lecturas & </th>
//     </tr>`;

//     users.forEach(user => {
//         if (user.role === 'student') {
//             print +=
//                 `<tr>
//             <td id='name'> ${user.name} </td>
//             <td> ${user.stats.percent} </td>
//             <td> ${user.stats.exercises.percent} </td>
//             <td> ${user.stats.quiz.percent} </td>
//             <td> ${user.stats.quiz.scoreSum} </td>
//             <td> ${user.stats.quiz.scoreAvg} </td>
//             <td> ${user.stats.reads.percent} </td>
//             </tr>`;
//         }
//     })
//     return print;
// };

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

//---------FUNCIONES--------//
const showCampus = (id, arrCampus) => {
    const allCampuses = arrCampus.filter(element => {
        return element.id;
    })
    let contentCampus = '';
    allCampuses.forEach(campus => {
        contentCampus += `<option value=${campus.id}> ${campus.name}</option>`;
    })
    selectCampus.innerHTML = contentCampus;
}

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

const cohortSelected = (idCohort, dataCohort) => {
    dataCohort.forEach(objCohort => {
        if (objCohort.id === idCohort) {
            options.cohort = objCohort;
        }
    })
    return options.cohort;
}

const showDetailsGeneral = (id, arrCohorts) => {
    arrCohorts.filter(element => {
        if (element.id === id) {
            let numCourse = Object.keys(element.coursesIndex);
            totalUser.innerHTML = `<h3>${element.usersCount}</h3><p>Usuarixs</p>`;
            totalCourse.innerHTML = `<h3>${numCourse.length}</h3><p>Cursos</p>`;
        }
    })
}

const showProgress = (idCohort, objProgress) => {
    console.log(idCohort, objProgress);
    options.cohortData.progress = objProgress;
    let usersStats = processCohortData(options);
    // tableStudent.innerHTML = printData(users);
    let template = '';
    usersStats.forEach((user) => {
        template += ` <tr>
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

const showUsers = (idCohort, arrUser) => {
    options.cohortData.users = arrUser;
    // console.log(options);
}


//---------EVENTOS--------//
menuGeneral.addEventListener('click', event => {
    event.preventDefault();
    const id = event.target.id;
    console.log(id);
    getData(id, 'https://api.laboratoria.la/campuses/', showCampus);

    mainCampus.style.display = 'block';
    mainWelcome.style.display = 'none';
    mainStudents.style.display = 'none';
    mainProgress.style.display = 'none';
    mainSquads.style.display = 'none';
});

selectCampus.addEventListener('change', event => {
    event.preventDefault();
    const id = event.target.value;
    console.log(id);
    getData(id, 'https://api.laboratoria.la/cohorts/', showCohorts);
})

selectCohorts.addEventListener('change', event => {
    event.preventDefault();
    const id = event.target.value;
    console.log(id);
    getData(id, 'https://api.laboratoria.la/cohorts/', cohortSelected);
    getData(id, 'https://api.laboratoria.la/cohorts/', showDetailsGeneral);
    getData(id, `https://api.laboratoria.la/cohorts/${id}/users`, showUsers);
    getData(id, `https://api.laboratoria.la/cohorts/${id}/progress`, showProgress);

})

// -----ESTUDIANTES-BTN-----//
menuStudents.addEventListener('click', event => {
    mainStudents.style.display = 'block';
    mainCampus.style.display = 'none';
    mainProgress.style.display = 'none';
    mainSquads.style.display = 'none';
    mainWelcome.style.display = 'none';
});


// // -----PROGRESO-----//
// -----PROGRESO-BTN-----//
menuProgress.addEventListener('click', () => {
    mainProgress.style.display = 'block';
    mainCampus.style.display = 'none';
    mainStudents.style.display = 'none';
    mainSquads.style.display = 'none';
    mainWelcome.style.display = 'none';
});

// // -----SQUADS-----//
// -----SQUADS - BTN-----//
menuSquads.addEventListener('click', () => {
    mainSquads.style.display = 'block';
    mainProgress.style.display = 'none';
    mainCampus.style.display = 'none';
    mainStudents.style.display = 'none';
    mainWelcome.style.display = 'none';

});
