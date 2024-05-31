package codesquad.issuetracker.util;

import java.time.Duration;
import java.time.LocalDateTime;

public class TimeCalculator {

    private static final String YEAR = "년";
    private static final String WEEK = "주";
    private static final String DAY = "일";
    private static final String HOUR = "시간";
    private static final String MINUTE = "분";
    private static final String SECOND = "초";

    public static String calculateTimeDifference(LocalDateTime creationTime) {

        LocalDateTime presentTime = LocalDateTime.now();
        Duration duration = Duration.between(creationTime, presentTime);

        long seconds = duration.getSeconds();
        long minutes = seconds / 60;
        long hours = minutes / 60;
        long days = hours / 24;
        long weeks = days / 7;
        long years = days / 365;

        if (years > 0) {
            return years + YEAR;
        } else if (weeks > 0) {
            return weeks + WEEK;
        } else if (days > 0) {
            return days + DAY;
        } else if (hours > 0) {
            return hours + HOUR;
        } else if (minutes > 0) {
            return minutes + MINUTE;
        } else {
            return seconds + SECOND;
        }
    }
}
