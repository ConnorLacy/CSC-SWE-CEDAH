package com.meetup.meetupapi.repo;

import java.util.List;

import com.meetup.meetupapi.model.MeetupGroup;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.transaction.annotation.Transactional;

public interface MeetupGroupRepository extends JpaRepository<MeetupGroup, Long> {
    @Query(
        value = "SELECT G.group_id, U.username, G.group_name, G.owner_id " + 
        "FROM meetup_group AS G, group_membership AS M, users AS U " +
        "WHERE G.group_id = M.group_id AND M.user_id = ?1 AND G.owner_id = U.id",
        nativeQuery = true
    )
    List<MeetupGroup> findMyGroups(int userId);
    
    @Transactional
    @Modifying
    @Query(
        value = "INSERT INTO meetup_group (group_name, owner_id) " +
        "SELECT ?1,?2 " + 
        "FROM dual " +
        "WHERE NOT EXISTS (SELECT group_name FROM meetup_group WHERE group_name=?1);",
        nativeQuery = true
    )
    int createGroup(String groupName, int userId);


    MeetupGroup findById(long groupId);
}