import { useReducer } from 'react';
import { toggleItemInArray } from '../../../utils/util';
import { useIssueDetail } from '~/features/issue/hooks';

export function useCheckList(id) {
	const { issueDetail } = useIssueDetail(id);

	const initialCheck = {
		selectedAssignees: issueDetail?.assignees ? [...issueDetail.assignees] : [],
		selectedLabels: issueDetail?.labels ? [...issueDetail.labels] : [],
		selectedMilestone: null,
	};

	function checkReducer(state, action) {
		switch (action.type) {
			case 'setAssignees':
				return {
					...state,
					selectedAssignees: toggleItemInArray(
						state.selectedAssignees,
						action.payload,
						'loginId'
					),
				};
			case 'setLabels':
				return {
					...state,
					selectedLabels: toggleItemInArray(
						state.selectedLabels,
						action.payload,
						'id'
					),
				};
			case 'setMilestone':
				return { ...state, selectedMilestone: action.payload };
			default:
				return state;
		}
	}
	return useReducer(checkReducer, initialCheck);
}
