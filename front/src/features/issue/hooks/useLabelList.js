import { useEffect, useState } from 'react';
import { getLabels } from '~/features/issue/apis';

export const useLabelList = () => {
	const [labelList, setLabelList] = useState([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);

	const fetchLabelList = async () => {
		try {
			const response = await getLabels();
			setLabelList(response);
		} catch (error) {
			setError(error);
		} finally {
			setLoading(false);
		}
	};

	useEffect(() => {
		fetchLabelList();
	}, []);

	return { labelList, loading, error, fetchLabelList };
};
