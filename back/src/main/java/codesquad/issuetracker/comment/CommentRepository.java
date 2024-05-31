package codesquad.issuetracker.comment;

import org.springframework.data.jdbc.repository.query.Modifying;
import org.springframework.data.jdbc.repository.query.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CommentRepository extends CrudRepository<Comment, Long> {

    @Modifying
    @Query("update comment set content = :newContent where id = :commentId")
    void updateById(Long commentId, String newContent);
}
