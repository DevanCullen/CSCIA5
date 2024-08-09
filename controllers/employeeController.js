const neo4j = require('neo4j-driver');

const driver = neo4j.driver(
    'neo4j+s://36a27bab.databases.neo4j.io:7687',
    neo4j.auth.basic('dv364255@dal.ca', 'Devan2002*')
);
const session = driver.session();

exports.getEmployees = async (req, res) => {
    try {
        const result = await session.run('MATCH (e:Employee_113) RETURN e');
        const employees = result.records.map(record => record.get('e').properties);
        res.json(employees);
    } catch (error) {
        res.status(500).send(error.message);
    }
};
