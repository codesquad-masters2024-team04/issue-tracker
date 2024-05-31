package codesquad.issuetracker.user.dto.response;

import codesquad.issuetracker.user.User;
import lombok.Getter;

@Getter
public class AssigneeShowDto {

    private String loginId;
    private String profileImage;

    public AssigneeShowDto(User user) {
        this.loginId = user.getLoginId();
        this.profileImage = user.getProfileImage();
    }
}
