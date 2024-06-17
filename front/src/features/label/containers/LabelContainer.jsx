import styled from 'styled-components';
import { useState, useContext } from 'react';

import { IconPlus } from '~/common/icons';
import { LabelMilestoneCounterProvider } from '~/context/LabelMilestoneCounter';

import {
	Tabs,
	ListHeader,
	ListBody,
	Button,
	Loading,
} from '~/common/components';

import { LabelRegister, LabelListItem } from '~/features/label/components';
import { LabelContext } from '../context/LabelContext';

export function LabelContainer() {
	const [newLabel, setNewLabel] = useState(false);
	const { labelList, loading, fetchLabelList } = useContext(LabelContext);

	return (
		<>
			<StyledWrapper>
				<div className='container-header'>
					<LabelMilestoneCounterProvider>
						<Tabs />
					</LabelMilestoneCounterProvider>

					<Button
						type='button'
						size='small'
						buttonText='레이블 추가'
						icon={<IconPlus />}
						disabled={newLabel}
						onClick={() => {
							setNewLabel(true);
						}}
					/>
				</div>
				{newLabel && (
					<LabelRegister newLabel={newLabel} setNewLabel={setNewLabel} />
				)}

				<StyledListHeader>
					<StyledLabeCount>{labelList.length}개의 레이블</StyledLabeCount>
				</StyledListHeader>
				<ListBody>
					{loading && <Loading size='big' />}
					{labelList?.map(label => (
						<LabelListItem
							key={label.id}
							label={label}
							fetchLabelList={fetchLabelList}
						/>
					))}
				</ListBody>
			</StyledWrapper>
		</>
	);
}
const StyledWrapper = styled.div`
	.container-header {
		display: flex;
		justify-content: space-between;
		align-items: center;
		margin-bottom: 24px;
	}
`;
const StyledListHeader = styled(ListHeader)``;
const StyledLabeCount = styled.strong`
	${({ theme }) => theme.typography.bold[16]};
	color: ${({ theme }) => theme.color.neutral.text.default};
`;
