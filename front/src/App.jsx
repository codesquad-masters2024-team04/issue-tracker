import styled from 'styled-components';
import { SignInPage } from './features/signIn/pages/SignInPage';
import { IssueListViewsPage } from './features/issue/pages/IssueListViewsPage';
import { GlobalStyle } from './styles/globalStyle';

function App() {
	return (
		<>
			<GlobalStyle />
			<StyledWrapper>
				{/* <SignInPage /> */}
				<IssueListViewsPage />
			</StyledWrapper>
		</>
	);
}

const StyledWrapper = styled.div``;
export default App;
