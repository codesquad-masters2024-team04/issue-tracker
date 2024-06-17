import styled from 'styled-components';

export function IconPlus({ className }) {
	return (
		<StyledWrapper className={className}>
			<svg
				width='16'
				height='16'
				viewBox='0 0 16 16'
				fill='none'
				xmlns='http://www.w3.org/2000/svg'
			>
				<path
					d='M8 3.33337V12.6667'
					stroke='currentColor'
					strokeWidth='1.6'
					strokeLinecap='round'
					strokeLinejoin='round'
				/>
				<path
					d='M3.3335 8H12.6668'
					stroke='currentColor'
					strokeWidth='1.6'
					strokeLinecap='round'
					strokeLinejoin='round'
				/>
			</svg>
		</StyledWrapper>
	);
}
const StyledWrapper = styled.i`
	padding: 0;
`;
