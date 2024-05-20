package com.example.todolist.repositories;

import com.example.todolist.entities.UserEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface UserRepository extends JpaRepository<UserEntity, String> {
    @Query("select u from UserEntity u WHERE u.username = :name")
    List<UserEntity> getUserByUserName(@Param("name") String username);
}
