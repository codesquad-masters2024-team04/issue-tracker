package codesquad.issuetracker.issue;

import codesquad.issuetracker.issue.dto.request.IssueFilterDto;
import codesquad.issuetracker.util.FilterQueryMaker;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.stereotype.Repository;

import java.util.ArrayList;
import java.util.List;

@Repository
public class IssueRepositoryCustomImpl implements IssueRepositoryCustom {

    public static final String NO_ASSIGNEE = "-1";
    public static final Long NO_LABEL = -1L;
    public static final Long NO_MILESTONE = -1L;

    private final JdbcTemplate jdbcTemplate;
    private final FilterQueryMaker filterQueryMaker;

    public IssueRepositoryCustomImpl(JdbcTemplate jdbcTemplate, FilterQueryMaker filterQueryMaker) {
        this.jdbcTemplate = jdbcTemplate;
        this.filterQueryMaker = filterQueryMaker;
    }

    @Override
    public List<Long> findIssuesByFilter(IssueFilterDto issueFilterDto) {
        String queryString = filterQueryMaker.makeQuery(issueFilterDto);

        List<Object> params = new ArrayList<>(); // 쿼리에 필요한 파라미터 리스트

        String assigneeId = issueFilterDto.getAssignee();
        if (assigneeId != null && !assigneeId.equals(NO_ASSIGNEE)) {
            params.add(assigneeId);
        }
        Long labelId = issueFilterDto.getLabelId();
        if (labelId != null && !labelId.equals(NO_LABEL)) {
            params.add(labelId);
        }
        Long milestoneId = issueFilterDto.getMilestoneId();
        if (milestoneId != null && !milestoneId.equals(NO_MILESTONE)) {
            params.add(milestoneId);
        }
        String writer = issueFilterDto.getWriter();
        if (writer != null) {
            params.add(writer);
        }

        return jdbcTemplate.query(queryString, issueRowMapper(), params.toArray());
    }

    private RowMapper<Long> issueRowMapper() {
        return (rs, rowNum) -> rs.getLong("id");
    }
}