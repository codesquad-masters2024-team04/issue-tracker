package codesquad.issuetracker.milestone.dto.request;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
public class MilestoneSaveDto {

    private String name;
    private String description;
    private String dueDate;

    public MilestoneServiceDto toServiceDto() {
        return new MilestoneServiceDto(name, description, dueDate);
    }
}
