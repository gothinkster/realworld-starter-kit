package com.real.wook.realworld.common.exception;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

@Setter
@Getter
@Builder
@AllArgsConstructor
public class FieldErrorDetail {
    private String field;
    private String code;
    private String message;
}