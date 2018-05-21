package biz.llmall.common.utils.okhttp;

import okhttp3.Cookie;
import okhttp3.CookieJar;
import okhttp3.HttpUrl;
import okhttp3.OkHttpClient;

import javax.net.ssl.*;
import java.security.KeyManagementException;
import java.security.NoSuchAlgorithmException;
import java.security.cert.CertificateException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.concurrent.TimeUnit;

public class MyOKHttpClient {
    private static OkHttpClient client;
    private static OkHttpClient sslClient;
    private static OkHttpClient.Builder clientBuilder = new OkHttpClient()
            .newBuilder()
            .connectTimeout(1200, TimeUnit.SECONDS)
            .writeTimeout(1200, TimeUnit.SECONDS)
            .readTimeout(1200, TimeUnit.SECONDS);

    private MyOKHttpClient() {
    }

    private static CookieJar getCookie() {
        CookieJar cookieJar = new CookieJar() {
            private final HashMap<String, List<Cookie>> cookieStore = new HashMap<>();

            @Override
            public void saveFromResponse(HttpUrl url, List<Cookie> cookies) {
                cookieStore.put(url.host(), cookies);
            }

            @Override
            public List<Cookie> loadForRequest(HttpUrl url) {
                List<Cookie> cookies = cookieStore.get(url.host());
                return cookies != null ? cookies : new ArrayList<Cookie>();
            }
        };

        return cookieJar;
    }

    public static OkHttpClient getInstance() {
        if (client == null) {
            synchronized ((MyOKHttpClient.class)) {
                if (client == null) {
                    client = clientBuilder.cookieJar(getCookie()).build();
                }
            }
        }

        return client;
    }

    public static OkHttpClient getSSLInstance() throws NoSuchAlgorithmException, KeyManagementException {
        if (sslClient == null) {
            synchronized (MyOKHttpClient.class) {
                if (sslClient == null) {
                    // Create a trust manager that does not validate certificate chains
                    final TrustManager[] trustAllCerts = new TrustManager[]{
                            new X509TrustManager() {
                                @Override
                                public void checkClientTrusted(java.security.cert.X509Certificate[] chain, String authType) throws CertificateException {
                                }

                                @Override
                                public void checkServerTrusted(java.security.cert.X509Certificate[] chain, String authType) throws CertificateException {
                                }

                                @Override
                                public java.security.cert.X509Certificate[] getAcceptedIssuers() {
                                    return new java.security.cert.X509Certificate[]{};
                                }
                            }
                    };

                    // Install the all-trusting trust manager
                    final SSLContext sslContext = SSLContext.getInstance("SSL");
                    sslContext.init(null, trustAllCerts, new java.security.SecureRandom());
                    // Create an ssl socket factory with our all-trusting manager
                    final SSLSocketFactory sslSocketFactory = sslContext.getSocketFactory();

                    clientBuilder.sslSocketFactory(sslSocketFactory, (X509TrustManager) trustAllCerts[0]);
                    clientBuilder.hostnameVerifier(new HostnameVerifier() {
                        @Override
                        public boolean verify(String hostname, SSLSession session) {
                            return true;
                        }
                    });

                    sslClient = clientBuilder.build();
                }
            }
        }

        return sslClient;
    }
}
