import { createContext, useState } from 'react';
import { useLabelList, useMilestoneList } from '~/features/issue/hooks';

export const LabelMilestoneCounter = createContext();

export const LabelMilestoneCounterProvider = ({ children }) => {
	const { labelList } = useLabelList();
	const { milestoneList } = useMilestoneList();
	const labelCounter = labelList.length;
	const milestoneCounter = milestoneList.length;
	return (
		<LabelMilestoneCounter.Provider value={{ labelCounter, milestoneCounter }}>
			{children}
		</LabelMilestoneCounter.Provider>
	);
};
