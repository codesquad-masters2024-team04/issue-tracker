package codesquad.issuetracker.label.dto.request;

import codesquad.issuetracker.label.Label;

public class LabelServiceDto {

    private Long id;
    private String name;
    private String description;
    private String backgroundColor;
    private String textColor;

    public LabelServiceDto(String name, String description, String backgroundColor, String textColor) {
        this.name = name;
        this.description = description;
        this.backgroundColor = backgroundColor;
        this.textColor = textColor;
    }

    public LabelServiceDto(Long id, String name, String description, String backgroundColor, String textColor) {
        this.id = id;
        this.name = name;
        this.description = description;
        this.backgroundColor = backgroundColor;
        this.textColor = textColor;
    }

    public Label toEntityForSave() {
        return new Label(name, description, backgroundColor, textColor);
    }

    public Label toEntityForUpdate() {
        Label updatedLabel = new Label(name, description, backgroundColor, textColor);
        updatedLabel.setId(id);
        return updatedLabel;
    }
}
