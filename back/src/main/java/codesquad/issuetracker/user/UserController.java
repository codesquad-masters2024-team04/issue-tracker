package codesquad.issuetracker.user;

import codesquad.issuetracker.config.LoginInterceptor;
import codesquad.issuetracker.user.dto.response.UserShowDto;
import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequiredArgsConstructor
public class UserController {

    private final UserService userService;

    @GetMapping("/users")
    public ResponseEntity<List<UserShowDto>> getAllUsers() {
        List<User> allUsers = userService.getAllUsers();
        List<UserShowDto> allUserShowDto = allUsers.stream()
                .map(user -> new UserShowDto(user))
                .collect(Collectors.toList());
        return ResponseEntity.ok(allUserShowDto);
    }

    @GetMapping("/users/login")
    public ResponseEntity<UserShowDto> getLoggedInUser(HttpServletRequest request) {
        User user = userService.getUserById((String) request.getAttribute(LoginInterceptor.LOGIN_ID)); // 현재 로그인된 user 정보
        return ResponseEntity
                .ok(new UserShowDto(user));
    }
}
