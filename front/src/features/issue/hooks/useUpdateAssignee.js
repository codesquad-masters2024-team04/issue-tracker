import { useState } from 'react';
import { addAssignee, deleteAssignee } from '../apis';

export const useUpdateAssignee = () => {
	const [loading, setLoading] = useState(false);

	const onAddAssignee = async (issueId, userId) => {
		setLoading(true);
		try {
			await addAssignee(issueId, userId);
		} catch (error) {
			console.error('Error:', error);
		} finally {
			setLoading(false);
		}
	};

	const onDeleteAssignee = async (issueId, userId) => {
		setLoading(true);
		try {
			await deleteAssignee(issueId, userId);
		} catch (error) {
			console.error('Error:', error);
		} finally {
			setLoading(false);
		}
	};

	return { onAddAssignee, onDeleteAssignee, loading };
};
