package com.example.todolist.controllers;


import com.example.todolist.dtos.ResponseDto;
import com.example.todolist.dtos.UserDto;
import com.example.todolist.services.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping(path = "/api/v1/user")
@RequiredArgsConstructor
public class UserController {

    private final UserService userService;


    @PostMapping("/checkUserLogin")
    private ResponseEntity<?> checkUserLogin(@RequestBody UserDto userLogin) {
        try {
            var result = userService.checkLogin(userLogin);
            return ResponseEntity.ok(new ResponseDto(List.of("get success"), HttpStatus.OK.value(), result));
        } catch (Exception e) {
            return ResponseEntity.ok(new ResponseDto(List.of(e.getMessage()), HttpStatus.INTERNAL_SERVER_ERROR.value(), null));
        }
    }

    @PostMapping("getalll")
    private ResponseEntity<?> checkUserLogin() {
        try {
            return ResponseEntity.ok(new ResponseDto(List.of("get success"), HttpStatus.OK.value(), "cai gi vvvvvv"));
        } catch (Exception e) {
            return ResponseEntity.ok(new ResponseDto(List.of(e.getMessage()), HttpStatus.INTERNAL_SERVER_ERROR.value(), null));
        }
    }

    @PostMapping("createUser")
    private ResponseEntity<?> addUser(@RequestBody UserDto userDto){
        try {
            boolean rs = userService.addUser(userDto);
            return ResponseEntity.ok(new ResponseDto(List.of("get success"), HttpStatus.OK.value(), rs));
        } catch (Exception e) {
            return ResponseEntity.ok(new ResponseDto(List.of(e.getMessage()), HttpStatus.INTERNAL_SERVER_ERROR.value(), null));
        }
    }
}
