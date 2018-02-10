package com.btrie.faraday;

import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

@ControllerAdvice
public class GlobalControllerExceptionHandler {
//    @ResponseStatus(HttpStatus.CONFLICT)  // 409
    @ExceptionHandler
    public void handleConflict(Throwable t) {
        // Nothing to do
        System.out.println(t);
    }
}
