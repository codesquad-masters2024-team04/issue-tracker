import styled from 'styled-components';
import { SignInPage } from './features/signIn/pages/SignInPage';

function App() {
	return (
		<>
			<StyledWrapper>
				<SignInPage />
			</StyledWrapper>
		</>
	);
}

const StyledWrapper = styled.div``;
export default App;
