package com.meetup.meetupapi.repo;

import java.util.List;

import com.meetup.meetupapi.model.Meeting;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

public interface MeetingRepository extends JpaRepository<Meeting, Long>{
    @Query(
        value = "SELECT * FROM meeting AS M WHERE M.group_id = ?1 ;",
        nativeQuery = true
    )
    List<Meeting> findAllByGroupId(Long groupId);

    @Query(
        value = "SELECT * FROM meeting AS M WHERE M.owner_id = ?1 ;",
        nativeQuery = true
    )
    List<Meeting> findAllByCreatorId(Long userId);
}