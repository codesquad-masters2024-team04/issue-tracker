package codesquad.issuetracker.comment.dto.request;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
public class CommentUpdateDto {

    private String content;

    public CommentServiceDto toServiceDto(Long id) {
        return new CommentServiceDto(id, content);
    }
}