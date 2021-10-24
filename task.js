/* Task 2: ???
   Scenario: The organisation wants to know the company name that the number of employee is greater than 50
*/
db.companyDetails.aggregate([
  { $match: { number_of_employees: { $gt: 50 } } },
  {
    $group: {
      _id: { companyName: "$name", number: "$number_of_employees" },
    },
  },
]);

/* Task 3:  match 2 conditions, project 3 fields
   Scenario: founded year is between 2000 and 2005, then project the company name, founded year, description
*/
db.companyDetails.aggregate([
  { $match: { founded_year: { $gt: 2000, $lte: 2005 } } },
  { $project: { _id: 0, name: 1, description: 1, founded_year: 1 } },
]);

/* Task 4: ???
  match the number of employees is gt than 500, group the doc using logical id field, aggregated info for each group
*/
db.companyDetails.aggregate([
  { $match: { number_of_employees: { $gt: 100 } } },
  {
    $group: {
      _id: { companyName: "$name" },
      min_year: { $min: "$founded_year" },
    },
  },
]);

/* Task 5:
   skip in the 3rd stage - relationship
*/
db.companyDetails.aggregate([
  { $match: { category_code: "web" } },
  {
    $group: {
      _id: { founded_year: "$founded_year" },
      avg_employee: { $avg: "$number_of_employees" },
    },
  },
  { $project: { name: 1 } },
]);

/* Task 6:
   Sort in the 3rd stage - the category code of the company is "social", and sort the founded year ASC
*/
db.companyDetails.aggregate([
  { $match: { category_code: "social" } },
  { $skip: 3 },
  { $sort: { founded_year: 1 } },
]);
