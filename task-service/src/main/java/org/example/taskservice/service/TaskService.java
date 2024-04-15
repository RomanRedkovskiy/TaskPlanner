package org.example.taskservice.service;

import org.example.taskservice.dto.TaskDto;

import java.util.List;

public interface TaskService {

    List<TaskDto> getAllTasksByEmployeeId(Long employeeId);
}
