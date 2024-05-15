import { useState, useEffect } from 'react';
import { getIssueDetail } from '~/features/issue/apis/getIssueDetail';

export const useIssueDetail = id => {
	const [issueDetail, setIssueDetail] = useState({});
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);

	useEffect(() => {
		const fetchIssueDetail = async () => {
			try {
				const data = await getIssueDetail(id);
				// TODO: data[0] -> data
				setIssueDetail(data[0]);
			} catch (error) {
				setError(error);
			} finally {
				setLoading(false);
			}
		};
		fetchIssueDetail();
	}, [id]);

	return { issueDetail, loading, error };
};