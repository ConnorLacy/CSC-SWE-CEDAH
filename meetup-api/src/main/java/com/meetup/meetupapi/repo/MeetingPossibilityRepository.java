package com.meetup.meetupapi.repo;

import com.meetup.meetupapi.model.MeetingPossibility;
import org.springframework.data.jpa.repository.JpaRepository;

public interface MeetingPossibilityRepository extends JpaRepository<MeetingPossibility, Long>{
    MeetingPossibility findById(long meetingId);
}