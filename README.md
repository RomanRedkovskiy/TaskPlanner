# TaskPlanner  

## To run application:
### task-service:
`mvn clean package` for task-service    
`java -jar task-service-0.0.1-SNAPSHOT.jar`  

#### Environment variables:  
`TASK_SERVICE_PORT` -> server port specification for task-service (`8080` by default)    
`MYSQL_HOST` -> host for MySQL server (`localhost` by default)  
`DB_PORT` -> post for MySQL server (`3306` by default)  
`DB_USERNAME` -> username for MySQL user (e.g. `root`)  
`DB_PASS` -> password for MySQL user (e.g. `root`)   
`TASK_DB_NAME` -> database name (Flyway will create database automatically, but you must specify database name anyway, e.g. `planner_tasks_db`)   

`application.yml` file also has `migration.path` value, which is a reference for Flyway migrations.    
You can see all initial migrations in resources/db/migration.    

### front-end:  
Install Node.js: Visit the official Node.js [website](https://nodejs.org) and download the appropriate installer for your operating system.  
`npm install`.  
`npm start`.  

#### Environment variables:  
On the root level of module there's a `config.js` file.  
Change `apiUrl` value considering user-service's port.  

## Application description:  
### Stack:    
- #### Java for task-service.  
- #### React for front-end component.  
- #### MySQL 8.0.36 for employees and tasks data storage.  

### Application capabilities:  
Choose employee and date range to retrieve:  
- Inforamtion table of every employee's task in chosen range (including begin date, end date, completion date and has it been completed yet).  
- Graphical table of every employee's task in chosen range (blue cells indicate that the task is active in this day).  

