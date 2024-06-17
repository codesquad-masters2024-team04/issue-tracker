import styled from 'styled-components';
import { InnerLayout } from '~/common/components/InnerLayout';
import { IssueCreateContainer } from '~/features/issue/containers/IssueCreateContainer';
import { CheckProvider } from '~/features/issue/context/CheckProvider';

export function IssueCreatePage() {
	return (
		<CheckProvider id={null}>
			{/* 새로운 이슈 생성 시 id 없음 */}
			<StyledInnerLayout>
				<IssueCreateContainer />
			</StyledInnerLayout>
		</CheckProvider>
	);
}

const StyledInnerLayout = styled(InnerLayout)``;
