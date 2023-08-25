const { Pool } = require('pg');
//require node postgresql to connect to postgresql database

const pool = new Pool ({
  user: 'ouyuritsu',
  passowrd: '123',
  host: 'localhost',
  database: 'bootcampx'
});
//connect to nootcampx database in user ouyuritsu

const cohort = process.argv[2];
const limit = process.argv[3];

pool.query(`
SELECT students.id as student_id, students.name as name, cohorts.name as cohort
FROM students
JOIN cohorts ON cohorts.id = cohort_id
WHERE cohorts.name LIKE '%${cohort}%' 
LIMIT ${limit || 5};
`)
.then(res => {
  res.rows.forEach (user => {
    console.log(`${user.name} has an id of ${user.student_id} and was in the ${user.cohort} cohort`);
  })
  //it comes back as an array (JS object)
})
.catch(err => console.error('query error', err.stack));
//pool.query is a function that accepts an SQL query as a JavaScript string. Using the ` (backtick), we can write a multi line string like this to make our SQL look nicer. The function then returns a promise that contains our result when the query is successful.
