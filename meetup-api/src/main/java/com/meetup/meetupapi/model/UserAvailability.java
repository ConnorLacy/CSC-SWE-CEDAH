package com.meetup.meetupapi.model;

import java.sql.Time;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.OneToOne;
import javax.persistence.Table;
import javax.validation.constraints.NotNull;
import lombok.Getter;
import lombok.Setter;

@Entity
@Table(name = "user_availability")
public class UserAvailability {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @NotNull
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

    @NotNull
    @OneToOne
    @Getter
    @Setter
    @JoinColumn(name="user_id", referencedColumnName = "id")
    private ApplicationUser user;

    public UserAvailability(){}
    public UserAvailability(String day, Time start_time, Time end_time, ApplicationUser user){
        this.day = day;
        this.start_time = start_time;
        this.end_time = end_time;
        this.user = user;
    }
}