package com.meetup.meetupapi.repo;

import java.util.List;

import com.meetup.meetupapi.model.GroupMembership;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.transaction.annotation.Transactional;

public interface GroupMembershipRepository extends JpaRepository<GroupMembership, Long> {
    @Query(
        value = "SELECT * " +
        "FROM group_membership AS M, users AS U " +
        "WHERE M.user_id = U.id AND M.group_id = ?1",
        nativeQuery = true
    )
    List<GroupMembership> findMembers(Long groupId);


    @Transactional
    @Modifying
    @Query(
        value = "INSERT INTO group_membership (group_id, user_id) " +
        "SELECT group_id, ?1 " +
        "FROM meetup_group " +
        "WHERE group_name = ?2 ;",
        nativeQuery = true
    )
    int joinGroup(int userId, String groupName);


    @Transactional
    @Modifying
    @Query(
        value = "DELETE FROM group_membership WHERE user_id = ?1 AND group_id = ?2 ",
        nativeQuery = true
    )
    int deleteFromGroup(int userId, int groupId);


    
}