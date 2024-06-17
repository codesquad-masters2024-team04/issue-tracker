import styled from 'styled-components';
import { useEffect, useState, useContext } from 'react';
import {
	IconPlus,
	IconXsquare,
	IconRefresh,
	IconChevronDown,
	IconEdit,
} from '~/common/icons';
import { Input } from 'antd';
import { Button, Label, InputRadio } from '~/common/components';
import { putLabel, addLabel } from '~/features/label/apis';
import { colorGenerator } from '~/utils/util';
import { LabelContext } from '../context/LabelContext';

export function LabelRegister({
	isEdit,
	setIsEdit,
	label,
	newLabel,
	setNewLabel,
}) {
	const [preview, setPreview] = useState({
		name: '',
		description: '',
		backgroundColor: '',
		textColor: '#6E7191',
	});
	const { fetchLabelList } = useContext(LabelContext);
	const handleEditLabel = async () => {
		try {
			await putLabel(label.id, preview);
			await fetchLabelList();
			setIsEdit(prev => !prev);
		} catch (error) {
			console.error('Error adding label');
		}
	};

	const handleAddLabel = async () => {
		try {
			await addLabel(preview);
			await fetchLabelList();
			await setNewLabel(prev => !prev);
		} catch (error) {
			console.error('Error adding label');
		}
	};

	useEffect(() => {
		if (isEdit) {
			setPreview({
				name: label.name,
				description: label.description,
				textColor: label.textColor,
				backgroundColor: label.backgroundColor,
			});
		}
	}, [isEdit, label]);

	const handleTextColor = e => {
		switch (e.target.value) {
			case '밝은 색상':
				setPreview({ ...preview, textColor: '#FEFEFE' });
				break;
			case '어두운 색상':
				setPreview({ ...preview, textColor: '#6E7191' });
				break;
			default:
				break;
		}
	};
	const isFormFilled = () => {
		for (let key in preview) {
			if (key !== 'description' && preview[key] === '') {
				return false;
			}
		}
		return true;
	};
	return (
		<StyledRegister>
			<h3>{isEdit ? '레이블 편집' : '새로운 레이블 추가'}</h3>
			<div className='register'>
				<div className='preview'>
					<StyledLabel
						className='label'
						name={preview.name}
						textColor={preview.textColor}
						backgroundColor={preview.backgroundColor}
					/>
				</div>
				<div className='inputs'>
					<Input
						placeholder='레이블의 이름을 입력하세요'
						value={preview.name}
						onChange={e => {
							setPreview({ ...preview, name: e.target.value });
						}}
						variant='filled'
					/>
					<Input
						placeholder='레이블에 대한 설명을 입력하세요'
						variant='filled'
						value={preview.description}
						onChange={e => {
							setPreview({ ...preview, description: e.target.value });
						}}
					/>
					<div className='colors'>
						<span className='generator'>
							<Input
								placeholder='색상고르기'
								variant='filled'
								value={preview.backgroundColor}
								onChange={e => {
									setPreview({
										...preview,
										backgroundColor: e.target.value,
									});
								}}
							/>
							<button
								onClick={() => {
									setPreview({
										...preview,
										backgroundColor: colorGenerator(),
									});
								}}
							>
								<IconRefresh />
							</button>
						</span>
						<details>
							<summary>
								텍스트 색상 <IconChevronDown />
							</summary>
							<span className='radios'>
								<InputRadio
									value='밝은 색상'
									listName='textColor'
									onChange={e => handleTextColor(e)}
								/>
								<InputRadio
									value='어두운 색상'
									listName='textColor'
									onChange={e => handleTextColor(e)}
									defaultChecked={true}
								/>
							</span>
						</details>
					</div>
				</div>
			</div>
			<div className='buttons'>
				{isEdit ? (
					<>
						<Button
							type='button'
							buttonType='outlined'
							size='small'
							buttonText='취소'
							onClick={() => {
								setIsEdit(prev => !prev);
							}}
							icon={<IconXsquare />}
						/>
						<Button
							type='button'
							size='small'
							buttonText='편집 완료'
							onClick={handleEditLabel}
							icon={<IconEdit />}
						/>
					</>
				) : (
					<>
						<Button
							type='button'
							buttonType='outlined'
							size='small'
							buttonText='취소'
							onClick={() => setNewLabel(!newLabel)}
							icon={<IconXsquare />}
						/>
						<Button
							type='button'
							size='small'
							buttonText='작성완료'
							disabled={!isFormFilled()}
							onClick={handleAddLabel}
							icon={<IconPlus />}
						/>
					</>
				)}
			</div>
		</StyledRegister>
	);
}
const StyledRegister = styled.section`
	width: 100%;
	height: 337px;
	border: 1px solid ${({ theme }) => theme.color.neutral.border.default};
	border-radius: ${({ theme }) => theme.radius.medium};
	background-color: ${({ theme }) => theme.color.neutral.surface.strong};
	padding: 32px;
	margin-bottom: 24px;
	h3 {
		${({ theme }) => theme.typography.bold[20]};
		margin-bottom: 24px;
	}
	.buttons {
		display: flex;
		margin-top: 24px;
		justify-content: flex-end;
		width: 100%;
		column-gap: 24px;
	}
	.register {
		display: flex;
		.preview {
			margin-right: 24px;
			width: 288px;
			height: 153px;
			border-radius: 11px;
			border: 1px solid ${({ theme }) => theme.color.neutral.border.default};
			display: flex;
			align-items: center;
			justify-content: center;
		}
		.inputs {
			width: 100%;
			display: flex;
			flex-direction: column;
			justify-content: space-between;
			row-gap: 16px;
			.generator {
				position: relative;
				width: 240px;
				height: 40px;

				input {
					width: 100%;
					height: 100%;
				}
				button {
					position: absolute;
					top: 50%;
					right: 12px;
					transform: translateY(-50%);
					color: ${({ theme }) => theme.color.neutral.text.default};
				}
			}
			.colors {
				display: flex;
				column-gap: 24px;
				align-items: center;
				details {
					position: relative;
					.radios {
						position: absolute;
						top: 100%;
						left: 50%;
						width: 145%;
						transform: translateX(-50%);
					}
					summary {
						display: flex;
						align-items: center;
						column-gap: 4px;
						padding: 4px 0;
						color: ${({ theme }) => theme.color.neutral.text.default};
						${({ theme }) => theme.typography.medium[14]};
						cursor: pointer;

						&::after {
							content: '';
						}

						svg {
							width: 12px;
							height: 12px;
						}
					}
				}
			}
		}
	}
`;
const StyledLabel = styled(Label)`
	// background-color: ${({ $backgroundColor }) => $backgroundColor};
`;
