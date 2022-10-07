package com.ssafy.hp.vision;


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
import java.util.Base64;
import java.util.List;


@Component
public class DetectText {
    public String detectText(String data) throws IOException {
        List<AnnotateImageRequest> requests = new ArrayList<>();

        Base64.Decoder decoder = Base64.getDecoder();
        ByteString imgBytes = ByteString.copyFrom(decoder.decode(data.substring(1, data.length() - 1)));

        Image img = Image.newBuilder().setContent(imgBytes).build();
        Feature feat = Feature.newBuilder().setType(Feature.Type.TEXT_DETECTION).build();
        AnnotateImageRequest request =
                AnnotateImageRequest.newBuilder().addFeatures(feat).setImage(img).build();
        requests.add(request);

        StringBuilder sb = new StringBuilder();

        try (ImageAnnotatorClient client = ImageAnnotatorClient.create()) {
            BatchAnnotateImagesResponse response = client.batchAnnotateImages(requests);
            List<AnnotateImageResponse> responses = response.getResponsesList();

            for (AnnotateImageResponse res : responses) {
                if (res.hasError()) {
                    return null;
                }
                for (EntityAnnotation annotation : res.getTextAnnotationsList()) {
                    if (!annotation.getLocale().isEmpty()) {
                        sb.append(annotation.getDescription().replaceAll("\n", " "));
                    }
                }
            }
        }
        return sb.toString().replaceAll("  ", " ");
    }
}