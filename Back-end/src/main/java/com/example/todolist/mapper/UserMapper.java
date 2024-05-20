package com.example.todolist.mapper;

import com.example.todolist.dtos.UserDto;
import com.example.todolist.entities.UserEntity;
import org.mapstruct.Mapper;
import org.mapstruct.control.MappingControl;
import org.mapstruct.factory.Mappers;

import java.util.List;

@Mapper
public interface UserMapper {
    UserMapper INSTANCE = Mappers.getMapper(UserMapper.class);

    UserDto toUserDto(UserEntity paymentDto);

    List<UserDto> toUserDtos(List<UserEntity>  paymentDto);


    UserEntity toUserEntity(UserDto userDto);

    List<UserEntity> toUserEntityList(List<UserDto> list);

}

