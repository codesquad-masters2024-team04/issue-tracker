package codesquad.issuetracker.user;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class UserService {

    public static final String USER_NOT_FOUND_ERROR_MESSAGE = "존재하지 않는 회원 입니다.";

    private final UserRepository userRepository;

    public List<User> getAllUsers() {
        return userRepository.findAll();
    }

    public User getUserById(String loginId) {
        return userRepository.findById(loginId).get();
    }
}
