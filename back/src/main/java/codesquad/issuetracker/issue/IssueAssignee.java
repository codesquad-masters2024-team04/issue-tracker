package codesquad.issuetracker.issue;

import lombok.Builder;
import lombok.Getter;
import org.springframework.data.annotation.Id;
import org.springframework.data.relational.core.mapping.Table;

@Getter
@Table("issue_assignee")
@Builder
public class IssueAssignee {

    @Id
    private Long id;
    private String loginId;
    private Long issueId;
}
