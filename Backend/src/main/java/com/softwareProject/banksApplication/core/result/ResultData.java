package com.softwareProject.banksApplication.core.result;

import lombok.Getter;

@Getter
public class ResultData<T> extends Result {
    private final T data;

    public ResultData(boolean status, String message, String code, T data){
        super(status, message, code);
        this.data = data;
    }
}
