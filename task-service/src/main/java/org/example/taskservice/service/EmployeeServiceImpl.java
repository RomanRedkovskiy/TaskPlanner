package org.example.taskservice.service;

import org.example.taskservice.dto.EmployeeDto;
import org.example.taskservice.model.Employee;
import org.example.taskservice.repository.EmployeeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class EmployeeServiceImpl implements EmployeeService {

    private final EmployeeRepository employeeRepository;

    @Autowired
    public EmployeeServiceImpl(EmployeeRepository employeeRepository) {
        this.employeeRepository = employeeRepository;
    }

    @Override
    public List<EmployeeDto> getAllEmployees() {
        //retrieving all employees from db
        //map every employee to employeeDto
        //returning collected List of employeeDto
        return employeeRepository.findAll()
                .stream().map(this::employeeToEmployeeDto).collect(Collectors.toList());
    }

    private EmployeeDto employeeToEmployeeDto(Employee employee) {
        return new EmployeeDto(employee.getId(), employee.getName());
    }
}
