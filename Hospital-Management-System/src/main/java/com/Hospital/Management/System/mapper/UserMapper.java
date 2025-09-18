package com.Hospital.Management.System.mapper;

import com.Hospital.Management.System.dto.UserRequestDto;
import com.Hospital.Management.System.dto.UserResponseDto;
import com.Hospital.Management.System.entity.User;

public class UserMapper {
    public static UserResponseDto toDto(User user) {
        return new UserResponseDto(user.getUsername(), user.getPassword(), user.getUserType());
    }

    public static User toEntity(UserRequestDto dto) {
        User user = new User();
        user.setUsername(dto.username());
        user.setPassword(dto.password());
        user.setUserType(dto.userType());
        return user;
    }
}
