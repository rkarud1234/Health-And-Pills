package com.ssafy.hp.config;


import org.json.simple.JSONArray;
import org.json.simple.parser.JSONParser;
import org.json.simple.parser.ParseException;
import org.springframework.context.annotation.Configuration;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.net.URL;
import java.net.HttpURLConnection;

@Configuration
public class DjangoConnectConfig {

    public static JSONArray connect(String uri) {
        final String BASE_URL = "http://j7b203.p.ssafy.io:8000/recommend";
        try {
            URL url = new URL(BASE_URL+uri+"?format=json");
            HttpURLConnection conn = (HttpURLConnection) url.openConnection();

            if(conn.getResponseCode() != 200) {
                throw new RuntimeException("django connection error:"+conn.getResponseCode());
            }

            BufferedReader br = new BufferedReader(new InputStreamReader(conn.getInputStream(),"UTF-8"));
            StringBuilder sb = new StringBuilder();

            String line = "";
            while((line = br.readLine()) != null) {
                sb.append(line);
            }
            JSONParser parser = new JSONParser();
            JSONArray response = (JSONArray) parser.parse(sb.toString());

            return response;

        } catch (IOException e) {
            e.printStackTrace();
            throw new RuntimeException();
        } catch (ParseException e) {
            e.printStackTrace();
            throw new RuntimeException();
        }
    }
}
