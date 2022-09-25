package com.ssafy.hp.config;

import net.minidev.json.JSONObject;
import net.minidev.json.parser.JSONParser;
import net.minidev.json.parser.ParseException;
import org.springframework.context.annotation.Configuration;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.net.URL;
import java.net.URLConnection;

@Configuration
public class DjangoConnectConfig {

    public static JSONObject connect(String uri) {
        final String BASE_URL = "http://localhost:8000/api";
        try {
            URL url = new URL(BASE_URL+uri);
            URLConnection conn = url.openConnection();
            BufferedReader br = new BufferedReader(new InputStreamReader(conn.getInputStream(),"UTF-8"));

            String line = br.readLine();
            // 실행하면 json타입을 데이터가 한줄의 String 타입으로 가져와지기 때문에 json 형태로 가공해줘야함
            JSONParser parser = new JSONParser();
            JSONObject object = (JSONObject) parser.parse(line);
            JSONObject response = (JSONObject) object.get("response");

//            System.out.println(response);
            return response;

        } catch (IOException e) {
            e.printStackTrace();
        } catch (ParseException e) {
            throw new RuntimeException(e);
        }
        return null;
    }
}
