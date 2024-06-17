import { createContext } from 'react';
import { useUser } from '../common/hooks/useUser';

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
	const { user, fetchUser } = useUser();

	return (
		<UserContext.Provider value={{ user, fetchUser }}>
			{children}
		</UserContext.Provider>
	);
};
