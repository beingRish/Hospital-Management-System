package com.Hospital.Management.System.service.impl;

import com.Hospital.Management.System.dto.UserRequestDto;
import com.Hospital.Management.System.dto.UserResponseDto;
import com.Hospital.Management.System.entity.User;
import com.Hospital.Management.System.exception.UserAlreadyExistsException;
import com.Hospital.Management.System.mapper.UserMapper;
import com.Hospital.Management.System.repository.UserRepository;
import com.Hospital.Management.System.service.UserService;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UserServiceImpl implements UserService {

    private final UserRepository userRepository;

    public UserServiceImpl(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @Override
    public UserResponseDto createUser(UserRequestDto dto) {
        if (userRepository.findByUsername(dto.username()).isPresent()) {
            throw new UserAlreadyExistsException("Username already exists: " + dto.username());
        }

        User user = UserMapper.toEntity(dto);
        user.setPassword(new BCryptPasswordEncoder().encode(user.getPassword())); // encrypt
        User savedUser = userRepository.save(user);

        return UserMapper.toDto(savedUser);
    }

    @Override
    public List<UserResponseDto> getAllUsers() {
        return userRepository.findAll()
                .stream()
                .map(UserMapper::toDto)
                .toList();
    }

    @Override
    public UserResponseDto getUserById(Long id) {
        User user = userRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("User not found"));
        return UserMapper.toDto(user);
    }

    @Override
    public void deleteUser(Long id) {
        userRepository.deleteById(id);
    }
}
