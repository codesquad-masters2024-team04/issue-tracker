package codesquad.issuetracker.oauth;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Getter;

@Getter
@JsonIgnoreProperties(ignoreUnknown = true)
public class GithubUserData {

    private String login;
    @JsonProperty("avatar_url")
    private String avatarUrl;
}
