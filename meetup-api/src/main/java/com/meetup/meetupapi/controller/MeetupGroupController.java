package com.meetup.meetupapi.controller;

import java.util.List;

import com.meetup.meetupapi.model.GroupMembership;
import com.meetup.meetupapi.model.Meeting;
import com.meetup.meetupapi.model.MeetupGroup;
import com.meetup.meetupapi.repo.GroupMembershipRepository;
import com.meetup.meetupapi.repo.MeetingRepository;
import com.meetup.meetupapi.repo.MeetupGroupRepository;
import com.meetup.meetupapi.repo.UserAvailabilityRepository;

import org.json.simple.JSONArray;
import org.json.simple.JSONObject;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/groups")
public class MeetupGroupController {

    private MeetupGroupRepository meetupGroupRepository;
    private GroupMembershipRepository groupMembershipRepository;
    private MeetingRepository meetingRepository;
    public MeetupGroupController(
            MeetupGroupRepository meetupGroupRepository, 
            GroupMembershipRepository groupMembershipRepository,
            UserAvailabilityRepository userAvailabilityRepository,
            MeetingRepository meetingRepository){
        this.meetupGroupRepository = meetupGroupRepository;
        this.groupMembershipRepository = groupMembershipRepository;
        this.meetingRepository = meetingRepository;
    }

    @SuppressWarnings("unchecked")
    @PostMapping("/retrieve")
    public ResponseEntity<?> getMyData(@RequestParam("id") int userId){
        JSONObject response = new JSONObject();
        JSONArray groupArr = new JSONArray();
        JSONArray possibleMeetingsArr = new JSONArray();

        int status = 200;
        List<MeetupGroup> userGroups;
        List<GroupMembership> members;
        List<Meeting> meetingList;

        try {
            userGroups = meetupGroupRepository.findMyGroups(userId);
            // for each group user is in, create member array of member obj
            for(MeetupGroup group : userGroups){

                // Each iteration, create a group object with an
                // array of members
                JSONObject groupObj = new JSONObject();
                JSONArray membersArr = new JSONArray();

                // find group ID, find members in that group
                Long groupId = group.getGroup_id();
                members = groupMembershipRepository.findMembers(groupId);

                // for each member in the group, put into member array
                for (GroupMembership groupMembership : members) {
                    JSONObject memberObj = new JSONObject();
                    memberObj.put("id", groupMembership.getUser().getId());
                    memberObj.put("name", groupMembership.getUser().getFullName());
                    memberObj.put("email", groupMembership.getUser().getEmail());
                    memberObj.put("phone", groupMembership.getUser().getPhone());
                    membersArr.add(memberObj);
                }

                // Now we have group info, members array, we must find
                // the meetings for each group
                JSONArray meetingArr = new JSONArray();
                meetingList = meetingRepository.findAllByGroupId(groupId);
                for(Meeting meeting: meetingList){
                    JSONObject meetingObj = new JSONObject();
                    meetingObj.put("id", meeting.getId());
                    meetingObj.put("creator", meeting.getUser().getFullName());
                    meetingObj.put("day", meeting.getMeeting_day());
                    meetingObj.put("start_time", meeting.getMeeting_start_time());
                    meetingObj.put("end_time", meeting.getMeeting_end_time());
                    meetingArr.add(meetingObj);
                }

                //Create an owner object for clarity
                JSONObject owner = new JSONObject();
                owner.put("id", group.getUser().getId());
                owner.put("username", group.getUser().getUsername());
                owner.put("fullname", group.getUser().getFullName());
                
                // Now we have found all the group members of this group
                // We place the group info, it's members, and it's meetings 
                // into the group object and start for the next group
                groupObj.put("id", group.getGroup_id());
                groupObj.put("name", group.getGroup_name());
                groupObj.put("owner", owner);
                groupObj.put("members", membersArr);
                groupObj.put("meetings", meetingArr);
                groupObj.put("possible_meetings", possibleMeetingsArr);
                groupArr.add(groupObj);
            };
            response.put("groups", groupArr);
        } catch (Exception e){
            System.out.println("Query failed");
            status = 500;
            response.put("message", "Query Failed");
        }

        return ResponseEntity.status(status).body(response);
    }

    @SuppressWarnings("unchecked")
    @PostMapping("/add")
    public ResponseEntity<?> createAndJoin(
            @RequestParam("id") int userId,
            @RequestParam("name") String groupName){
        JSONObject response = new JSONObject();
        String stringData = "";
        int status = 200;

        // Create group
        try {
            int createQueryStatus = meetupGroupRepository.createGroup(groupName, userId);
            if(createQueryStatus > 0){
                stringData += "" + groupName + " was created successfully!";
                int joinQueryStatus = groupMembershipRepository.joinGroup(userId, groupName);
                if (joinQueryStatus > 0){
                    stringData += " You have now joined!";
                }
                response.put("data", stringData);
            } else {
                response.put("message", "Error creating group");
            }
        } catch (Exception e){
            status = 500;
            response.put("message", "Error creating group");
        }
        return ResponseEntity.status(status).body(response);
    }

    @SuppressWarnings("unchecked")
    @PostMapping("/join")
    public ResponseEntity<?> joinGroup(
            @RequestParam("id") int userId,
            @RequestParam("name") String groupName){
        JSONObject response = new JSONObject();
        int status = 200;
        try {
            int val = groupMembershipRepository.joinGroup(userId, groupName);
            if (val > 0){
                response.put("data", "You have joined " + groupName);
            }
            else {
                response.put("message", "This group does not exist. Was there a typo?");
            }
        } catch (Exception e){
            response.put("message", e.toString());
            status = 500;
        }
        System.out.println("\n" + response);
        return ResponseEntity.status(status).body(response);
    }

    @SuppressWarnings("unchecked")
    @PostMapping("/leave")
    public ResponseEntity<?> leaveGroup(
            @RequestParam("groupId") int groupId,
            @RequestParam("userId") int userId){
        
        JSONObject response = new JSONObject();
        int status = 200;
        try {
            System.out.println("Removing " + userId + "from group " + groupId);
            int val = groupMembershipRepository.deleteFromGroup(userId, groupId);
            if ( val > 0 ) {
                response.put("data", "You have been successfully removed from the group");
            }
            else {
                response.put("message", "Something went wrong");
                status = 500;
            }
        } catch (Exception e){
            status = 500;
            response.put("message", e.toString());
        }
        return ResponseEntity.status(status).body(response);
    }
}