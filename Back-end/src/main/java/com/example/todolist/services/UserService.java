package com.example.todolist.services;

import com.example.todolist.dtos.UserDto;
import com.example.todolist.entities.UserEntity;
import com.example.todolist.mapper.UserMapper;
import com.example.todolist.repositories.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;


@Service
@RequiredArgsConstructor
// haàm xử lý
public class UserService {
    final UserRepository userRepository;

    public UserDto checkLogin(UserDto userLogin){
        List<UserEntity> user = userRepository.getUserByUserName(userLogin.getUsername());

        //mapping
        List<UserDto> userDtos = UserMapper.INSTANCE.toUserDtos(user);

        if(userDtos.size() ==0)
            return null;
        else
            return userDtos.get(0);
    }


    public boolean addUser(UserDto userDto){
        try {
            UserEntity user = UserMapper.INSTANCE.toUserEntity(userDto);
            user.setId(UUID.randomUUID().toString());
            //UserEntity user1 = new UserEntity();
            // user1.setUsername(userDto.getUsername());
            // user1.setPassword(userDto.getPassword());
            userRepository.save(user);

            return true;
        }catch (Exception e){
            return false;
        }
    }
}
