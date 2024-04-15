package org.example.taskservice.repository;

import org.example.taskservice.model.Employee;
import org.springframework.data.repository.CrudRepository;
import org.springframework.lang.NonNull;

import java.util.List;


public interface EmployeeRepository extends CrudRepository<Employee, Long> {

    @NonNull
    List<Employee> findAll();
}
