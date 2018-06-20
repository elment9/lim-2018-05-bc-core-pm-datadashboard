//Creando el objeto data
window.data = {
};

// variables url json
const cohortTotal = '../data/cohorts.json',
      usersLima = '../data/cohorts/lim-2018-03-pre-core-pw/users.json',
      progressLima = '../data/cohorts/lim-2018-03-pre-core-pw/progress.json';

// seleccionando elementos del html
const sedeCohort = document.getElementById('sede');

//Traer cohorts
fetch(cohortTotal)
  .then(response => response.json())
  .then(jsonCohortLim => {
    const sedes = jsonCohortLim;
    for (let i = 0; i < sedes.length; i++) {
      const optionElements = document.createElement('option');
      const contenidoOption = document.createTextNode(sedes[i].id);
      optionElements.appendChild(contenidoOption);
      console.log(sedes[i].id);
      sedeCohort.appendChild(optionElements);
      sedeCohort.setAttribute('value', sedes[i].id); //Atributo valor a sedes
    }
  })
  .catch((err) => {//Error 404
    console.error(err);
  });

let myFunction = (e) => {

  if (e.target.value === 'lim-2018-03-pre-core-pw') {//e.target = valor que se da cuando cliqueas opcion del selec
    fetch(usersLima)
      .then(response => response.json())
      .then(jsonUsersLima => {
          const studentsLima =jsonUsersLima.filter(function (studentFilter){//Creo una constante studentsLima y coloco json de cohort dentro. Luego uso filter (dentro coloco función). Si cumple esta función haz esto
            if ((studentFilter.signupCohort = 'lim-2018-03-pre-core-pw') && (studentFilter.role = 'student')){//Filtramos de acuerdo a propiedades de lista de users
          const nuevoParrafo = document.createElement('p');//creo elemento p
          nuevoParrafo.innerText = studentFilter.name;
          listStudent.appendChild(nuevoParrafo);
          }
          else {
            return false
          }
          })
    

  })
}
}
sedeCohort.addEventListener('change', myFunction);

