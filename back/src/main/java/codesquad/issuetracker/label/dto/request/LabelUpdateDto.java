package codesquad.issuetracker.label.dto.request;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
public class LabelUpdateDto {

    private String name;
    private String description;
    private String backgroundColor;
    private String textColor;

    public LabelServiceDto toServiceDto(Long id) {
        return new LabelServiceDto(id, name, description, backgroundColor, textColor);
    }
}
