package codesquad.issuetracker.comment;

import lombok.Getter;
import org.springframework.data.annotation.Id;

import java.time.LocalDateTime;

@Getter
public class Comment {

    @Id
    private Long id;
    private String content;
    private String loginId;
    private Long issueId;
    private LocalDateTime createdDate;
    private String profileImage;

    public Comment(String content, String loginId, Long issueId, LocalDateTime createdDate, String profileImage) {
        this.content = content;
        this.loginId = loginId;
        this.issueId = issueId;
        this.createdDate = createdDate;
        this.profileImage = profileImage;
    }
}
