import styled from 'styled-components';

export function IconRefresh({ rest }) {
	return (
		<StyledWrapper {...rest}>
			<svg
				width='16'
				height='16'
				viewBox='0 0 16 16'
				fill='none'
				xmlns='http://www.w3.org/2000/svg'
			>
				<g clipPath='url(#clip0_14852_5701)'>
					<path
						d='M0.666504 2.66663V6.66663H4.6665'
						stroke='currentColor'
						strokeWidth='1.6'
						strokeLinecap='round'
						strokeLinejoin='round'
					/>
					<path
						d='M15.3335 13.3334V9.33337H11.3335'
						stroke='currentColor'
						strokeWidth='1.6'
						strokeLinecap='round'
						strokeLinejoin='round'
					/>
					<path
						d='M13.6598 6.00001C13.3217 5.04453 12.7471 4.19028 11.9895 3.51696C11.232 2.84363 10.3162 2.37319 9.32765 2.14952C8.3391 1.92584 7.31 1.95624 6.33638 2.23786C5.36275 2.51948 4.47634 3.04315 3.75984 3.76001L0.666504 6.66668M15.3332 9.33334L12.2398 12.24C11.5233 12.9569 10.6369 13.4805 9.6633 13.7622C8.68967 14.0438 7.66058 14.0742 6.67203 13.8505C5.68348 13.6268 4.7677 13.1564 4.01015 12.4831C3.25259 11.8097 2.67795 10.9555 2.33984 10'
						stroke='currentColor'
						strokeWidth='1.6'
						strokeLinecap='round'
						strokeLinejoin='round'
					/>
				</g>
				<defs>
					<clipPath id='clip0_14852_5701'>
						<rect width='16' height='16' fill='white' />
					</clipPath>
				</defs>
			</svg>
		</StyledWrapper>
	);
}
const StyledWrapper = styled.i`
	padding: 0;
`;
