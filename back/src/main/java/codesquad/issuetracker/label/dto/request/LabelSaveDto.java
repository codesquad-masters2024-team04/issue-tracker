package codesquad.issuetracker.label.dto.request;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
public class LabelSaveDto {

    private String name;
    private String description;
    private String backgroundColor;
    private String textColor;

    public LabelServiceDto toServiceDto() {
        return new LabelServiceDto(name, description, backgroundColor, textColor);
    }
}
