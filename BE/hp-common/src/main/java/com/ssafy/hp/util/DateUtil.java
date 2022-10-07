package com.ssafy.hp.util;

import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.Calendar;

public class DateUtil {
    public static String[] calculateAge(String userBirthday){
        String [] birthYears = new String[2];

        Calendar current = Calendar.getInstance();
        int currentYear  = current.get(Calendar.YEAR);
        int currentMonth = current.get(Calendar.MONTH) + 1;
        int currentDay   = current.get(Calendar.DAY_OF_MONTH);

        int userYear = Integer.parseInt(userBirthday.substring(0,4));
        int userMonth = Integer.parseInt(userBirthday.substring(4,6));
        int userDay = Integer.parseInt(userBirthday.substring(6));

        int age = currentYear - userYear;
        if (userMonth * 100 + userDay > currentMonth * 100 + currentDay) age--;

        birthYears[0] = LocalDate.now().minusYears(age/10 * 10).format(DateTimeFormatter.ofPattern("yyyyMMdd"));
        birthYears[1] = LocalDate.now().minusYears((age/10+1) * 10 -1).format(DateTimeFormatter.ofPattern("yyyyMMdd"));

        return birthYears;
    }
}
