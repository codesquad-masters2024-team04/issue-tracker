package codesquad.issuetracker.milestone.dto.request;

import codesquad.issuetracker.milestone.Milestone;
import lombok.Getter;

import java.time.LocalDate;
import java.time.format.DateTimeFormatter;

@Getter
public class MilestoneServiceDto {

    private Long id;
    private String name;
    private String description;
    private String dueDate;

    public MilestoneServiceDto(String name, String description, String dueDate) {
        this.name = name;
        this.description = description;
        this.dueDate = dueDate;
    }

    public MilestoneServiceDto(Long id, String name, String description, String dueDate) {
        this.id = id;
        this.name = name;
        this.description = description;
        this.dueDate = dueDate;
    }

    public Milestone toEntityForSave() {
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern(Milestone.DATE_TIME_FORMAT);
        Milestone.MilestoneBuilder milestoneBuilder = Milestone.builder()
                .name(name)
                .description(description);

        if (dueDate != null) {
            milestoneBuilder
                    .dueDate(LocalDate.parse(dueDate, formatter));
        }
        return milestoneBuilder.build();
    }

    public Milestone toEntityForUpdate() {
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern(Milestone.DATE_TIME_FORMAT);
        Milestone.MilestoneBuilder milestoneBuilder = Milestone.builder()
                .id(id)
                .name(name)
                .description(description);

        if (dueDate != null) {
            milestoneBuilder
                    .dueDate(LocalDate.parse(dueDate, formatter));
        }
        return milestoneBuilder.build();
    }
}
