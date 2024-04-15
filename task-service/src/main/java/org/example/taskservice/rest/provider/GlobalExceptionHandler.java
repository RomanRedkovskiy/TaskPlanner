package org.example.taskservice.rest.provider;

import jakarta.persistence.EntityNotFoundException;
import org.example.taskservice.util.ExceptionResponse;
import org.example.taskservice.util.exceptions.DatabaseException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

import java.time.LocalDateTime;

@ControllerAdvice
public class GlobalExceptionHandler {

    @ExceptionHandler(EntityNotFoundException.class)
    public ResponseEntity<ExceptionResponse> handleEntityNotFoundException(EntityNotFoundException e) {
        return generateResponseEntity(HttpStatus.NOT_FOUND, e.getMessage());
    }

    @ExceptionHandler(IllegalArgumentException.class)
    public ResponseEntity<ExceptionResponse> handleIllegalArgumentException(IllegalArgumentException e) {
        return generateResponseEntity(HttpStatus.BAD_REQUEST, e.getMessage());

    }

    @ExceptionHandler(DatabaseException.class)
    public ResponseEntity<ExceptionResponse> handleDatabaseException(DatabaseException e) {
        return generateResponseEntity(HttpStatus.INTERNAL_SERVER_ERROR, e.getMessage());
    }

    private ResponseEntity<ExceptionResponse> generateResponseEntity(HttpStatus httpStatus, String message) {
        ExceptionResponse response = new ExceptionResponse(LocalDateTime.now(), message);
        return ResponseEntity.status(httpStatus).body(response);
    }
}
