package com.btrie.jsp;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseStatus;

@ControllerAdvice
public class GlobalControllerExceptionHandler {
//    @ResponseStatus(HttpStatus.CONFLICT)  // 409
    @ExceptionHandler
    public void handleConflict(Throwable t) {
        // Nothing to do
        System.out.println(t);
    }
}
