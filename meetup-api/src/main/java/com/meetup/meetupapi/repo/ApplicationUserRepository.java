package com.meetup.meetupapi.repo;

import com.meetup.meetupapi.model.ApplicationUser;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ApplicationUserRepository extends JpaRepository<ApplicationUser, Long> {
    ApplicationUser findById(long id);
    ApplicationUser findByUsername(String username);
    ApplicationUser findByEmail(String email);
}