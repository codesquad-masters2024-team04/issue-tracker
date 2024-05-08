import styled from 'styled-components';
import { Button as AntdButton } from 'antd';

export function Button({ children, className, type, disabled = false }) {
	return (
		<>
			<StyledAntdButton className={className} type={type} $disabled={disabled}>
				{children}
			</StyledAntdButton>
		</>
	);
}
const StyledAntdButton = styled(AntdButton)`
	display: block;
`;
