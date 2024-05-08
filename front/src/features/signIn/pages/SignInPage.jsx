import styled from 'styled-components';
import { SignContainer } from '../containers/SignContainer';
export function SignInPage() {
	return (
		<StyledWrapper>
			<StyledSignIn>
				<SignContainer />
			</StyledSignIn>
		</StyledWrapper>
	);
}
const StyledWrapper = styled.div`
	width: 100%;
	height: 100vh;
	display: flex;
	justify-content: center;
	align-items: center;
`;
const StyledSignIn = styled.div``;
