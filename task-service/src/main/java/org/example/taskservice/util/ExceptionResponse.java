package org.example.taskservice.util;

import lombok.AllArgsConstructor;
import lombok.Data;

import java.time.LocalDateTime;

@Data
@AllArgsConstructor
public class ExceptionResponse {

    private LocalDateTime timestamp;

    private String message;

}
