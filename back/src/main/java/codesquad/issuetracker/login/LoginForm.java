package codesquad.issuetracker.login;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotEmpty;
import lombok.Data;

@Data
public class LoginForm {

    @NotEmpty
    @Email(message = "유효하지 않은 이메일")
    private String loginId;
    @NotEmpty
    private String password;

}
