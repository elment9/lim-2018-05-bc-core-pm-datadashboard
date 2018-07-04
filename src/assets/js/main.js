// -----MENU DESPLEGABLE-----
let sideMenu = document.getElementById('side-menu'),
    sideMain = document.getElementById('main');


let openSlideMenu = () => {
    sideMenu.style.width = '250px';
    sideMain.style.marginLeft = '250px';
}

let closeSlideMenu = () =>{
    sideMenu.style.width = '0';
    sideMenu.style.marginLeft = '0';
 }

// -----GENERAL-----

const showGeneral = () => {
    console.log('Muestra general');
}

menuGeneral.addEventListener('click', showGeneral);

// -----ESTUDIANTES-----
const showStudents = () => {
    console.log('Aquí alumnas');
}

menuStudents.addEventListener('click', showStudents);

// -----CURSOS-----

const showCourses = () => {
    console.log('Los cursos van aquí');
}

menuCourses.addEventListener('click', showCourses);

// -----SQUADS-----

const showSquads = () => {
    console.log('Aquí irían los squads');
}

menuSquads.addEventListener('click', showSquads);
