import styled from 'styled-components';

export function InnerLayout({ children, className }) {
	return <StyledWrapper className={className}>{children}</StyledWrapper>;
}
const StyledWrapper = styled.div`
	position: relative;
	width: 1280px;
	min-width: 1024px;
	margin: 0 auto;
	padding-bottom: 100px;
`;
