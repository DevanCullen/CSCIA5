document.addEventListener('DOMContentLoaded', async () => {
    
    //Fetch Employees and Projects from the database
    const fetchEmployees = async () => {
        const response = await fetch('/api/employees');
        return await response.json();
    };

    const fetchProjects = async () => {
        const response = await fetch('/api/projects');
        return await response.json();
    };

    const employees = await fetchEmployees();
    const projects = await fetchProjects();

    //Populate Employees
    const employeeSection = document.querySelector('#employees');

    employees.forEach(employee => {

        const employeeElement = document.createElement('p');

        employeeElement.textContent = `${employee.name} - ${employee.position} (${employee.department})`;

        employeeSection.appendChild(employeeElement);

    });

    //Populate Projects
    const projectSection = document.querySelector('#projects');
    projects.forEach(project => {

        const projectElement = document.createElement('p');

        projectElement.textContent = `${project.name} - ${project.description} (${project.department})`;

        projectSection.appendChild(projectElement);
    });

    // Populate Select boxes
    const projectSelect = document.querySelector('#projectSelect');
    const employeeSelect = document.querySelector('#employeeSelect');
    
    projects.forEach(project => {

        const option = document.createElement('option');

        option.value = project.name;

        option.textContent = project.name;

        projectSelect.appendChild(option);

    });

    employees.forEach(employee => {

        const option = document.createElement('option');

        option.value = employee.name;

        option.textContent = employee.name;

        employeeSelect.appendChild(option);

    });

    // Assignment function
    document.querySelector('#assignButton').addEventListener('click', async () => {

        const selectedProject = projectSelect.value;

        const selectedEmployees = Array.from(employeeSelect.selectedOptions).map(option => option.value);

        if (!selectedProject || selectedEmployees.length === 0) {
            alert('Please select a project and at least one employee.');
            return;
        }

        // Make the assignment in the database
        const response = await fetch('/api/projects/assign', {

            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },

            body: JSON.stringify({ project: selectedProject, employees: selectedEmployees })
        });

        const result = await response.json();

        // Display the assignment results
        const resultsSection = document.querySelector('#assignmentResults');

        resultsSection.innerHTML = `<h3>Assigned Employees to ${selectedProject}:</h3>`;

        
        result.assignedEmployees.forEach(employee => {

            const resultElement = document.createElement('p');

            resultElement.textContent = `${employee} assigned to ${selectedProject}`;
            
            resultsSection.appendChild(resultElement);
        });
    });
});
