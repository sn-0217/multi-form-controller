package com.multiform.app.exception;

public class InvalidRequestException extends RuntimeException {
    public InvalidRequestException(String msg){
        super(msg);
    }
}
