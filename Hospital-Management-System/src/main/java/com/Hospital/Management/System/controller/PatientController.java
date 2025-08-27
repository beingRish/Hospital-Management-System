package com.Hospital.Management.System.controller;

import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.Hospital.Management.System.enitity.Patient;
import com.Hospital.Management.System.repository.PatientRepository;

@RestController
@RequestMapping("/api/v1")
public class PatientController {
	
	private PatientRepository patientRepository;

	public PatientController(PatientRepository patientRepository) {
		super();
		this.patientRepository = patientRepository;
	}

	@PostMapping("/insert")
	public Patient createPatient(@RequestBody Patient patient) {
		return patientRepository.save(patient);
	}

	
}
