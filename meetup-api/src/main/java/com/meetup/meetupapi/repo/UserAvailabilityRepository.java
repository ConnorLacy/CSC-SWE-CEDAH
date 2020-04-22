package com.meetup.meetupapi.repo;

import java.util.List;

import com.meetup.meetupapi.model.UserAvailability;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserAvailabilityRepository extends JpaRepository<UserAvailability, Long>{
    List<UserAvailability> findAllByUserId(long userId);
}
