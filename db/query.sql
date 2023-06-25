-- View employees by manager
SELECT emp.id, emp.first_name, emp.last_name, mgr.first_name AS manager_first_name, mgr.last_name AS manager_last_name
FROM employee emp
JOIN employee mgr ON emp.manager_id = mgr.id
WHERE mgr.id = <manager_id>;

-- View employees by department
SELECT emp.id, emp.first_name, emp.last_name, dept.name AS department_name
FROM employee emp
JOIN role ON emp.role_id = role.id
JOIN department dept ON role.department_id = dept.id
WHERE dept.id = <department_id>;

