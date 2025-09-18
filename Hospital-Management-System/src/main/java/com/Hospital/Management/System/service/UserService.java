package com.Hospital.Management.System.service;

import com.Hospital.Management.System.dto.UserRequestDto;
import com.Hospital.Management.System.dto.UserResponseDto;

import java.util.List;

public interface UserService {
    UserResponseDto createUser(UserRequestDto dto);
    List<UserResponseDto> getAllUsers();
    UserResponseDto getUserById(Long id);
    void deleteUser(Long id);
}