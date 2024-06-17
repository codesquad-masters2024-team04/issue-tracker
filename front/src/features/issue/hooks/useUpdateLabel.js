import { useState } from 'react';
import { addLabel, deleteLabel } from '../apis';

export const useUpdateLabel = () => {
	const [loading, setLoading] = useState(false);

	const onAddLabel = async (issueId, labelId) => {
		setLoading(true);
		try {
			await addLabel(issueId, labelId);
		} catch (error) {
			console.error('Error:', error);
		} finally {
			setLoading(false);
		}
	};

	const onDeleteLabel = async (issueId, labelId) => {
		setLoading(true);
		try {
			await deleteLabel(issueId, labelId);
		} catch (error) {
			console.error('Error:', error);
		} finally {
			setLoading(false);
		}
	};

	return { onAddLabel, onDeleteLabel, loading };
};
