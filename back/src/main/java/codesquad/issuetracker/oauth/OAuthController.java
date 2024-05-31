package codesquad.issuetracker.oauth;

import codesquad.issuetracker.login.JwtUtil;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.*;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.client.RestTemplate;

@RestController
@RequiredArgsConstructor
public class OAuthController {

    private static final String GITHUB_LOGIN_SUCCESS_MESSAGE = "GitHub 로그인 성공!";

    @Value("${client.id}")
    private String clientId;
    @Value("${client.secret}")
    private String clientSecret;

    private final OAuthService oauthService;
    private final JwtUtil jwtUtil;

    @GetMapping("/login/oauth/github/callback")
    public ResponseEntity<String> githubOAuthCallback(@RequestParam String code) throws JsonProcessingException {
        OAuthToken oAuthToken = getOAuthToken(code);
        GithubUserData githubUserData = getGithubUserData(oAuthToken);
        oauthService.saveUserIfNotExist(githubUserData.getLogin(), githubUserData.getAvatarUrl());

        String jwtToken = jwtUtil.createToken(githubUserData.getLogin()); // JWT 토큰 생성

        HttpHeaders headers = new HttpHeaders();
        headers.add("Location", "http://fe-issue-tracker-s3.s3-website.ap-northeast-2.amazonaws.com/login/oauth/github/callback?token=" + jwtToken); // 리다이렉트할 주소 설정

        return ResponseEntity
                .status(HttpStatus.FOUND)
                .headers(headers)
                .body(GITHUB_LOGIN_SUCCESS_MESSAGE);
    }

    private OAuthToken getOAuthToken(String code) throws JsonProcessingException {
        RestTemplate tokenRequestTemplate = new RestTemplate();
        // GitHub에 POST 요청을 보내고 응답(access token)을 OAuthToken 객체로 받는다
        ResponseEntity<String> response = tokenRequestTemplate.exchange(
                "https://github.com/login/oauth/access_token",
                HttpMethod.POST,
                makeCodeRequestHeaderAndBody(code),
                String.class
        );
        ObjectMapper objectMapper = new ObjectMapper();
        return objectMapper.readValue(response.getBody(), OAuthToken.class); // JSON 문자열을 객체로 변환 후 반환
    }

    private HttpEntity<MultiValueMap<String, String>> makeCodeRequestHeaderAndBody(String code) {
        MultiValueMap<String, String> params = new LinkedMultiValueMap<>();
        params.add("client_id", clientId);
        params.add("client_secret", clientSecret);
        params.add("code", code);

        HttpHeaders headers = new HttpHeaders();
        headers.add("Accept", "application/json");
        return new HttpEntity<>(params, headers);
    }

    private GithubUserData getGithubUserData(OAuthToken oAuthToken) throws JsonProcessingException {
        RestTemplate profileRequestTemplate = new RestTemplate();
        // GitHub에 GET 요청을 보내고 프로필 정보를 응답 받는다
        ResponseEntity<String> profileResponse = profileRequestTemplate.exchange(
                "https://api.github.com/user",
                HttpMethod.GET,
                makeProfileRequestHeader(oAuthToken),
                String.class
        );
        ObjectMapper objectMapper = new ObjectMapper();
        return objectMapper.readValue(profileResponse.getBody(), GithubUserData.class); // JSON 문자열을 객체로 변환 후 반환
    }

    private HttpEntity<MultiValueMap<String, String>> makeProfileRequestHeader(OAuthToken oAuthToken) {
        HttpHeaders profileRequestHeaders = new HttpHeaders();
        profileRequestHeaders.add("Authorization", "token " + oAuthToken.getAccessToken());
        return new HttpEntity<>(profileRequestHeaders);
    }
}