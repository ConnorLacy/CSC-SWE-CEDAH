package com.meetup.meetupapi.repo;

import java.sql.Time;


import com.meetup.meetupapi.model.MeetingPossibility;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.data.jpa.repository.Modifying;

public interface MeetingPossibilityRepository extends JpaRepository<MeetingPossibility, Long>{
    MeetingPossibility findById(long meetingId);

    @Transactional
    @Modifying
    @Query(
        value = "INSERT INTO meeting_possibilities(day, start_time, end_time, vote_count, group_id) SELECT  ?1 , ?2 , ?3 , ?4 , ?5 FROM dual WHERE NOT EXISTS ( SELECT * FROM meeting_possibilities WHERE day = ?1 and start_time = ?2 and end_time = ?3 );",
        nativeQuery = true
    )
    public int saveIfNotExists(
            String day, Time start_time, 
            Time end_time, long vote_count, 
            long group_id);

    @Query(
        value = "SELECT * FROM meeting_possibilities WHERE day = ?1 and start_time = ?2 and end_time = ?3 and group_id = ?4 ;",
        nativeQuery = true
    )
    public MeetingPossibility customFind(String day, Time start_time, Time end_time, long groupId);
}