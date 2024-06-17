import { useState, useContext } from 'react';

import styled from 'styled-components';
import { IconEdit, IconTrash } from '~/common/icons';
import { Button, Label } from '~/common/components';
import { LabelRegister } from '~/features/label/components';
import { LabelContext } from '~/features/label/context/LabelContext';
import { deleteLabel } from '~/features/label/apis';
export function LabelListItem({ label }) {
	const [isEdit, setIsEdit] = useState(false);
	const { fetchLabelList } = useContext(LabelContext);

	const handleDeleteLabel = async () => {
		try {
			await deleteLabel(label.id, label.name);
			await fetchLabelList();
		} catch (error) {
			console.error('Error deleting label');
		}
	};
	return (
		<StyledListItem key={label.id}>
			{isEdit ? (
				<LabelRegister isEdit={isEdit} setIsEdit={setIsEdit} label={label} />
			) : (
				<>
					<Label
						className='label'
						name={label.name}
						textColor={label.textColor}
						backgroundColor={label.backgroundColor}
					/>
					<StyledLabelInfo>{label.description}</StyledLabelInfo>
					<div className='button-list'>
						<Button
							type='button'
							buttonType='ghost'
							size='small'
							buttonText='편집'
							icon={<IconEdit />}
							onClick={() => setIsEdit(true)}
						/>
						<Button
							type='button'
							buttonType='ghost'
							size='small'
							buttonText='삭제'
							icon={<IconTrash />}
							onClick={handleDeleteLabel}
						/>
					</div>
				</>
			)}
		</StyledListItem>
	);
}
const StyledListItem = styled.div`
	width: 100%;
	justify-content: space-between;
	padding: 32px;
	display: flex;
	align-items: center;
	border-bottom: 1px solid ${({ theme }) => theme.color.neutral.border.default};
	&:last-child {
		border-bottom: none;
	}
	.button-list {
		display: flex;
		column-gap: 24px;
		button {
			min-width: auto;
			width: 41px;
			padding: 8px 0;
			column-gap: 4px;
			&:last-child {
				color: ${({ theme }) => theme.color.danger.text.default};
			}
		}
	}
`;

const StyledLabelInfo = styled.span`
	max-width: 870px;

	text-overflow: ellipsis;
	overflow: hidden;
	white-space: nowrap;
`;
