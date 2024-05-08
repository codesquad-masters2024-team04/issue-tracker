import styled from 'styled-components';
import { IssueItem } from '../components/IssueItem';

export function IssueListViewContainer() {
	return (
		<>
			<StyledWrapper>
				<StyledFilter></StyledFilter>
				<IssueItem />
			</StyledWrapper>
		</>
	);
}
const StyledWrapper = styled.div`
	border: 1px solid #d9dbe9;
	border-radius: 16px;
	overflow: hidden;
`;
const StyledFilter = styled.div`
	width: 100%;
	height: 64px;
	border-bottom: 1px solid #d9dbe9;
	background-color: #f7f7fc;
`;
