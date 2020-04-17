package com.meetup.meetupapi.model;

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
@Table(name = "meetup_group")
public class MeetupGroup {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @NotNull
    private long group_id;

    @Getter
    @Setter
    @NotNull
    private String group_name;

    @Getter
    @Setter
    @NotNull
    private int owner_id;

    @ManyToOne
    @JoinColumn(name="owner_id", referencedColumnName = "id")
    private ApplicationUser user;
}