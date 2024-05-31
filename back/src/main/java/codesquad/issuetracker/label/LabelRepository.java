package codesquad.issuetracker.label;

import org.springframework.data.repository.CrudRepository;

import java.util.List;

public interface LabelRepository extends CrudRepository<Label, Long> {

    List<Label> findAll();

    List<Label> findAllById(Iterable<Long> ids);
}