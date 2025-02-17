package com.softwareProject.banksApplication.core.exception;

import com.softwareProject.banksApplication.core.result.Result;
import com.softwareProject.banksApplication.core.result.ResultData;
import com.softwareProject.banksApplication.core.utilies.ResultHelper;
import org.springframework.http.ResponseEntity;
import org.springframework.http.HttpStatus;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

import java.util.List;
import java.util.stream.Collectors;


@ControllerAdvice
public class GlobalExceptionHandler {
    @ExceptionHandler(NotFoundException.class)
    public ResponseEntity<Result> handleNotFoundException(NotFoundException e){
        return new ResponseEntity<>(ResultHelper.NotFoundError(e.getMessage()), HttpStatus.NOT_FOUND);
    }

    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ResponseEntity<ResultData<List<String>>> handleValidationErrors(MethodArgumentNotValidException e){
        List<String> validationErrorList = e.getBindingResult()
                .getFieldErrors()
                .stream()
                .map(FieldError::getDefaultMessage)
                .collect(Collectors.toList());
        return new ResponseEntity<>(ResultHelper.validateError(validationErrorList), HttpStatus.BAD_REQUEST);
    }
    @ExceptionHandler(DataAlreadyExistException.class)
    public ResponseEntity<Result> handleDataAlreadyExistException(DataAlreadyExistException e){
        return new ResponseEntity<>(ResultHelper.error(e.getMessage()), HttpStatus.CONFLICT);
    }

    @ExceptionHandler(NotValidException.class)
    public ResponseEntity<Result> handleNotValidException(NotValidException e){
        return new ResponseEntity<>(ResultHelper.validateError(e.getMessage()), HttpStatus.BAD_REQUEST);
    }
}

