const neo4j = require('neo4j-driver');

//Connects to the Neo4j Aura instance
const driver = neo4j.driver(

    'neo4j+s://36a27bab.databases.neo4j.io:7687',

    neo4j.auth.basic('dv364255@dal.ca', 'Devan2002*')

);

const session = driver.session({ database: 'neo4j' });

//Gets all projects
exports.getProjects = async (req, res) => {

 try {

        const result = await session.run('MATCH (p:Project_113) RETURN p');
        const projects = result.records.map(record => record.get('p').properties);
        res.json(projects);

    } 
    
catch (error) {

        res.status(500).send(error.message);

    }
};

//Gets all employees
exports.getEmployees = async (req, res) => {

try {

        const result = await session.run('MATCH (e:Employee_113) RETURN e');
        const employees = result.records.map(record => record.get('e').properties);
        res.json(employees);

    } 
    
catch (error) {
        res.status(500).send(error.message);
    }
};

//Assigns employees to a project based on their position
exports.assignEmployeesToProject = async (req, res) => {

    const { project, employees } = req.body;
    const assignedEmployees = [];

    try {

    for (const employee of employees) {
           
        const result = await session.run(

                'MATCH (e:Employee_113 {name: $name})-[:WORKS_IN_113]->(d:Department_113), (p:Project_113 {name: $project})-[:BELONGS_TO_113]->(d) ' +
                'CREATE (e)-[:ASSIGNED_TO_113]->(p) RETURN e, p',
                
                { name: employee, project: project }
            );

    if (result.records.length > 0) {
                assignedEmployees.push(employee);
            }
        }

        res.json({
            project: project,
            assignedEmployees: assignedEmployees,
        });

    } 
    
    catch (error) {
        res.status(500).send(error.message);
    }
};

