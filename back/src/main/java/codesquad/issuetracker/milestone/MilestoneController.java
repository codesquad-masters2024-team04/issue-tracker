package codesquad.issuetracker.milestone;

import codesquad.issuetracker.milestone.dto.request.MilestoneSaveDto;
import codesquad.issuetracker.milestone.dto.request.MilestoneUpdateDto;
import codesquad.issuetracker.milestone.dto.response.MilestoneShowDto;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.util.UriComponentsBuilder;

import java.net.URI;
import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequiredArgsConstructor
public class MilestoneController {

    private final MilestoneService milestoneService;

    @PostMapping("/milestones")
    public ResponseEntity<MilestoneShowDto> createMilestone(@RequestBody MilestoneSaveDto milestoneSaveDto, UriComponentsBuilder uriComponentsBuilder) {
        MilestoneShowDto createdMilestone = milestoneService.createMilestone(milestoneSaveDto.toServiceDto());
        URI location = uriComponentsBuilder.path("/milestones/{id}")
                .buildAndExpand(createdMilestone.getId())
                .toUri();
        return ResponseEntity
                .created(location)
                .body(createdMilestone);
    }

    @GetMapping("/milestones")
    public ResponseEntity<List<MilestoneShowDto>> getAllMilestones() {
        List<Milestone> allMilestones = milestoneService.getAllMilestones();
        List<MilestoneShowDto> allMilestoneShowDto = allMilestones.stream()
                .map(milestone -> new MilestoneShowDto(milestone))
                .collect(Collectors.toList());
        return ResponseEntity
                .ok(allMilestoneShowDto);
    }

    @GetMapping("/milestones/{milestoneId}")
    public ResponseEntity<MilestoneShowDto> milestoneDetail(@PathVariable Long milestoneId) {
        Milestone milestone = milestoneService.getMilestoneById(milestoneId);
        return ResponseEntity
                .ok(new MilestoneShowDto(milestone));
    }

    @PutMapping("/milestones/{milestoneId}")
    public ResponseEntity<MilestoneShowDto> updateMilestoneById(@PathVariable Long milestoneId, @RequestBody MilestoneUpdateDto milestoneUpdateDto) {
        MilestoneShowDto updatedMilestone = milestoneService.updateMilestoneById(milestoneUpdateDto.toServiceDto(milestoneId));
        return ResponseEntity
                .ok(updatedMilestone);
    }

    @DeleteMapping("/milestones/{milestoneId}")
    public ResponseEntity<Void> deleteMilestone(@PathVariable Long milestoneId) {
        milestoneService.deleteMilestoneById(milestoneId);
        return ResponseEntity
                .noContent()
                .build();
    }
}
