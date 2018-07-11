window.computeUsersStats = (users, progress, courses) => {

    users.forEach(user => {
        let progressUser = progress[user.id];

        if (JSON.stringify(progressUser) === '{}') {
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
                quizzes: {
                    total: 0,
                    completed: 0,
                    percent: 0,
                    scoreSum: 0,
                    scoreAvg: 0,
                }
            };
        }
        else {
            // iniciar contadores
            let percentTotal = 0,
                totalExercises = 0,
                completedExercises = 0,
                percentExercises = 0,
                totalReads = 0,
                completedReads = 0,
                percentReads = 0,
                totalQuiz = 0,
                completedQuiz = 0,
                percentQuiz = 0,
                scoreSum = 0;

            courses.forEach(course => {
                // const progressCourse = progressUser.hasOwnProperty(course);
                if (progressUser.hasOwnProperty(course)) {
                    percentTotal += progressUser[course].percent / (courses.length);
                }

                const unitsCourse = Object.values(progressUser[course].units);
                unitsCourse.forEach(unit => {
                    const partsUnits = Object.values(unit.parts);
                    partsUnits.forEach(part => {
                        //aca recorremos cada parte de cada unidad de cada curso, las partes pueden ser lecturas, quizes, exercise, etc
                        //en este caso si la part.length = 0 quiere decir que NO tiene datos en su interior 
                        //asi que para que los contadores no se aumenten, se les da el valor de cero y se define aqui para asegurar que siempre los porcentajes den al menos cero
                        // if (part.length === 0) {
                        //     totalExercises = 0;
                        //     totalReads = 0;
                        //     totalQuiz = 0;
                        //     percentExercises = 0;
                        //     percentReads = 0;
                        //     percentQuiz = 0;
                        // }

                        if (part.type === 'practice') {
                            totalExercises++;
                        }
                        if (part.type === 'practice'&& part.hasOwnProperty('exercises')) {
                            const exerciseCompleted = Object.values(part.exercises)
                            exerciseCompleted.forEach(exercise => {
                                if (exercise.completed === 1) {
                                    completedExercises++;
                                }
                            })
                        }
                        percentExercises = parseInt(((completedExercises * 100) / totalExercises).toFixed());

                        if (part.type === 'read') {
                            totalReads++;
                        }
                        if (part.type === 'read' && part.completed === 1) {
                            completedReads++;
                        }
                        percentReads = parseInt(((completedReads * 100) / totalReads).toFixed());

                        if (part.type === 'quiz') {
                            totalQuiz++;
                        }
                        if (part.type === 'quiz' && part.completed === 1) {
                            completedQuiz++;
                            scoreSum += part.score;
                        }
                        percentQuiz = parseInt(((completedQuiz * 100) / totalQuiz).toFixed());

                    })
                    return partsUnits;
                })
                //Termina el if
            })
            //Sacar el % fuera del forEach para evitar que recalcule
            scoreAvg = parseInt((scoreSum / completedQuiz).toFixed());

            user.stats = {
                percent: percentTotal,
                exercises: {
                    total: totalExercises,
                    completed: completedExercises,
                    percent: percentExercises,
                },
                reads: {
                    total: totalReads,
                    completed: completedReads,
                    percent: percentReads,
                },
                quizzes: {
                    total: totalQuiz,
                    completed: completedQuiz,
                    percent: percentQuiz,
                    scoreSum: scoreSum,
                    scoreAvg: scoreAvg,
                }
            };
        } //Fin del else    
    })//Termina user forEach
    return users;
};

//   //Creando la funcion sortUsers
window.sortUsers = (users, orderBy, orderDirection) => {
        // let sorted = users;

        // if (orderBy === 'Nombre') {
        //   if (orderDirection === 'ASC') {
        //     sorted = users.sort((a, b) => {
        //       a.name.localeCompare(b.name)
        //     })
        //   }
        //   if (orderDirection === 'DESC') {
        //     sorted = users.sort((a, b) => {
        //       a.name.localeCompare(b.name) * -1
        //     })
        //   }
        // }

        // if (orderBy === 'Porcentaje de completitud total') {
        //   if (orderDirection === 'ASC') {
        //     sorted = users.sort((a, b) => {
        //       a.stats.percent - b.stats.percent
        //     })
        //   }
        //   if (orderDirection === 'DESC') {
        //     sorted = users.sort((a, b) => {
        //       a.stats.percent - b.stats.percent
        //     }).reverse();
        //   }
        // }

        // if (orderBy === 'Porcentaje de Ejercicios completados') {
        //   if (orderDirection === 'ASC') {
        //     sorted = users.sort((a, b) => {
        //       a.stats.exercises.percent - b.stats.exercises.percent
        //     })
        //   }
        //   if (orderDirection === 'DESC') {
        //     sorted = users.sort((a, b) => {
        //       a.stats.exercises.percent - b.stats.exercises.percent
        //     }).reverse();
        //   }
        // }

        // if (orderBy === 'Porcentaje de Quizzes completados') {
        //   if (orderDirection === 'ASC') {
        //     sorted = users.sort((a, b) => {
        //       a.stats.quizzes.percent - b.stats.quizzes.percent
        //     })
        //   }
        //   if (orderDirection === 'DESC') {
        //     sorted = users.sort((a, b) => {
        //       a.stats.quizzes.percent - b.stats.quizzes.percent
        //     }).reverse();
        //   }
        // }

        // if (orderBy === 'Puntuacion Promedio de Quizzes completados') {
        //   if (orderDirection === 'ASC') {
        //     sorted = users.sort((a, b) => {
        //       a.stats.quizzes.scoreAvg - b.stats.quizzes.scoreAvg
        //     })
        //   }
        //   if (orderDirection === 'DESC') {
        //     sorted = users.sort((a, b) => {
        //       a.stats.quizzes.scoreAvg - b.stats.quizzes.scoreAvg
        //     }).reverse();
        //   }
        // }

        // if (orderBy === 'Porcentaje de lecturas completados') {
        //   if (orderDirection === 'ASC') {
        //     sorted = users.sort((a, b) => {
        //       a.stats.reads.percent - b.stats.reads.percent
        //     })
        //   }
        //   if (orderDirection === 'DESC') {
        //     sorted = users.sort((a, b) => {
        //       a.stats.reads.percent - b.stats.reads.percent
        //     }).reverse();
        //   }
        // }
        // return sorted;
};

//   //Creando la funcion filterUsers
window.filterUsers = (users, search) => {
    //     return users.filter(user => {
    //       return user.name.toLowerCase().indexOf(search.toLowerCase()) >= -1
    //     })
};

//   //Creando la funcion processCohortData
window.processCohortData = (options) => {
    const courses = Object.keys(options.cohort.coursesIndex);
    const { users, progress } = options.cohortData;
    computeUsersStats(options.cohortData.users, options.cohortData.progress, courses);
    // students = sortUsers(students, orderBy, orderDirection);
    // search = students = filterUsers(students, search);
    // return students;
};
