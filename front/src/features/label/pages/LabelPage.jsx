import { LabelContainer } from '~/features/label/containers';
import { InnerLayout } from '~/common/components';
import { LabelProvider } from '../context/LabelContext';
export function LabelPage() {
	return (
		<InnerLayout>
			<LabelProvider>
				<LabelContainer />
			</LabelProvider>
		</InnerLayout>
	);
}
