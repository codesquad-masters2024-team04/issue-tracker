package codesquad.issuetracker.comment.dto.request;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;

@Getter
@Setter
@NoArgsConstructor
public class CommentSaveDto {

    private String content;
    private String loginId;
    private Long issueId;
    private LocalDateTime createdDate = LocalDateTime.now();

    public CommentServiceDto toServiceDto() {
        return new CommentServiceDto(content, loginId, issueId, createdDate);
    }
}
