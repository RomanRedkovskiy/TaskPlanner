package org.example.taskservice.service;

import org.example.taskservice.dto.TaskDto;
import org.example.taskservice.model.Task;
import org.example.taskservice.repository.TaskRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class TaskServiceImpl implements TaskService {

    private final TaskRepository taskRepository;

    @Autowired
    public TaskServiceImpl(TaskRepository taskRepository) {
        this.taskRepository = taskRepository;
    }


    @Override
    public List<TaskDto> getAllTasksByEmployeeId(Long employeeId) {
        //retrieving all employee's tasks by his id
        //map every task to taskDto
        //returning collected List of taskDto
        return taskRepository.findAllByEmployeeId(employeeId)
                .stream().map(this::taskToTaskDto).collect(Collectors.toList());
    }

    private TaskDto taskToTaskDto(Task task) {

        return new TaskDto(
                task.getId(),
                task.getName(),
                task.getBeginDate(),
                task.getEndDate(),
                task.getCompletionDate(),
                task.isCompleted()
        );
    }
}
