package codesquad.issuetracker.issue.dto.request;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
public class IssueContentUpdateDto {

    private String content;
}
