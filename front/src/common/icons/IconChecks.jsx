import { IconCheckCircle, IconCheckOff } from '~/common/icons';
import styled from 'styled-components';

export function IconChecks({ isCheck, ...props }) {
	return (
		<StyledWrapper {...props}>
			{isCheck ? <IconCheckCircle /> : <IconCheckOff />}
		</StyledWrapper>
	);
}
const StyledWrapper = styled.i`
	padding: 0;
`;
