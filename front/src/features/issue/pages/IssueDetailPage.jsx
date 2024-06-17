import { useParams } from 'react-router-dom';
import { IssueDetailContainer } from '../containers/IssueDetailContainer';
import { InnerLayout } from '../../../common/components/InnerLayout';
import { CheckProvider } from '../context/CheckProvider';

export function IssueDetailPage() {
	const { id } = useParams();
	return (
		<CheckProvider id={id}>
			<InnerLayout>
				<IssueDetailContainer />
			</InnerLayout>
		</CheckProvider>
	);
}
