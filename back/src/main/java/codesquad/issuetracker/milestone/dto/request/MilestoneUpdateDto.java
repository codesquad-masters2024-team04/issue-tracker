package codesquad.issuetracker.milestone.dto.request;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
public class MilestoneUpdateDto {

    private String name;
    private String description;
    private String dueDate;

    public MilestoneServiceDto toServiceDto(Long id) {
        return new MilestoneServiceDto(id, name, description, dueDate);
    }
}
