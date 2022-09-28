package com.ssafy.hp;


import com.google.cloud.vision.v1.AnnotateImageRequest;
import com.google.cloud.vision.v1.AnnotateImageResponse;
import com.google.cloud.vision.v1.BatchAnnotateImagesResponse;
import com.google.cloud.vision.v1.EntityAnnotation;
import com.google.cloud.vision.v1.Feature;
import com.google.cloud.vision.v1.Image;
import com.google.cloud.vision.v1.ImageAnnotatorClient;
import com.google.protobuf.ByteString;
import org.springframework.stereotype.*;

import java.io.*;
import java.util.ArrayList;
import java.util.List;


@Component

public class DetectText {
    // Detects text in the specified image.
    public String detectText(byte[] data) throws IOException {
        System.out.println("DetectText.detectText");

        for(byte bb : data){
            System.out.println("byte = " + bb);
        }
        List<AnnotateImageRequest> requests = new ArrayList<>();

        ByteString imgBytes = ByteString.copyFrom(data);

        Image img = Image.newBuilder().setContent(imgBytes).build();
        System.out.println("1");
        Feature feat = Feature.newBuilder().setType(Feature.Type.TEXT_DETECTION).build();
        System.out.println("2");
        AnnotateImageRequest request =
                AnnotateImageRequest.newBuilder().addFeatures(feat).setImage(img).build();
        System.out.println("3");
        requests.add(request);
        System.out.println("4");

        // Initialize client that will be used to send requests. This client only needs to be created
        // once, and can be reused for multiple requests. After completing all of your requests, call
        // the "close" method on the client to safely clean up any remaining background resources.
        StringBuilder sb = new StringBuilder();

        System.out.println("??????");
        try (ImageAnnotatorClient client = ImageAnnotatorClient.create()) {
            System.out.println("client = " + client);
            BatchAnnotateImagesResponse response = client.batchAnnotateImages(requests);
            List<AnnotateImageResponse> responses = response.getResponsesList();

            for (AnnotateImageResponse res : responses) {
                if (res.hasError()) {
                    System.out.format("Error: %s%n", res.getError().getMessage());
                    return null;
                }

                System.out.println("res = " + res);

                // For full list of available annotations, see http://g.co/cloud/vision/docs
                for (EntityAnnotation annotation : res.getTextAnnotationsList()) {
                    sb.append(annotation.getDescription()).append(" ");
                }
            }
        }
        System.out.println("결과: " + sb.toString());
        return sb.toString().replaceAll("  ", " ");
    }
}