import { useContext } from 'react';
import { LabelMilestoneCounter } from '~/context/LabelMilestoneCounter';

export const useLabelMilestoneCounter = () => {
	const { labelCounter, milestoneCounter } = useContext(LabelMilestoneCounter);

	return { labelCounter, milestoneCounter };
};
