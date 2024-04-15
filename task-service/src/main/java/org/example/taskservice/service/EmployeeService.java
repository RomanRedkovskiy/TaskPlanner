package org.example.taskservice.service;

import org.example.taskservice.dto.EmployeeDto;

import java.util.List;

public interface EmployeeService {

    List<EmployeeDto> getAllEmployees();

}
