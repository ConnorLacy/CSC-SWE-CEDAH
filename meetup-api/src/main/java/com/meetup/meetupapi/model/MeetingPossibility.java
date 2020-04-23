package com.meetup.meetupapi.model;

import java.sql.Time;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;
import javax.validation.constraints.NotNull;
import lombok.Getter;
import lombok.Setter;

@Entity
@Table(name = "meeting_possibilities")
public class MeetingPossibility {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @NotNull
    @Getter
    @Setter
    private long id;

    @Getter
    @Setter
    private String day;

    @Getter
    @Setter
    private Time start_time;

    @Getter
    @Setter
    private Time end_time;

    @Getter
    @Setter
    private long vote_count;

    @NotNull
    @ManyToOne
    @Getter
    @Setter
    @JoinColumn(name="group_id", referencedColumnName = "group_id")
    private MeetupGroup group;

    public MeetingPossibility(){}
    
    public MeetingPossibility(
            String day, Time start_time, 
            Time end_time, long vote_count, MeetupGroup group){
        this.day = day;
        this.start_time = start_time;
        this.end_time = end_time;
        this.group = group;
    }
    
}