package codesquad.issuetracker.issue;

import codesquad.issuetracker.config.LoginInterceptor;
import codesquad.issuetracker.issue.dto.request.IssueContentUpdateDto;
import codesquad.issuetracker.issue.dto.request.IssueFilterDto;
import codesquad.issuetracker.issue.dto.request.IssueTitleUpdateDto;
import codesquad.issuetracker.issue.dto.response.IssueShowDto;
import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.util.UriComponentsBuilder;

import java.net.URI;
import java.util.List;
import java.util.stream.Collectors;

@Slf4j
@RestController
@RequiredArgsConstructor
public class IssueController {

    private final IssueService issueService;

    @PostMapping("/issues")
    public ResponseEntity<IssueShowDto> createIssue(
            @RequestBody Issue issue,
            UriComponentsBuilder uriComponentsBuilder,
            HttpServletRequest request
    ) {
        issue.setWriter((String) request.getAttribute(LoginInterceptor.LOGIN_ID)); // HttpServletRequest에 저장한 "loginId" 값 사용, 현재 로그인 한 사용자 id
        Issue createdIssue = issueService.createIssue(issue);
        URI location = uriComponentsBuilder.path("/issues/{id}")
                .buildAndExpand(createdIssue.getId())
                .toUri();
        return ResponseEntity
                .created(location)
                .body(new IssueShowDto(
                        createdIssue,
                        issueService.getLabelsForIssue(createdIssue),
                        issueService.getAssigneesForIssue(createdIssue),
                        issueService.getMilestoneForIssue(createdIssue))
                );
    }

    @GetMapping("/issues")
    public ResponseEntity<List<IssueShowDto>> getAllIssues() {
        List<Issue> allIssues = issueService.getAllIssues();
        return ResponseEntity
                .ok(allIssues.stream()
                        .map(issue -> new IssueShowDto(
                                issue,
                                issueService.getLabelsForIssue(issue),
                                issueService.getAssigneesForIssue(issue),
                                issueService.getMilestoneForIssue(issue)))
                        .collect(Collectors.toList()));
    }

    @GetMapping("/issues/{issueId}")
    public ResponseEntity<IssueShowDto> issueDetail(@PathVariable Long issueId) {
        Issue issue = issueService.getIssue(issueId);
        return ResponseEntity
                .ok(new IssueShowDto(issue,
                        issueService.getLabelsForIssue(issue),
                        issueService.getAssigneesForIssue(issue),
                        issueService.getMilestoneForIssue(issue)));
    }

    @PutMapping("/issues/{issueId}/title")
    public ResponseEntity<IssueShowDto> updateIssueTitleById(@PathVariable Long issueId, @RequestBody IssueTitleUpdateDto issueTitleUpdateDto) {
        Issue updatedIssue = issueService.updateIssueTitleById(issueId, issueTitleUpdateDto.getTitle());
        return ResponseEntity
                .ok(new IssueShowDto(
                        updatedIssue,
                        issueService.getLabelsForIssue(updatedIssue),
                        issueService.getAssigneesForIssue(updatedIssue),
                        issueService.getMilestoneForIssue(updatedIssue)));
    }

    @PutMapping("/issues/{issueId}/content")
    public ResponseEntity<IssueShowDto> updateIssueContentById(@PathVariable Long issueId, @RequestBody IssueContentUpdateDto issueContentUpdateDto) {
        Issue updatedIssue = issueService.updateIssueContentById(issueId, issueContentUpdateDto.getContent());
        return ResponseEntity
                .ok(new IssueShowDto(
                        updatedIssue,
                        issueService.getLabelsForIssue(updatedIssue),
                        issueService.getAssigneesForIssue(updatedIssue),
                        issueService.getMilestoneForIssue(updatedIssue)));
    }

    @DeleteMapping("/issues/{issueId}")
    public ResponseEntity<Void> deleteIssueById(@PathVariable Long issueId) {
        issueService.deleteIssueById(issueId);
        return ResponseEntity
                .noContent()
                .build();
    }

    @PutMapping("/issues/open")
    public ResponseEntity<List<IssueShowDto>> openIssuesById(@RequestBody List<Long> issueIds) {
        List<Issue> openedIssues = issueService.openIssuesById(issueIds);
        return ResponseEntity
                .ok(openedIssues.stream()
                        .map(issue -> new IssueShowDto(
                                issue,
                                issueService.getLabelsForIssue(issue),
                                issueService.getAssigneesForIssue(issue),
                                issueService.getMilestoneForIssue(issue)
                        ))
                        .collect(Collectors.toList()));
    }

    @PutMapping("/issues/close")
    public ResponseEntity<List<IssueShowDto>> closeIssuesById(@RequestBody List<Long> issueIds) {
        List<Issue> closedIssues = issueService.closeIssuesById(issueIds);
        return ResponseEntity
                .ok(closedIssues.stream()
                        .map(issue -> new IssueShowDto(
                                issue,
                                issueService.getLabelsForIssue(issue),
                                issueService.getAssigneesForIssue(issue),
                                issueService.getMilestoneForIssue(issue)
                        ))
                        .collect(Collectors.toList()));
    }

    @PutMapping("/issues/{issueId}/assignee")
    public ResponseEntity<IssueShowDto> addAssigneesById(@PathVariable Long issueId, @RequestBody List<String> loginIds) {
        Issue updatedIssue = issueService.addAssigneesById(issueId, loginIds);
        return ResponseEntity
                .ok(new IssueShowDto(
                        updatedIssue,
                        issueService.getLabelsForIssue(updatedIssue),
                        issueService.getAssigneesForIssue(updatedIssue),
                        issueService.getMilestoneForIssue(updatedIssue)));
    }

    @PutMapping("/issues/{issueId}/label")
    public ResponseEntity<IssueShowDto> addLabelsById(@PathVariable Long issueId, @RequestBody List<Long> labelIds) {
        Issue updatedIssue = issueService.addLabelsById(issueId, labelIds);
        return ResponseEntity
                .ok(new IssueShowDto(
                        updatedIssue,
                        issueService.getLabelsForIssue(updatedIssue),
                        issueService.getAssigneesForIssue(updatedIssue),
                        issueService.getMilestoneForIssue(updatedIssue)));
    }

    @PutMapping("/issues/{issueId}/milestone")
    public ResponseEntity<IssueShowDto> addMilestoneById(@PathVariable Long issueId, @RequestBody Long milestoneId) {
        Issue updatedIssue = issueService.addMilestoneById(issueId, milestoneId);
        return ResponseEntity
                .ok(new IssueShowDto(
                        updatedIssue,
                        issueService.getLabelsForIssue(updatedIssue),
                        issueService.getAssigneesForIssue(updatedIssue),
                        issueService.getMilestoneForIssue(updatedIssue)));
    }

    @DeleteMapping("/issues/{issueId}/assignee")
    public ResponseEntity<Void> deleteAssigneesById(@PathVariable Long issueId, @RequestBody List<String> loginIds) {
        issueService.deleteAssigneesById(issueId, loginIds);
        return ResponseEntity
                .noContent()
                .build();
    }

    @DeleteMapping("/issues/{issueId}/label")
    public ResponseEntity<Void> deleteLabelsById(@PathVariable Long issueId, @RequestBody List<Long> labelIds) {
        issueService.deleteLabelsById(issueId, labelIds);
        return ResponseEntity
                .noContent()
                .build();
    }

    @DeleteMapping("/issues/{issueId}/milestone")
    public ResponseEntity<Void> deleteMilestoneById(@PathVariable Long issueId) {
        issueService.deleteMilestoneById(issueId);
        return ResponseEntity
                .noContent()
                .build();
    }

    @GetMapping("/issues/filter")
    public ResponseEntity<List<IssueShowDto>> filter(@ModelAttribute IssueFilterDto issueFilterDto) {
        List<Issue> filteredIssues = issueService.getFilteredIssues(issueFilterDto);
        return ResponseEntity
                .ok(filteredIssues.stream()
                        .map(issue -> new IssueShowDto(
                                issue,
                                issueService.getLabelsForIssue(issue),
                                issueService.getAssigneesForIssue(issue),
                                issueService.getMilestoneForIssue(issue)))
                        .collect(Collectors.toList()));
    }
}