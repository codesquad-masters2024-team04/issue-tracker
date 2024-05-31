package codesquad.issuetracker.issue.dto.request;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
public class IssueFilterDto {

    private String assignee;
    private Long labelId;
    private Long milestoneId;
    private String writer;
}
