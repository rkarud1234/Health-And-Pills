package com.ssafy.hp.recommend.service;

import net.minidev.json.JSONObject;

public interface RecommendService {
    JSONObject recommendExercise(String uri);
    JSONObject recommendExercise(String uri, String exerciseId);
    JSONObject recommendPill(String uri);
    JSONObject recommendPill(String uri, String pillId);
}
