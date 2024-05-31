package codesquad.issuetracker.login;

import codesquad.issuetracker.user.User;
import codesquad.issuetracker.user.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class LoginService {

    private final UserRepository userRepository;

    public boolean authenticate(String loginId, String password) {
        User user = userRepository.findByLoginId(loginId);
        return user != null && user.getPassword().equals(password);
    }
}
