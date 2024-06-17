import React, { createContext, useContext, useEffect, useState } from 'react';
import { useCheckList } from '~/features/issue/hooks';

const CheckContext = createContext();

export const CheckProvider = ({ children, id }) => {
	const [check, checkDispatch] = useCheckList(id);

	return (
		<CheckContext.Provider value={{ check, checkDispatch }}>
			{children}
		</CheckContext.Provider>
	);
};

export const useCheck = () => {
	const context = useContext(CheckContext);
	if (!context) {
		throw new Error('useCheck must be used within a CheckProvider');
	}
	return context;
};
