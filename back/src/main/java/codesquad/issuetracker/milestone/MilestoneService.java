package codesquad.issuetracker.milestone;

import codesquad.issuetracker.exception.MilestoneNotFoundException;
import codesquad.issuetracker.milestone.dto.request.MilestoneServiceDto;
import codesquad.issuetracker.milestone.dto.response.MilestoneShowDto;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class MilestoneService {

    private static final String MILESTONE_NOT_FOUND_ERROR_MESSAGE = "존재하지 않는 마일스톤 입니다.";

    private final MilestoneRepository milestoneRepository;

    public MilestoneShowDto createMilestone(MilestoneServiceDto milestoneServiceDto) {
        return new MilestoneShowDto(milestoneRepository.save(milestoneServiceDto.toEntityForSave()));
    }

    public List<Milestone> getAllMilestones() {
        return milestoneRepository.findAll();
    }

    public Milestone getMilestoneById(Long milestoneId) {
        return milestoneRepository.findById(milestoneId).orElseThrow(() -> new MilestoneNotFoundException(MILESTONE_NOT_FOUND_ERROR_MESSAGE));
    }

    public MilestoneShowDto updateMilestoneById(MilestoneServiceDto milestoneServiceDto) {
        return new MilestoneShowDto(milestoneRepository.save(milestoneServiceDto.toEntityForUpdate()));
    }

    public void deleteMilestoneById(Long milestoneId) {
        milestoneRepository.deleteById(milestoneId);
    }
}
