window.computeUsersStats = (users, progress, courses) => {

    let usersWithStats = users.filter(user =>
        user.role === 'student'
    );

    usersWithStats.map(user => {
        let progressUser = progress[user.id];

        courses.forEach(nameCourse => {

            if (progressUser.hasOwnProperty(nameCourse)) {
                let sumaPercent = 0,
                    totalExercises = 0,
                    completedExercises = 0,
                    totalReads = 0,
                    completedReads = 0,
                    totalQuiz = 0,
                    completedQuiz = 0,
                    totalScoreSum = 0;

                sumaPercent += sumaPercent + progressUser[nameCourse].percent;

                const unitsCourse = Object.values(progressUser[nameCourse].units);

                unitsCourse.forEach(objUnitsCourse => {
                    const partsUnits = Object.values(objUnitsCourse.parts);

                    partsUnits.forEach(part => {
                        if (part.type === 'read') {
                            completedReads += part.completed;
                            totalReads++;
                        }

                        if (part.type === 'practice') {
                            if (part.hasOwnProperty('exercises')) {
                                const exerciseCompleted = Object.values(part.exercises)
                                exerciseCompleted.forEach(exercise => {
                                    completedExercises += exercise.completed;
                                    totalExercises++;
                                })
                            }
                        }

                        if (part.type === 'quiz') {
                            completedQuiz += part.completed;
                            totalQuiz++;
                            if (part.hasOwnProperty('score')) {
                                totalScoreSum += part.score;
                            }
                        }

                    })

                    user.stats = {
                        name: user.name,
                        percent: Math.round(sumaPercent / (courses.length)),
                        exercises: {
                            total: totalExercises,
                            completed: completedExercises,
                            percent: parseInt(((completedExercises * 100) / totalExercises || 0).toFixed()),
                        },
                        reads: {
                            total: totalReads,
                            completed: completedReads,
                            percent: parseInt(((completedReads * 100) / totalReads || 0).toFixed()),
                        },
                        quiz: {
                            total: totalQuiz,
                            completed: completedQuiz,
                            percent: parseInt(((completedQuiz * 100) / totalQuiz || 0).toFixed()),
                            scoreSum: totalScoreSum,
                            scoreAvg: parseInt((totalScoreSum / completedQuiz || 0).toFixed()),
                        }
                    };
                }
                )
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
    // console.log(usersWithStats);
    return usersWithStats;
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
    // const { users, progress } = options.cohortData;
    const studentsStats = computeUsersStats(options.cohortData.users, options.cohortData.progress, courses);
    // students = sortUsers(students, orderBy, orderDirection);
    // search = students = filterUsers(students, search);
    // return students;
    return studentsStats;
};
