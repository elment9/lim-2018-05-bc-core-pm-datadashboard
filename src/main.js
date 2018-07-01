const cohortTotal = '../data/cohorts.json',
      usersLima = '../data/cohorts/lim-2018-03-pre-core-pw/users.json',
      progressLima = '../data/cohorts/lim-2018-03-pre-core-pw/progress.json';

const getData = (callback) => {
  fetch(usersLima)
    .then((responseU) => {
      fetch(progressLima)
        .then((responseP) => {
          fetch(cohortTotal)
            .then((responseC) => {
              Promise.all([responseU.json(), responseP.json(), responseC.json()])
                  .then(dataArr => {
                    console.log(dataArr);
                  const [x, y, z] = dataArr;//destructuring de los arrays
                  callback && callback(x, y, z);//llama a la función
                })
            })
        })
    })
 }

const callbackGetData = (users,progress,cohorts) => {
      let cohortsMap = [];//Creo var con arreglo vacío
      cohorts.forEach(cohort => {//Por cada 
        cohortsMap[cohort.id] = cohort;
      });

      // console.log(cohortsMap);
      // console.log(progressUser.length);
      // console.log(users.length);
      let nuevoArray = [];//Nuevo array usuario con todos sus datos
      users.forEach(user => {//Por cada users crear un user y haz la funcion
        // console.log(progress[user.id]);
        let usuario = user;//encierro usuario
        usuario.progress = progress[user.id];//Como usuario es objeto, creo nueva propiedad y asigno valor
        usuario.cohort = cohortsMap[user.signupCohort];//Crea propiedad cohort y mete cohort mapeado y le dice  q busque user.sin 
        
        nuevoArray[user.id]=usuario;//
      });
      console.log(nuevoArray);
} 
getData(callbackGetData) 
 
 
