import { Link } from 'react-router-dom';
import styled, { keyframes } from 'styled-components';
import { InnerLayout } from '~/common/components';
import { Logo } from '../../../common/Logo';
import { useAuthUser } from '~/common/hooks';
import { IconUser } from '~/common/icons';

export function GlobalHeader({ ...props }) {
	const { authUser } = useAuthUser();
	return (
		<StyledHeader {...props}>
			<StyledInnerLayout>
				<StyledLink to='/issues'>
					<Logo />
				</StyledLink>
				<StyledUserInfo>
					<p className='greeting'>
						<span className='greeting-text'>
							안녕하세요, {authUser?.loginId}님!
						</span>
					</p>
					{!authUser?.profileImage ? (
						<StyledUser />
					) : (
						<img src={authUser?.profileImage} alt={authUser?.loginId} />
					)}
				</StyledUserInfo>
			</StyledInnerLayout>
		</StyledHeader>
	);
}

const typing = keyframes`
from { width: 0; }
to { width: 100%; }
}
`;

const blinkcaret = keyframes`
from, to {opacity:0; }
    50% { opacity:1;}
}
`;

const StyledHeader = styled.header`
	margin-bottom: 32px;
	height: 94px;
	display: flex;
	align-items: center;
	& > div {
		height: 100%;
	}
`;
const StyledInnerLayout = styled(InnerLayout)`
	display: flex;
	justify-content: space-between;
	align-items: center;
	padding-bottom: 0;
`;
const StyledLink = styled(Link)`
	display: block;
	width: 199px;
`;
const StyledUserInfo = styled.div`
	display: flex;
	align-items: center;
	gap: 8px;
	img {
		width: 32px;
		height: 32px;
		border-radius: 50%;
	}
	.greeting {
		// background: ${({ theme }) => theme.color.brand.border.default};
		text-align: center;
		position: relative;
		margin-right: 10px;
		// border-radius: 20px;
		// padding: 7px 18px;
		// color: ${({ theme }) => theme.color.neutral.surface.strong};
		color: ${({ theme }) => theme.color.brand.border.default};
		${({ theme }) => theme.typography.medium[16]};
		line-height: 15px;

		// &::before {
		// 	content: '';
		// 	position: absolute;
		// 	z-index: 0;
		// 	bottom: 0;
		// 	right: -8px;
		// 	height: 20px;
		// 	width: 20px;
		// 	background: rgb(0, 120, 254);
		// 	border-bottom-left-radius: 15px;
		// }
		// &::after {
		// 	content: '';
		// 	position: absolute;
		// 	z-index: 1;
		// 	bottom: 0;
		// 	right: -4.4%;
		// 	width: 10px;
		// 	height: 21px;
		// 	background: #f7f7fc;
		// 	border-bottom-left-radius: 10px;
		// }
		.greeting-text {
			position: relative;
			display: inline-block;
			overflow: hidden;
			white-space: nowrap;
			animation: ${typing} 3.5s steps(40, end);
		}
	}
`;
const StyledUser = styled(IconUser)`
	width: 32px;
	height: 32px;
`;
