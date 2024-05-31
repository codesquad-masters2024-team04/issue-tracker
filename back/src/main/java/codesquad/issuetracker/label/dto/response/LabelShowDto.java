package codesquad.issuetracker.label.dto.response;

import codesquad.issuetracker.label.Label;
import lombok.Getter;

@Getter
public class LabelShowDto {

    private Long id;
    private String name;
    private String description;
    private String backgroundColor;
    private String textColor;

    public LabelShowDto(Label label) {
        this.id = label.getId();
        this.name = label.getName();
        this.description = label.getDescription();
        this.backgroundColor = label.getBackgroundColor();
        this.textColor = label.getTextColor();
    }
}
