package codesquad.issuetracker.oauth;

import codesquad.issuetracker.user.UserRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
@Slf4j
public class OAuthService {

    private final UserRepository userRepository;

    public void saveUserIfNotExist(String loginId, String profileImage) {
        if (!userRepository.existsByLoginId(loginId)) {
            userRepository.save(loginId, null, profileImage); // OAuth로 비밀번호는 받아올 수 없어서 null로 입력
        }
        log.info("이미 가입된 GitHub 아이디 입니다.");
    }
}