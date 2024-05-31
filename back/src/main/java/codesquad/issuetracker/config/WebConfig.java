package codesquad.issuetracker.config;

import codesquad.issuetracker.login.JwtUtil;
import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.InterceptorRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
@RequiredArgsConstructor
public class WebConfig implements WebMvcConfigurer {

    private final JwtUtil jwtUtil;

    @Override
    public void addCorsMappings(CorsRegistry registry) {
        registry.addMapping("/**") // 와일드카드
                .allowedOrigins(
                        "http://localhost:3000",
                        "http://localhost:5173",
                        "http://fe-issue-tracker-s3.s3-website.ap-northeast-2.amazonaws.com"
                )
                .allowedMethods("GET", "POST", "PUT", "DELETE", "OPTIONS")
                .allowedHeaders("*")
                .allowCredentials(true);
    }

    @Override
    public void addInterceptors(InterceptorRegistry registry) {
        registry.addInterceptor(new LoginInterceptor(jwtUtil))
                .addPathPatterns("/**")
                .excludePathPatterns("/login", "/login/oauth/github/callback", "/favicon.ico", "/error");
    }
}
