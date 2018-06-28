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
    const progressUser = Object.keys(progress);
      console.log(progressUser.length);
      console.log(users.length);
      users.forEach(user => {
        console.log(progress[user.id]);
      });
  } 
getData(callbackGetData) 
 
 
