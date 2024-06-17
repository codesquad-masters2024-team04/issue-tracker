import { useContext } from 'react';
import { IssueContext } from '~/context';

export function useIssueContext() {
	return useContext(IssueContext);
}
