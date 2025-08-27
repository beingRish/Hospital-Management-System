package com.Hospital.Management.System.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.Hospital.Management.System.enitity.Patient;

@Repository
public interface PatientRepository extends JpaRepository<Patient, Long> {

}
