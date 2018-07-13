describe('data', () => {

  it('debería exponer función computeUsersStats en objeto global', () => {
    assert.isFunction(computeUsersStats);
  });

  it('debería exponer función sortUsers en objeto global', () => {
    assert.isFunction(sortUsers);
  });

  it('debería exponer función filterUsers en objeto global', () => {
    assert.isFunction(filterUsers);
  });

  it('debería exponer función processCohortData en objeto global', () => {
    assert.isFunction(processCohortData);
  });

  describe('computeUsersStats(users, progress, courses)', () => {

    const cohort = fixtures.cohorts.find(item => item.id === 'lim-2018-03-pre-core-pw');
    const courses = Object.keys(cohort.coursesIndex);
    const { users, progress } = fixtures;

    it('debería retornar arreglo de usuarios con propiedad stats', () => {
      const processed = computeUsersStats(users, progress, courses);

      assert.equal(users.length, processed.length);

      processed.forEach(user => {
        assert.ok(user.hasOwnProperty('stats'));
        assert.isNumber(user.stats.percent);
        assert.isObject(user.stats.exercises);
        assert.isObject(user.stats.quizzes);
        assert.isObject(user.stats.reads);
      });
    });

    describe('user.stats para el primer usuario en data de prueba - ver carpeta data/', () => {

      const processed = computeUsersStats(users, progress, courses);

      it(
        'debería tener propiedad percent con valor 53',
        () => assert.equal(processed[0].stats.percent, 53)
      );

      it('debería tener propiedad exercises con valor {total: 2, completed: 0, percent: 0}', () => {
        assert.deepEqual(processed[0].stats.exercises, {
          total: 2,
          completed: 0,
          percent: 0,
        });
      });

      it('debería tener propiedad quizzes con valor {total: 3, completed: 2, percent: 67, scoreSum: 57, scoreAvg: 29}', () => {
        assert.deepEqual(processed[0].stats.quizzes, {
          total: 3,
          completed: 2,
          percent: 67,
          scoreSum: 57,
          scoreAvg: 29,
        });
      });

      it('debería tener propiedad reads con valor {total: 11, completed: 6, percent: 55}', () => {
        assert.deepEqual(processed[0].stats.reads, {
          total: 11,
          completed: 6,
          percent: 55,
        });
      });

    });

  });

  describe('sortUsers(users, orderBy, orderDirection)', () => {
    const users = fixtures.users;

    it('debería retornar arreglo de usuarios ordenado por nombre ASC', () => {
      assert.equal(sortUsers(users, 'name', 'ASC')[0].name, 'adriana vizcarra paitán');
    });

    it('debería retornar arreglo de usuarios ordenado por nombre DESC', () => {
      assert.equal(sortUsers(users, 'name', 'DESC')[0].name, 'Zurisadai Rosas Aramburú');
    });

    it('debería retornar arreglo de usuarios ordenado por porcentaje general ASC', () => {
      assert.equal(sortUsers(users, 'totalComp', 'ASC')[0].stats.percent, 0);
    });

    it('debería retornar arreglo de usuarios ordenado por porcentaje general DESC', () => {
      assert.equal(sortUsers(users, 'totalComp', 'DESC')[0].stats.percent, 100);
    });

    it('debería retornar arreglo de usuarios ordenado por ejercicios completados ASC', () => {
      assert.equal(sortUsers(users, 'excercises', 'ASC')[0].stats.exercises.percent, 0);
    });

    it('debería retornar arreglo de usuarios ordenado por ejercicios completados DESC', () => {
      assert.equal(sortUsers(users, 'excercises', 'DESC')[0].stats.exercises.percent, 100);
    });

    it('debería retornar arreglo de usuarios ordenado por quizzes completados ASC', () => {
      assert.equal(sortUsers(users, 'quizzes', 'ASC')[0].stats.quizzes.percent, 0);
    });

    it('debería retornar arreglo de usuarios ordenado por quizzes completados DESC', () => {
      assert.equal(sortUsers(users, 'quizzes', 'DESC')[0].stats.quizzes.percent, 100);
    });

    it('debería retornar arreglo de usuarios ordenado por score promedio en quizzes completados ASC', () => {
      assert.equal(sortUsers(users, 'quizzesAvg', 'ASC')[0].stats.quizzes.scoreAvg, 0);
    });

    it('debería retornar arreglo de usuarios ordenado por score promedio en quizzes completados DESC', () => {
      assert.equal(sortUsers(users, 'quizzesAvg', 'DESC')[0].stats.quizzes.scoreAvg, 100);
    });

    it('debería retornar arreglo de usuarios ordenado por lecturas (reads) completadas ASC', () => {
      assert.equal(sortUsers(users, 'reads', 'ASC')[0].stats.reads.percent, 0);
    });

    it('debería retornar arreglo de usuarios ordenado por lecturas (reads) completadas DESC', () => {
      assert.equal(sortUsers(users, 'reads', 'DESC')[0].stats.reads.percent, 100);
    });
  });

  describe('filterUsers(users, filterBy)', () => {
    const {users} = fixtures;
    const search = 'Lizeth';
    const filterUser = filterUsers(users, search);

    it('debería retornar nuevo arreglo solo con usuarios con nombres que contengan string (case insensitive)', () => {
      assert.deepEqual(filterUser[0].name, 'Lizeth');
    });
  });

  describe('processCohortData({cohortData, orderBy, orderDirection, filterBy })', () => {
    const cohort = fixtures.cohorts.find(item => item.id === 'lim-2018-03-pre-core-pw');
    const { users, progress } = fixtures;
    let options = {
      cohort: cohort,
      cohortData: {
        users: users,
        progress: progress
      },
      orderBy: 'name',
      orderDirection: 'ASC',
      search: ''
    }

    it('debería retornar arreglo de usuarios con propiedad stats y aplicar sort y filter', () => {
      const processed = processCohortData(options);
      assert.deepEqual(processed[0].name, 'adriana vizcarra paitán');
      options.search = 'zarela';
      assert.deepEqual(processCohortData(options)[0].name, 'Elizabeth Zarela');
      options.orderBy = 'name';
      options.orderDirection = 'DESC';
      assert.deepEqual(processCohortData(options)[0].name, 'Elizabeth Zarela')
    });

  });

});
