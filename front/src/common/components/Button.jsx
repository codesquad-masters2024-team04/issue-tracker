import styled from 'styled-components';
import { theme } from '~/styles/theme';

export function Button({
	className,
	type, // button, submit, reset
	size = 'small', // small, medium, large
	buttonType = 'container', // container, outline, ghost
	disabled,
	icon = null, //ReactNode
	onClick,
	onSubmit,
	buttonText,
}) {
	return (
		<StyledAntdButton
			className={className}
			type={type}
			$size={size}
			$buttonType={buttonType}
			disabled={disabled}
			onClick={onClick}
			onSubmit={onSubmit}
		>
			{icon && icon}
			{buttonText}
		</StyledAntdButton>
	);
}

const StyledAntdButton = styled.button`
	display: flex;
	align-items: center;
	justify-content: center;
	${props => theme.buttonSizes[props.$size]}
	${props => theme.buttonStyles[props.$buttonType]}
	&:disabled {
		cursor: not-allowed;
	}
`;

{
	/* <Button size="large" buttonType="outline">Click me</Button> */
}
