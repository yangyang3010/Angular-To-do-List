package com.example.todolist.dtos;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@NoArgsConstructor
@AllArgsConstructor
@Data
public class ResponseDto {
    List<String> message;
    int status;
    Object result;
}
