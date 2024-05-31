package codesquad.issuetracker.user;

import org.springframework.data.jdbc.repository.query.Modifying;
import org.springframework.data.jdbc.repository.query.Query;
import org.springframework.data.repository.CrudRepository;

import java.util.List;

public interface UserRepository extends CrudRepository<User, String> {

    List<User> findAll();

    List<User> findAllById(Iterable<String> ids);

    User findByLoginId(String loginId);

    @Modifying
    @Query("INSERT INTO user(login_id, password, profile_image) VALUES (:loginId, :password, :profileImage)")
    void save(String loginId, String password, String profileImage);

    boolean existsByLoginId(String loginId);
}
