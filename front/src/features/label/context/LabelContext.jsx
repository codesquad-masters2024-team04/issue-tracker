import { createContext } from 'react';
import { useLabelList } from '../../issue/hooks/useLabelList';

export const LabelContext = createContext();

export function LabelProvider({ children }) {
	const { labelList, loading, fetchLabelList } = useLabelList();

	return (
		<LabelContext.Provider value={{ labelList, loading, fetchLabelList }}>
			{children}
		</LabelContext.Provider>
	);
}
