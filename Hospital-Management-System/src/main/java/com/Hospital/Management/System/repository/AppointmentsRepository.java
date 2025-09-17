package com.Hospital.Management.System.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.Hospital.Management.System.entity.Appointment;

@Repository
public interface AppointmentsRepository extends JpaRepository<Appointment, Long> {

}
