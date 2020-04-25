package com.meetup.meetupapi.controller;

import java.sql.Time;
import java.util.ArrayList;
import java.util.List;

import com.meetup.meetupapi.model.ApplicationUser;
import com.meetup.meetupapi.model.GroupMembership;
import com.meetup.meetupapi.model.Meeting;
import com.meetup.meetupapi.model.MeetingPossibility;
import com.meetup.meetupapi.model.MeetupGroup;
import com.meetup.meetupapi.model.UserAvailability;
import com.meetup.meetupapi.repo.ApplicationUserRepository;
import com.meetup.meetupapi.repo.GroupMembershipRepository;
import com.meetup.meetupapi.repo.MeetingPossibilityRepository;
import com.meetup.meetupapi.repo.MeetingRepository;
import com.meetup.meetupapi.repo.MeetupGroupRepository;
import com.meetup.meetupapi.repo.UserAvailabilityRepository;
import com.meetup.meetupapi.services.ScheduleEngine;
import com.meetup.meetupapi.services.fulldailyschedule;

import org.json.simple.JSONArray;
import org.json.simple.JSONObject;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/engine")
public class MeetingController {

    private MeetingPossibilityRepository meetingPossibilityRepository;
    private MeetupGroupRepository meetupGroupRepository;
    private ApplicationUserRepository applicationUserRepository;
    private MeetingRepository meetingRepository;
    private GroupMembershipRepository groupMembershipRepository;
    private UserAvailabilityRepository userAvailabilityRepository;

    public MeetingController(MeetingPossibilityRepository meetingPossibilityRepository,
                            MeetupGroupRepository meetupGroupRepository,
                            ApplicationUserRepository applicationUserRepository,
                            MeetingRepository meetingRepository,
                            GroupMembershipRepository groupMembershipRepository,
                            UserAvailabilityRepository userAvailabilityRepository){
        this.meetingPossibilityRepository = meetingPossibilityRepository;
        this.meetupGroupRepository = meetupGroupRepository;
        this.applicationUserRepository = applicationUserRepository;
        this.meetingRepository = meetingRepository;
        this.groupMembershipRepository = groupMembershipRepository;
        this.userAvailabilityRepository = userAvailabilityRepository;
    }

    @SuppressWarnings("unchecked")
    @PostMapping("/vote")
    public ResponseEntity<?> castVote(@RequestParam("meetingId") long meetingId){
        JSONObject response = new JSONObject();
        JSONObject inner = new JSONObject();
        int status = 200;

        try {
            MeetingPossibility possibility = meetingPossibilityRepository.findById(meetingId);
            long currentVotes = possibility.getVote_count();
            possibility.setVote_count(currentVotes+1);
            meetingPossibilityRepository.save(possibility);
            long newCount = possibility.getVote_count();
            inner.put("count", newCount);
            response.put("data", inner);
        } catch (Exception e){
            status = 500;
            response.put("message", e.toString());
        }

        return ResponseEntity.status(status).body(response);
    }

    @SuppressWarnings("unchecked")
    @PostMapping("/create/possible")
    public ResponseEntity<?> addPossibleMeeting(@RequestBody JSONObject req){
        JSONObject response = new JSONObject();
        int status = 200;
        MeetingPossibility possibility;
        MeetupGroup group;
        try {
            String day = req.get("day").toString();
            Time start_time = Time.valueOf(req.get("startTime").toString());
            Time end_time = Time.valueOf(req.get("endTime").toString());
            long groupId = Long.valueOf(req.get("groupId").toString());
            group = meetupGroupRepository.findById(groupId);
            possibility = new MeetingPossibility(day, start_time, end_time, 0, group);
            meetingPossibilityRepository.save(possibility);
            response.put("data", "Meeting possiblity added");
        } catch( Exception e){
            status = 500;
            response.put("message", "Unable to add meeting possibility");
        }
        return ResponseEntity.status(status).body(response);
    }


    @SuppressWarnings("unchecked")
    @PostMapping("/create/meeting")
    public ResponseEntity<?> createMeeting(@RequestBody JSONObject req){
        JSONObject response = new JSONObject();
        int status = 200;

        try {
            String day = req.get("day").toString();
            Time start_time = Time.valueOf(req.get("startTime").toString());
            Time end_time = Time.valueOf(req.get("endTime").toString());
            double duration = Double.parseDouble(req.get("duration").toString());
            long creatorId = Long.valueOf(req.get("userId").toString());
            ApplicationUser user = applicationUserRepository.findById(creatorId);
            long groupId = Long.valueOf(req.get("groupId").toString());
            MeetupGroup group = meetupGroupRepository.findById(groupId);
            Meeting newMeeting = new Meeting(day, start_time, end_time, duration, user, group);
            meetingRepository.save(newMeeting);
            response.put("data", "Success! Meeting created.");
        } catch (Exception e){
            status = 500;
            response.put("message", e.toString());
        }
        return ResponseEntity.status(status).body(response);
    }

        /*
        Here is where the user availability data is located. 
        Logic for calculating meetings should go here.

        Each availability belongs to a user which one can get
        by using getId() or any of its class methods. Parse
        this data into meeting possibilty code for calculations. 
        
        Print statements for right now to help visualize
    */
    @SuppressWarnings("unchecked")
    @PostMapping("/predict")
    public ResponseEntity<?> getAvailabilities(
            @RequestParam("id") Long groupId
    ){
        int status = 200;
        JSONObject response = new JSONObject();
        List<GroupMembership> members = new ArrayList<GroupMembership>();
        List<UserAvailability> availabilitiesList = new ArrayList<UserAvailability>();
        List<Long> userIds = new ArrayList<Long>();
        ArrayList<MeetingPossibility> allmeetingpossibilities = new ArrayList<MeetingPossibility>(); //will contain all meeting possibilities
        try {
            MeetupGroup group = meetupGroupRepository.findById((long)groupId);
            // For each membership, get userId
            members = groupMembershipRepository.findMembers(groupId);
            //for each day in week, creates a scheduleEngine instance
            ScheduleEngine SundayEngine = new ScheduleEngine("Sunday");
            ScheduleEngine MondayEngine = new ScheduleEngine("Monday");
            ScheduleEngine TuesdayEngine = new ScheduleEngine("Tuesday");
            ScheduleEngine WednesdayEngine = new ScheduleEngine("Wednesday");
            ScheduleEngine ThursdayEngine = new ScheduleEngine("Thursday");
            ScheduleEngine FridayEngine = new ScheduleEngine("Friday");
            ScheduleEngine SaturdayEngine = new ScheduleEngine("Saturday");
            for(GroupMembership membership: members){
                userIds.add(membership.getUser().getId());
            }
            // For each userId, get all availability
            try {
                for(Long id: userIds){
                    //Makes a full daily schedule for each day for every user, then adds the schedule to the appropriate engine
                    availabilitiesList = userAvailabilityRepository.findAllByUserId(id);
                    fulldailyschedule sundayschedule = new fulldailyschedule("Sunday", id, availabilitiesList);
                    SundayEngine.addSchedule(sundayschedule);
                    fulldailyschedule mondayschedule = new fulldailyschedule("Monday", id, availabilitiesList);
                    MondayEngine.addSchedule(mondayschedule);
                    fulldailyschedule tuesdayschedule = new fulldailyschedule("Tuesday", id, availabilitiesList);
                    TuesdayEngine.addSchedule(tuesdayschedule);
                    fulldailyschedule wednesdayschedule = new fulldailyschedule("Wednesday", id, availabilitiesList);
                    WednesdayEngine.addSchedule(wednesdayschedule);
                    fulldailyschedule thursdayschedule = new fulldailyschedule("Thursday", id, availabilitiesList);
                    ThursdayEngine.addSchedule(thursdayschedule);
                    fulldailyschedule fridayschedule = new fulldailyschedule("Friday", id, availabilitiesList);
                    FridayEngine.addSchedule(fridayschedule);
                    fulldailyschedule saturdayschedule = new fulldailyschedule("Saturday", id, availabilitiesList);
                    SaturdayEngine.addSchedule(saturdayschedule);
                }
                allmeetingpossibilities.addAll(SundayEngine.calculatemeeting(1, group));

            } catch (Exception e){
                status = 500;
                response.put("message", e.toString());
            }
            
            JSONArray possibleArr = new JSONArray();
            for(MeetingPossibility possible: allmeetingpossibilities){
                MeetingPossibility exists = meetingPossibilityRepository.customFind(
                        possible.getDay(), possible.getStart_time(), 
                        possible.getEnd_time(), (long)groupId);
                if(exists != null) {
                    possibleArr.add(exists.json());
                }
                else {
                    meetingPossibilityRepository.save(possible);
                    possibleArr.add(possible.json());
                }
            }
            
            response.put("data", possibleArr);
        } catch (Exception e){
            status = 500;
            response.put("message", e.toString());
        }
        return ResponseEntity.status(status).body(response);
    }

}