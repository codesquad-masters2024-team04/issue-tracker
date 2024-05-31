package codesquad.issuetracker.issue;

import lombok.Builder;
import lombok.Getter;
import org.springframework.data.annotation.Id;
import org.springframework.data.relational.core.mapping.Table;

@Getter
@Table("issue_label")
@Builder
public class IssueLabel {

    @Id
    private Long id;
    private Long issueId;
    private Long labelId;
}
