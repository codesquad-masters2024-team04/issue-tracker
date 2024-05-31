package codesquad.issuetracker.issue;

import codesquad.issuetracker.issue.dto.request.IssueFilterDto;

import java.util.List;

public interface IssueRepositoryCustom {

    List<Long> findIssuesByFilter(IssueFilterDto issueFilterDto);
}