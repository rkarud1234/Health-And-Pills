package com.ssafy.hp.recommend.service;

import com.ssafy.hp.config.DjangoConnectConfig;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import net.minidev.json.JSONObject;
import org.springframework.stereotype.Service;

@Slf4j
@Service
@RequiredArgsConstructor
public class RecommendServiceImpl implements RecommendService {

    @Override
    public JSONObject recommendExercise(String uri) {
        return DjangoConnectConfig.connect(uri);
    }
    @Override
    public JSONObject recommendExercise(String uri, String exerciseId) {
        return DjangoConnectConfig.connect(uri+"/"+exerciseId);
    }

    @Override
    public JSONObject recommendPill(String uri) {
        return DjangoConnectConfig.connect(uri);
    }

    @Override
    public JSONObject recommendPill(String uri, String pillId) {
        return DjangoConnectConfig.connect(uri+"/"+pillId);
    }


}
