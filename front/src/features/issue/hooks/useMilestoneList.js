import { useEffect, useState } from 'react';
import { getMilestones } from '../apis/getFilterList';

export const useMilestoneList = () => {
	const [milestoneList, setMilestoneList] = useState([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);

	const fetchMilestoneList = async () => {
		try {
			const response = await getMilestones();
			setMilestoneList(response);
		} catch (error) {
			setError(error);
		} finally {
			setLoading(false);
		}
	};

	useEffect(() => {
		fetchMilestoneList();
	}, []);
	return { milestoneList, loading, error, fetchMilestoneList };
};
