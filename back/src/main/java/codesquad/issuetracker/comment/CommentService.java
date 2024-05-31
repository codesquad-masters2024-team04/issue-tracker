package codesquad.issuetracker.comment;

import codesquad.issuetracker.comment.dto.request.CommentServiceDto;
import codesquad.issuetracker.comment.dto.response.CommentShowDto;
import codesquad.issuetracker.exception.CommentNotFoundException;
import codesquad.issuetracker.exception.UserNotFoundException;
import codesquad.issuetracker.user.User;
import codesquad.issuetracker.user.UserRepository;
import codesquad.issuetracker.user.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class CommentService {

    private static final String COMMENT_NOT_FOUND_ERROR_MESSAGE = "존재하지 않는 댓글 입니다.";

    private final CommentRepository commentRepository;
    private final UserRepository userRepository;

    public CommentShowDto createComment(CommentServiceDto commentServiceDto) {
        return new CommentShowDto(commentRepository.save(
                new Comment(commentServiceDto.getContent(),
                        commentServiceDto.getLoginId(),
                        commentServiceDto.getIssueId(),
                        commentServiceDto.getCreatedDate(),
                        getUserProfileImage(commentServiceDto.getLoginId())
                ))
        );
    }

    public CommentShowDto updateCommentById(CommentServiceDto commentServiceDto) {
        commentRepository.updateById(commentServiceDto.getId(), commentServiceDto.getContent());
        return new CommentShowDto(commentRepository.findById(commentServiceDto.getId()).orElseThrow(() -> new CommentNotFoundException(COMMENT_NOT_FOUND_ERROR_MESSAGE)));
    }

    public String getUserProfileImage(String loginId) {
        User user = userRepository.findById(loginId).orElseThrow(() -> new UserNotFoundException(UserService.USER_NOT_FOUND_ERROR_MESSAGE));
        return user.getProfileImage();
    }
}
