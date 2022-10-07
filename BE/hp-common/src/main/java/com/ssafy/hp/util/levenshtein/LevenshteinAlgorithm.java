package com.ssafy.hp.util.levenshtein;

import java.util.List;

public class LevenshteinAlgorithm {

    public static int getMosSimilarString(String origin, List<String> patterns) {

        int minDist = Integer.MAX_VALUE;
        int idx = 1;
        int result = 0;

        for (String pattern : patterns) {
            int[][] dist = new int[origin.length() + 1][pattern.length() + 1];

            for (int i = 1; i <= origin.length(); ++i) {
                dist[i][0] = i;
            }

            for (int j = 1; j <= pattern.length(); ++j) {
                dist[0][j] = j;
            }

            for (int j = 1; j <= pattern.length(); ++j) {
                for (int i = 1; i <= origin.length(); ++i) {
                    if (origin.charAt(i - 1) == pattern.charAt(j - 1)) {
                        dist[i][j] = dist[i - 1][j - 1];
                    } else {
                        dist[i][j] = Math.min(dist[i - 1][j - 1] + 1, Math.min(dist[i][j - 1] + 1, dist[i - 1][j] + 1));
                    }
                }
            }

            if(minDist > dist[origin.length()][pattern.length()]){
                minDist = dist[origin.length()][pattern.length()];
                result = idx;
            }
            idx++;
        }

        return result;
    }
}
