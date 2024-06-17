import { useState } from 'react';
import { deleteIssue, openIssue, closeIssue } from '~/features/issue/apis';

export const useIssueStatus = () => {
	const [loading, setLoading] = useState(false);

	const onOpenIssue = async issueId => {
		setLoading(true);
		try {
			await openIssue(issueId);
		} catch (error) {
			console.error('Error:', error);
		} finally {
			setLoading(false);
		}
	};

	const onCloseIssue = async issueId => {
		setLoading(true);
		try {
			await closeIssue(issueId);
		} catch (error) {
			console.error('Error:', error);
		} finally {
			setLoading(false);
		}
	};

	const onDeleteIssue = async issueId => {
		setLoading(true);
		try {
			const result = await deleteIssue(issueId);
			return result;
		} catch (error) {
			console.error('Error:', error);
		} finally {
			setLoading(false);
		}
	};

	return { onOpenIssue, onCloseIssue, onDeleteIssue, loading };
};
