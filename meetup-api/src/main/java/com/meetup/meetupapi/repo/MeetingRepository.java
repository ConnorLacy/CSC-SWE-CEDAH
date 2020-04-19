package com.meetup.meetupapi.repo;

import java.util.List;

import com.meetup.meetupapi.model.Meeting;
import org.springframework.data.jpa.repository.JpaRepository;

public interface MeetingRepository extends JpaRepository<Meeting, Long>{
    List<Meeting> findAllById(Long groupId);
}