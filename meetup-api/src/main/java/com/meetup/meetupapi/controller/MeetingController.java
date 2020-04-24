package com.meetup.meetupapi.controller;

import java.sql.Time;

import com.meetup.meetupapi.model.ApplicationUser;
import com.meetup.meetupapi.model.Meeting;
import com.meetup.meetupapi.model.MeetingPossibility;
import com.meetup.meetupapi.model.MeetupGroup;
import com.meetup.meetupapi.repo.ApplicationUserRepository;
import com.meetup.meetupapi.repo.MeetingPossibilityRepository;
import com.meetup.meetupapi.repo.MeetingRepository;
import com.meetup.meetupapi.repo.MeetupGroupRepository;

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
    public MeetingController(MeetingPossibilityRepository meetingPossibilityRepository,
                            MeetupGroupRepository meetupGroupRepository,
                            ApplicationUserRepository applicationUserRepository,
                            MeetingRepository meetingRepository){
        this.meetingPossibilityRepository = meetingPossibilityRepository;
        this.meetupGroupRepository = meetupGroupRepository;
        this.applicationUserRepository = applicationUserRepository;
        this.meetingRepository = meetingRepository;
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

}