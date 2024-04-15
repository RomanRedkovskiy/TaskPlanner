package org.example.taskservice.repository;

import org.example.taskservice.model.Task;
import org.springframework.data.repository.CrudRepository;

import java.util.List;

public interface TaskRepository extends CrudRepository<Task, Long> {

    List<Task> findAllByEmployeeId(Long employeeId);
}
