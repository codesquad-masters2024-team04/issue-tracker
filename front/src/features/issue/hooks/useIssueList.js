import { useState, useEffect } from 'react';
import { getIssues, getFilteredIssues } from '~/features/issue/apis';

export const useIssueList = () => {
	const [issueList, setIssueDetail] = useState([]);
	const [counts, setCounts] = useState({});

	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);

	const fetchIssueList = async closed => {
		setLoading(true);
		try {
			let data = await getIssues();
			setCounts({
				open: data.filter(issue => !issue.closed).length,
				closed: data.filter(issue => issue.closed).length,
			});
			switch (closed) {
				case false:
					data = data.filter(issue => !issue.closed);
					break;
				case true:
					data = data.filter(issue => issue.closed);
					break;
				default:
					break;
			}
			setIssueDetail(data);
		} catch (error) {
			setError(error);
		} finally {
			setLoading(false);
		}
	};

	const fetchFilteredIssueList = async query => {
		setLoading(true);
		try {
			const data = await getFilteredIssues(query);
			setCounts({
				open: data.filter(issue => !issue.closed).length,
				closed: data.filter(issue => issue.closed).length,
			});
			setIssueDetail(data);
		} catch (error) {
			setError(error);
		} finally {
			setLoading(false);
		}
	};

	useEffect(() => {
		fetchIssueList();
	}, []);

	return {
		issueList,
		loading,
		error,
		fetchIssueList,
		fetchFilteredIssueList,
		openCounts: counts.open,
		closedCounts: counts.closed,
	};
};
