package com.tuempresa.tracking.service.integration;

import com.google.ads.googleads.lib.GoogleAdsClient;
import com.google.ads.googleads.v21.services.ClickConversion;
import com.google.ads.googleads.v21.services.ConversionUploadServiceClient;
import com.google.ads.googleads.v21.services.UploadClickConversionsResponse;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.time.ZonedDateTime;
import java.time.format.DateTimeFormatter;
import java.util.Collections;

@Service
public class GoogleAdsService {

    private final GoogleAdsClient googleAdsClient;

    @Value("${google.ads.customerId}")
    private String customerId;

    @Value("${google.ads.conversionActionId}")
    private String conversionActionId;

    public GoogleAdsService(GoogleAdsClient googleAdsClient) {
        this.googleAdsClient = googleAdsClient;
    }

    // EL MÉTODO QUE TESTRUNNER ESTÁ BUSCANDO
    public void sendOfflineConversion(String gclid, double amount) {
        String conversionTime = ZonedDateTime.now().format(DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ssXXX"));
        String resourceName = "customers/" + customerId + "/conversionActions/" + conversionActionId;

        try (ConversionUploadServiceClient client = 
                googleAdsClient.getVersion21().createConversionUploadServiceClient()) {

            ClickConversion conversion = ClickConversion.newBuilder()
                    .setConversionAction(resourceName)
                    .setConversionDateTime(conversionTime)
                    .setGclid(gclid)
                    .setConversionValue(amount)
                    .setCurrencyCode("USD")
                    .build();

            UploadClickConversionsResponse response = client.uploadClickConversions(
                    customerId, Collections.singletonList(conversion), true);

            System.out.println("🚀 [SPRING SUCCESS] Conversión enviada a Google Ads: " + response);

        } catch (Exception e) {
            System.err.println("❌ [SPRING ERROR] Falló el envío a Google Ads: " + e.getMessage());
        }
    }
}