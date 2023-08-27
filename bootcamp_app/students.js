const { Pool } = require('pg');
//require node postgresql to connect to postgresql database

const pool = new Pool ({
  user: 'ouyuritsu',
  passowrd: '123',
  host: 'localhost',
  database: 'bootcampx'
});
//connect to nootcampx database in user ouyuritsu

// When passing parameters to your queries(from process.argv), you will want to avoid string concatenating parameters into the query text directly. This can (and often does) lead to sql injection vulnerabilities -- need to escape these values

const queryString = `
SELECT students.id as student_id, students.name as name, cohorts.name as cohort
FROM students
JOIN cohorts ON cohorts.id = cohort_id
WHERE cohorts.name LIKE $1
LIMIT $2;
`
//Always use parameterized queries when you have data that comes from an untrusted source
// Each $s in our query is a placeholder that represents where a value should go but can't because it's coming from somewhere else, so it might be malicious.
const cohortName = process.argv[2];
const limit = process.argv[3] || 5;
// Store all potentially malicious values in an array.
const values = [`%${cohortName}%`, limit];

pool.query(queryString, values)
// PostgreSQL receives these two pieces of information separately. It knows that the first part is a safe query that it can run and that the second part is data that may be malicious. It will use the values as data within the query but it will not run the values as part of the query. This protects us from SQL injection.
.then(res => {
  res.rows.forEach (user => {
    console.log(`${user.name} has an id of ${user.student_id} and was in the ${user.cohort} cohort`);
  })
  //it comes back as an array (JS object)
})
.catch(err => console.error('query error', err.stack));
//pool.query is a function that accepts an SQL query as a JavaScript string. Using the ` (backtick), we can write a multi line string like this to make our SQL look nicer. The function then returns a promise that contains our result when the query is successful.
