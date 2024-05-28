package codesquad.issuetracker.comment;

import lombok.Getter;

import java.time.LocalDateTime;

@Getter
public class CommentServiceDto {

    private String content;
    private String loginId;
    private Long issueId;
    private LocalDateTime createdDate;

    public CommentServiceDto(String content, String loginId, Long issueId, LocalDateTime createdDate) {
        this.content = content;
        this.loginId = loginId;
        this.issueId = issueId;
        this.createdDate = createdDate;
    }
}
