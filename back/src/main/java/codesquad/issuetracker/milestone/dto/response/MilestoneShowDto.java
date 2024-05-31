package codesquad.issuetracker.milestone.dto.response;

import codesquad.issuetracker.milestone.Milestone;
import lombok.Getter;

import java.time.LocalDate;

@Getter
public class MilestoneShowDto {

    private Long id;
    private String name;
    private String description;
    private LocalDate dueDate;
    private boolean isClosed;
    private Long openIssue;
    private Long closeIssue;
    private int progress;

    public MilestoneShowDto(Milestone milestone) {
        this.id = milestone.getId();
        this.name = milestone.getName();
        this.description = milestone.getDescription();
        this.dueDate = milestone.getDueDate();
        this.isClosed = milestone.isClosed();
        this.openIssue = milestone.countOpenIssue();
        this.closeIssue = milestone.countCloseIssue();
        this.progress = milestone.calculateProgress();
    }
}
