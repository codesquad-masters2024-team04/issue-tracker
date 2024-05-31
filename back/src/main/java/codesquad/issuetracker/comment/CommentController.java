package codesquad.issuetracker.comment;

import codesquad.issuetracker.comment.dto.request.CommentSaveDto;
import codesquad.issuetracker.comment.dto.request.CommentUpdateDto;
import codesquad.issuetracker.comment.dto.response.CommentShowDto;
import codesquad.issuetracker.config.LoginInterceptor;
import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.util.UriComponentsBuilder;

import java.net.URI;

@RestController
@RequiredArgsConstructor
public class CommentController {

    private final CommentService commentService;

    @PostMapping("/comments")
    public ResponseEntity<CommentShowDto> createComment(
            @RequestBody CommentSaveDto commentSaveDto,
            UriComponentsBuilder uriComponentsBuilder,
            HttpServletRequest request
    ) {
        commentSaveDto.setLoginId((String) request.getAttribute(LoginInterceptor.LOGIN_ID)); // HttpServletRequest에 저장한 "loginId" 값 사용, 현재 로그인 한 사용자 id
        CommentShowDto createdComment = commentService.createComment(commentSaveDto.toServiceDto());
        URI location = uriComponentsBuilder.path("/comments/{id}")
                .buildAndExpand(createdComment.getId())
                .toUri();
        return ResponseEntity
                .created(location)
                .body(createdComment);
    }

    @PutMapping("/comments/{commentId}")
    public ResponseEntity<CommentShowDto> updateCommentById(@PathVariable Long commentId, @RequestBody CommentUpdateDto commentUpdateDto) {
        CommentShowDto updatedComment = commentService.updateCommentById(commentUpdateDto.toServiceDto(commentId));
        return ResponseEntity
                .ok(updatedComment);
    }
}
