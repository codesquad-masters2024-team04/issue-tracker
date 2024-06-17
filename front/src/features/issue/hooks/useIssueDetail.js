import { useState, useEffect } from 'react';
import { getIssueDetail } from '~/features/issue/apis/getIssueDetail';

export const useIssueDetail = id => {
	const [issueDetail, setIssueDetail] = useState({});
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState(null);

	const fetchIssueDetail = async () => {
		setLoading(true);
		try {
			const data = await getIssueDetail(id);
			setIssueDetail(data);
		} catch (error) {
			setError(error);
		} finally {
			setLoading(false);
		}
	};

	return { issueDetail, loading, error, fetchIssueDetail };
};
