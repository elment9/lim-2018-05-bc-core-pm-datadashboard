// -----MENU DESPLEGABLE-----
let button = document.getElementById('btn-menu'),
    general = document.getElementById('btn-gral'),
    students = document.getElementById('btn-students'),
    btnCourses = document.getElementById('btn-couses'),
    squads = document.getElementById('btn-squads');

const showMenu = () => {
    let menu = document.getElementById('menu');
    if(menu.classList.contains('hidden-menu')){
        // console.log('aquí estoy');
        menu.classList.remove('hidden-menu');
        menu.classList.add('show-menu');
    }
    else{
        // console.log('NO toy');
        menu.classList.remove('show-menu');
        menu.classList.add('hidden-menu');
    }    
}
button.addEventListener('click', showMenu); 

// -----GENERAL-----

const showGeneral = () => {
    console.log('Muestra general');
}

general.addEventListener('click', showGeneral);

// -----ESTUDIANTES-----
const showStudents = () => {
    console.log('Aquí alumnas');
}

students.addEventListener('click', showStudents);

// -----CURSOS-----

const showCourses = () => {
    console.log('Los cursos van aquí');
}

btnCourses.addEventListener('click', showCourses);

// -----SQUADS-----

const showSquads = () => {
    console.log('Aquí irían los squads');
}

squads.addEventListener('click', showSquads);
 
