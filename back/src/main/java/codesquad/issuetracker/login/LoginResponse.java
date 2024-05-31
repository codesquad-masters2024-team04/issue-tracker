package codesquad.issuetracker.login;

import lombok.Getter;
import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@Getter
public class LoginResponse {

    private final String token;
    private final String message;
}
