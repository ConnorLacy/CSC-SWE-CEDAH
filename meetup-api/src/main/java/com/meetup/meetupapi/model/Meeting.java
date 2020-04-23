package com.meetup.meetupapi.model;

import java.sql.Time;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToOne;
import javax.persistence.Table;
import javax.validation.constraints.NotNull;
import lombok.Getter;
import lombok.Setter;

@Entity
@Table(name = "meeting")
public class Meeting {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @NotNull
    @Getter
    @Setter
    private long id;
   
    @Getter
    @Setter
    private String meeting_day;

    @Getter
    @Setter
    private Time meeting_start_time;
   
    @Getter
    @Setter
    private Time meeting_end_time;

    @Getter
    @Setter
    private double meeting_duration; //for meeting calculation

    @NotNull
    @ManyToOne
    @Getter
    @Setter
    @JoinColumn(name="group_id", referencedColumnName = "group_id")
    private MeetupGroup group;
    
    @NotNull
    @OneToOne
    @Getter
    @Setter
    @JoinColumn(name="creator_id", referencedColumnName = "id")
    private ApplicationUser user;


    public Meeting(){}
    public Meeting(
            String meeting_day, Time meeting_start_time, Time meeting_end_time, 
            double meeting_duration, ApplicationUser user, MeetupGroup group){
        
        this.meeting_duration = meeting_duration;
        this.meeting_day= meeting_day;
        this.meeting_start_time = meeting_start_time;
        this.meeting_end_time = meeting_end_time;
        this.user = user;
        this.group = group;
    }
}