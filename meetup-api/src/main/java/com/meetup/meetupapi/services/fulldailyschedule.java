package com.meetup.meetupapi.services;

import java.sql.Time;
import java.time.LocalTime;
import java.util.ArrayList;
import java.util.List;

import com.meetup.meetupapi.model.UserAvailability;

import lombok.Getter;
import lombok.Setter;


public class fulldailyschedule {
	@Getter
	@Setter
	private String day;
	private Long id;
	private ArrayList dailyschedule = new ArrayList();
	public fulldailyschedule(String day, Long id, List<UserAvailability> availabilitiesList) {
		ArrayList<UserAvailability> temp = new ArrayList<UserAvailability>();
		this.day = day;
		this.id = id;
		for(int i = 0; i < availabilitiesList.size();i++) {
			if (((UserAvailability) availabilitiesList.get(i)).getDay().equals(day)) {
				temp.add((UserAvailability) availabilitiesList.get(i));
			}
		}
		for (UserAvailability a: temp) {
			LocalTime startTime = a.getStart_time().toLocalTime();
			LocalTime endTime = a.getEnd_time().toLocalTime();
			double start = startTime.getHour();
			if (startTime.getMinute() >= 30) {
				start+=.5; //add half hour
			}
			double end = endTime.getHour();
			if (endTime.getMinute() >= 30) {
				end+=.5;
			}
			for (double i = start; i < end; i+=.5) {
				if (!dailyschedule.contains(i)) {
					dailyschedule.add(i);
				}
			}
			
		}
	}
	public int size() {
		return dailyschedule.size();
	}
	public boolean contains(double d) {
		return dailyschedule.contains(d);
	}
	public Double getHour(Integer x) {
		return (Double) dailyschedule.get(x);
	}
	
	
	
}
