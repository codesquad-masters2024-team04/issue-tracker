import { Dropdowns } from '~/common/components';
import { InputSelectGroup } from '~/common/components';
import { useMilestoneList } from '~/features/issue/hooks';

export function PopoverMilestone({
	dropdownTitle,
	type,
	onChange,
	checkedItems, // 서버에서 마일스톤 값이 있는 경우
	...props
}) {
	const { milestoneList } = useMilestoneList();

	return (
		<Dropdowns dropdownTitle={dropdownTitle} {...props}>
			{milestoneList?.map((mile, index) => (
				<InputSelectGroup
					id={mile.id}
					key={index}
					type={type}
					listName='milestones'
					value={mile.name}
					checked={checkedItems.name === mile.name ? true : false}
					onChange={onChange}
				/>
			))}
		</Dropdowns>
	);
}
