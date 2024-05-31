package codesquad.issuetracker.login;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.context.support.DefaultMessageSourceResolvable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import java.util.stream.Collectors;

@RestController
@RequiredArgsConstructor
public class LoginController {

    private static final String LOGIN_SUCCESS_MESSAGE = "로그인 성공!";
    private static final String LOGIN_FAILURE_MESSAGE = "잘못된 로그인 정보 입니다.";

    private final LoginService loginService;
    private final JwtUtil jwtUtil;

    @PostMapping("/login")
    public ResponseEntity<LoginResponse> login(@Valid @RequestBody LoginForm loginForm, BindingResult bindingResult) {
        // 유효성 검사 오류 처리
        if (bindingResult.hasErrors()) {
            String errorMessage = bindingResult.getAllErrors().stream()
                    .map(DefaultMessageSourceResolvable::getDefaultMessage)
                    .collect(Collectors.joining(", "));
            return ResponseEntity
                    .badRequest()
                    .body(new LoginResponse(null, errorMessage));
        }

        String loginId = loginForm.getLoginId();
        String password = loginForm.getPassword();
        // 로그인 아이디, 비밀번호 확인
        if (loginService.authenticate(loginId, password)) {
            String token = jwtUtil.createToken(loginId); // JWT 토큰 생성
            return ResponseEntity
                    .ok()
                    .body(new LoginResponse(token, LOGIN_SUCCESS_MESSAGE));
        }

        return ResponseEntity
                .status(HttpStatus.UNAUTHORIZED)
                .body(new LoginResponse(null, LOGIN_FAILURE_MESSAGE));
    }
}
