-- Create tasks table
CREATE TABLE tasks
(
    id             BIGINT PRIMARY KEY AUTO_INCREMENT,
    name           VARCHAR(50),
    beginDate      DATE,
    endDate        DATE,
    completionDate DATE,
    isCompleted    BOOLEAN,
    employeeId     BIGINT,
    FOREIGN KEY (employeeId) REFERENCES employees (id)
);