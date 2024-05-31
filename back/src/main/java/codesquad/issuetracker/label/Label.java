package codesquad.issuetracker.label;

import lombok.Getter;
import lombok.Setter;
import org.springframework.data.annotation.Id;

@Getter
public class Label {

    @Id
    @Setter
    private Long id;
    private String name;
    private String description;
    private String backgroundColor;
    private String textColor;

    public Label(String name,
                 String description,
                 String backgroundColor,
                 String textColor) {
        this.name = name;
        this.description = description;
        this.backgroundColor = backgroundColor;
        this.textColor = textColor;
    }
}
