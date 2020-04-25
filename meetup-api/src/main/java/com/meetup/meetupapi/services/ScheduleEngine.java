package com.meetup.meetupapi.services;
import java.sql.Time;
import java.util.ArrayList;
import java.util.List;

import com.meetup.meetupapi.model.MeetingPossibility;
import com.meetup.meetupapi.model.MeetupGroup;
public class ScheduleEngine {
	
	private String day;
	private ArrayList<fulldailyschedule> allschedules = new ArrayList<fulldailyschedule>(); 

	public ScheduleEngine(String day) {
		this.day=day;
	}
	public void addSchedule(fulldailyschedule schedule) {
		allschedules.add(schedule);
	}
	@SuppressWarnings("deprecation")
	public List<MeetingPossibility> calculatemeeting(double duration, MeetupGroup group) {
		ArrayList<MeetingPossibility> possibilities = new ArrayList<MeetingPossibility>();
		if(allschedules.size() == 0) return possibilities;
		
		fulldailyschedule first = (fulldailyschedule)allschedules.get(0);
		for (int i = 0; i < first.size(); i++) {
			boolean test = true; //if false, it is not a viable meeting time
			double current = (double) first.getHour(i);
			for (double k = 0; k < duration; k+=0.5) { //in the case of a meeting duration >1, checks for consecutive hours
				if (!first.contains(current+k)) {
					test = false;
					break;
				}
			}
			for (int j = 1; j < allschedules.size() && test;j++) {
				fulldailyschedule curr = (fulldailyschedule) allschedules.get(j);
				for (double l = 0; l < duration; l+=0.5) {
					if (!curr.contains(current+l)) {
						test = false;
						break;
					}
				}
			}
			if (test) {
				Time start = new Time(0);
				start.setHours((int) current);
				if (current - Math.floor(current)!=0) {
					start.setMinutes(30);
				}
				Time end = new Time(0);
				end.setHours((int) (current+duration));
				if ((current+duration) - Math.floor(current+duration)!=0) {
					end.setMinutes(30);
				}
				MeetingPossibility possible = new MeetingPossibility(day, start, end, 0, group);
				System.out.println("Creating possible meeting: " + possible.toString());
				possibilities.add(possible);
				/*
				 *
				 */
			}
		}
		return possibilities;
	}
}
