package codesquad.issuetracker.user;

import lombok.Getter;
import org.springframework.data.annotation.Id;

@Getter
public class User {

    @Id
    private String loginId;
    private String password;
    private String profileImage;

    public User(String loginId,
                String password,
                String profileImage) {
        this.loginId = loginId;
        this.password = password;
        this.profileImage = profileImage;
    }
}
