package codesquad.issuetracker.comment.dto.request;

import lombok.Getter;

import java.time.LocalDateTime;

@Getter
public class CommentServiceDto {

    private Long id;
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

    public CommentServiceDto(Long id, String content) {
        this.id = id;
        this.content = content;
    }
}
