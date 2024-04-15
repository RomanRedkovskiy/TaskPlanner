package org.example.taskservice.dto;

import lombok.AllArgsConstructor;
import lombok.Data;

import java.time.LocalDate;

@Data
@AllArgsConstructor
public class TaskDto {

    private Long id;

    private String name;

    private LocalDate beginDate;

    private LocalDate endDate;

    private LocalDate completionDate;

    private boolean isCompleted;

}
