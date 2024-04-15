package org.example.taskservice.rest.controller;

import org.example.taskservice.dto.TaskDto;
import org.example.taskservice.service.TaskService;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/tasks")
public class TaskController {

    private final TaskService taskService;

    public TaskController(TaskService taskService) {
        this.taskService = taskService;
    }

    @GetMapping("/{id}")
    public List<TaskDto> getEmployeeTasks(@PathVariable final Long id) {
        return taskService.getAllTasksByEmployeeId(id);
    }
}
