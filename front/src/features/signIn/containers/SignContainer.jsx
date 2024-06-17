import { useState, useEffect } from 'react';

import styled, { keyframes } from 'styled-components';

import { Logo } from '../../../common/Logo';
import { Button } from '~/common/components';
import { getUser } from '~/features/signIn/apis';
import { Input, message } from 'antd';
import { useNavigate } from 'react-router-dom';

export function SignContainer() {
	const [id, setId] = useState('');
	const [password, setPassword] = useState('');
	const navigate = useNavigate();

	const submitLogin = async e => {
		e.preventDefault();
		try {
			const response = await getUser(id, password);
			if (response.message === '로그인 성공!') {
				navigate('/issues');
			}
		} catch (error) {
			console.error('Error:', error);
		}
	};

	const [messageApi, contextHolder] = message.useMessage();

	const notReady = () => {
		message.info('현재 준비중인 기능이에요 🥲');
	};

	function githubLogin() {
		window.location.href =
			'https://github.com/login/oauth/authorize?client_id=Ov23ctgKI08kimQTAXXt';
	}

	return (
		<>
			{contextHolder}
			<StyledWrapper>
				<StyledLogo />
				<StyledButton
					className='github'
					type='button'
					size='large'
					buttonType='outline'
					onClick={githubLogin}
					buttonText='GitHub 계정으로 로그인'
				/>
				<b>or</b>

				<StyledInputWrap>
					<StyledId
						placeholder='아이디'
						name='id'
						password='id'
						onChange={e => setId(e.target.value)}
					/>
					<StyledPassword
						placeholder='비밀번호'
						name='password'
						id='password'
						onChange={e => setPassword(e.target.value)}
					/>
				</StyledInputWrap>
				<StyledButton
					type='submit'
					size='large'
					onClick={submitLogin}
					buttonType='container'
					buttonText='아이디로 로그인'
				/>

				<StyledButton
					type='button'
					size='large'
					buttonType='ghost'
					onClick={notReady}
					buttonText='회원가입'
				/>
			</StyledWrapper>
		</>
	);
}

const pulse = keyframes`
	0% {
		transform: scale(1);
	}
	50% {
		transform: scale(1.1);
	}
	100% {
		transform: scale(1);
	}
`;
const StyledWrapper = styled.div`
	width: 342px;
	b {
		text-align: center;
		display: block;
		margin: 14px 0 18px;
	}
	.github {
		animation: ${pulse} 1s infinite;
	}
`;
const StyledLogo = styled(Logo)`
	width: 100%;
	margin-bottom: 64px;
	svg {
		width: 100%;
	}
`;
const StyledButton = styled(Button)`
	width: 100%;
`;
const StyledInputWrap = styled.div``;
const StyledId = styled(Input)`
	margin-bottom: 16px;
`;
const StyledPassword = styled(Input.Password)`
	margin-bottom: 16px;
`;
