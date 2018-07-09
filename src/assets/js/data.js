window.computeUsersStats = (users, progress, courses) => {

    // let usersWithStats = users.filter(objUser =>
    //     objUser.role === 'student'
    // );

    users.forEach(user => {
        let idUser = user.id;
        courses.forEach(nameCourse => {
            const progressUser = progress[idUser];
            if (progressUser.hasOwnProperty(nameCourse)) {
                let sumaPercent = 0,
                    countExercises = 0,
                    completedExercises = 0,
                    countReads = 0,
                    completedReads = 0,
                    countQuiz = 0,
                    completedQuiz = 0,
                    countScoreSum = 0;

                sumaPercent += sumaPercent + progressUser[nameCourse].percent;

                const unitsCourse = Object.values(progressUser[nameCourse].units);
                unitsCourse.forEach(objUnitsCourse => {
                    const partsUnits = Object.values(objUnitsCourse.parts);
                    partsUnits.forEach(part => {
                        if (part.type === 'read') {
                            countReads++;
                            if (part.completed === 1) {
                                completedReads++;
                            }
                        }

                        if (part.type === 'practice' && part.hasOwnProperty('exercises')) {
                            let objExercises = Object.keys(part.exercises);
                            countExercises += objExercises.length;
                            completedExercises += part.completed;
                        }

                        if (part.type === 'quiz') {
                            countQuiz++;
                            if (part.completed === 1 && part.hasOwnProperty('score')) {
                                completedQuiz++;
                                countScoreSum += part.score;
                            }
                        }

                    })
                })
                user.stats = {
                    percent: Math.round(sumaPercent / (courses.length)),
                    exercises: {
                        total: countExercises,
                        completed: completedExercises,
                        percent: Math.round((completedExercises * 100) % countExercises),
                    },
                    reads: {
                        total: countReads,
                        completed: completedReads,
                        percent: Math.round((completedReads * 100) / countReads),
                    },
                    quiz: {
                        total: countQuiz,
                        completed: completedQuiz,
                        percent: Math.round((completedQuiz * 100) / countQuiz),
                        scoreSum: countScoreSum,
                        scoreAvg: Math.round(countScoreSum / completedQuiz),
                    }
                };
            }
            else {
                user.stats = {
                    percent: 0,
                    exercises: {
                        total: 0,
                        completed: 0,
                        percent: 0,
                    },
                    reads: {
                        total: 0,
                        completed: 0,
                        percent: 0,
                    },
                    quiz: {
                        total: 0,
                        completed: 0,
                        percent: 0,
                        scoreSum: 0,
                        scoreAvg: 0,
                    }
                };
            }

        });
    })
    console.log(users);
    return users;

};

//   //Creando la funcion sortUsers
window.sortUsers = (users, orderBy, orderDirection) => {
    //     let sorted = users;

    //     if (orderBy === 'Nombre') {
    //       if (orderDirection === 'ASC') {
    //         sorted = users.sort((a, b) => {
    //           a.name.localeCompare(b.name)
    //         })
    //       }
    //       if (orderDirection === 'DESC') {
    //         sorted = users.sort((a, b) => {
    //           a.name.localeCompare(b.name) * -1
    //         })
    //       }
    //     }

    //     if (orderBy === 'Porcentaje de completitud total') {
    //       if (orderDirection === 'ASC') {
    //         sorted = users.sort((a, b) => {
    //           a.stats.percent - b.stats.percent
    //         })
    //       }
    //       if (orderDirection === 'DESC') {
    //         sorted = users.sort((a, b) => {
    //           a.stats.percent - b.stats.percent
    //         }).reverse();
    //       }
    //     }

    //     if (orderBy === 'Porcentaje de Ejercicios completados') {
    //       if (orderDirection === 'ASC') {
    //         sorted = users.sort((a, b) => {
    //           a.stats.exercises.percent - b.stats.exercises.percent
    //         })
    //       }
    //       if (orderDirection === 'DESC') {
    //         sorted = users.sort((a, b) => {
    //           a.stats.exercises.percent - b.stats.exercises.percent
    //         }).reverse();
    //       }
    //     }

    //     if (orderBy === 'Porcentaje de Quizzes completados') {
    //       if (orderDirection === 'ASC') {
    //         sorted = users.sort((a, b) => {
    //           a.stats.quizzes.percent - b.stats.quizzes.percent
    //         })
    //       }
    //       if (orderDirection === 'DESC') {
    //         sorted = users.sort((a, b) => {
    //           a.stats.quizzes.percent - b.stats.quizzes.percent
    //         }).reverse();
    //       }
    //     }

    //     if (orderBy === 'Puntuacion Promedio de Quizzes completados') {
    //       if (orderDirection === 'ASC') {
    //         sorted = users.sort((a, b) => {
    //           a.stats.quizzes.scoreAvg - b.stats.quizzes.scoreAvg
    //         })
    //       }
    //       if (orderDirection === 'DESC') {
    //         sorted = users.sort((a, b) => {
    //           a.stats.quizzes.scoreAvg - b.stats.quizzes.scoreAvg
    //         }).reverse();
    //       }
    //     }

    //     if (orderBy === 'Porcentaje de lecturas completados') {
    //       if (orderDirection === 'ASC') {
    //         sorted = users.sort((a, b) => {
    //           a.stats.reads.percent - b.stats.reads.percent
    //         })
    //       }
    //       if (orderDirection === 'DESC') {
    //         sorted = users.sort((a, b) => {
    //           a.stats.reads.percent - b.stats.reads.percent
    //         }).reverse();
    //       }
    //     }
    //     return sorted;
};

//   //Creando la funcion filterUsers
window.filterUsers = (users, search) => {
    //     return users.filter(user => {
    //       return user.name.toLowerCase().indexOf(search.toLowerCase()) >= -1
    //     })
};

//   //Creando la funcion processCohortData
window.processCohortData = (options) => {
    console.log(options);
    const courses = Object.keys(options.cohort.coursesIndex);
    const { users, progress } = options.cohortData;
    const studentsStats = computeUsersStats(options.cohortData.users, options.cohortData.progress, courses);
    // students = sortUsers(students, orderBy, orderDirection);
    // search = students = filterUsers(students, search);
    // return students;
};
