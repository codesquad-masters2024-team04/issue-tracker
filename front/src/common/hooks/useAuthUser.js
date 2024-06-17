import { useEffect, useState } from 'react';
import { getAuthUser } from '../apis';

export const useAuthUser = () => {
	const [authUser, setUser] = useState(null);
	const [loading, setLoading] = useState(true);

	const fetchAuthUser = async () => {
		try {
			const data = await getAuthUser();
			setUser(data);
		} catch (error) {
			console.error('Error:', error);
		} finally {
			setLoading(false);
		}
	};

	useEffect(() => {
		fetchAuthUser();
	}, []);

	return { authUser, fetchAuthUser, loading };
};
