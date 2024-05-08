import styled from 'styled-components';
import { IssueListViewContainer } from '../containers/IssueListViewContainer';

export function IssueListViewsPage() {
	return (
		<StyledWrapper>
			<IssueListViewContainer />
		</StyledWrapper>
	);
}
const StyledWrapper = styled.div`
	padding: 0;
`;
