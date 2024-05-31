package codesquad.issuetracker.label;

import codesquad.issuetracker.exception.LabelNotFoundException;
import codesquad.issuetracker.label.dto.request.LabelServiceDto;
import codesquad.issuetracker.label.dto.response.LabelShowDto;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class LabelService {

    private static final String LABEL_NOT_FOUND_ERROR_MESSAGE = "존재하지 않는 라벨 입니다.";

    private final LabelRepository labelRepository;

    public LabelShowDto createLabel(LabelServiceDto labelServiceDto) {
        return new LabelShowDto(labelRepository.save(labelServiceDto.toEntityForSave()));
    }

    public List<Label> getAllLabels() {
        return labelRepository.findAll();
    }

    public Label getLabelById(Long labelId) {
        return labelRepository.findById(labelId).orElseThrow(() -> new LabelNotFoundException(LABEL_NOT_FOUND_ERROR_MESSAGE));
    }

    public LabelShowDto updateLabelById(LabelServiceDto labelServiceDto) {
        return new LabelShowDto(labelRepository.save(labelServiceDto.toEntityForUpdate()));
    }

    public void deleteLabelById(Long labelId) {
        labelRepository.deleteById(labelId);
    }
}
