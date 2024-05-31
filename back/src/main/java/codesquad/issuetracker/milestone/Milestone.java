package codesquad.issuetracker.milestone;

import codesquad.issuetracker.issue.Issue;
import lombok.Builder;
import lombok.Getter;
import org.springframework.data.annotation.Id;
import org.springframework.data.relational.core.mapping.MappedCollection;

import java.time.LocalDate;
import java.util.Optional;
import java.util.Set;

@Getter
@Builder
// save와 update의 서로다른 생성자가 필요했습니다(id 존재 여부). 하지만 생성자 오버로딩을 하면 CrudRepository에서 어느 생성자를 사용할지 몰라 오류가 발생합니다. 때문에 @Builder를 사용했습니다.
public class Milestone {

    public static final String DATE_TIME_FORMAT = "yyyy-MM-dd";

    @Id
    private Long id;
    private String name;
    private String description;
    private LocalDate dueDate;
    private boolean isClosed;
    @MappedCollection(idColumn = "milestone_id")
    private Set<Issue> issues;

    public Long countOpenIssue() {
        return Optional.ofNullable(issues)
                .map(issues -> issues.stream()
                        .filter(issue -> !issue.isClosed())
                        .count())
                .orElse(0L);
    }

    public Long countCloseIssue() {
        return Optional.ofNullable(issues)
                .map(issues -> issues.stream()
                        .filter(Issue::isClosed)
                        .count())
                .orElse(0L);
    }

    public int calculateProgress() {
        if (issues == null || issues.isEmpty()) {
            return 0;
        }
        return (int) ((double) countCloseIssue() / issues.size() * 100);
    }
}
