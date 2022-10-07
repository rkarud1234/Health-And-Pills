package com.ssafy.hp.util;

public class ScoreUtil {
    public static double calculateAverage(int[] scores) {
        int sum = 0;
        int count = 0;
        for (int i = 1; i < scores.length; i++) {
            sum += scores[i] * i;
            count += scores[i];
        }

        return count == 0 ? 0 : (double) sum / count;
    }
}
