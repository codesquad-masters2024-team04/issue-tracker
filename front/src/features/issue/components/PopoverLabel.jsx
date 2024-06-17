import { Dropdowns } from '~/common/components';
import { InputSelectGroup } from '~/common/components';
import { useLabelList } from '~/features/issue/hooks';

export function PopoverLabel({
	dropdownTitle,
	type,
	onChange,
	checkedItems,
	...props
}) {
	const { labelList } = useLabelList();

	return (
		<Dropdowns dropdownTitle={dropdownTitle} {...props}>
			{labelList?.map(label => (
				<InputSelectGroup
					key={label.id}
					id={label.id}
					type={type}
					listName='labels'
					value={label.name}
					bgColor={label.backgroundColor}
					fontColor={label.textColor}
					checked={checkedItems.includes(label.name)}
					onChange={onChange}
				/>
			))}
		</Dropdowns>
	);
}
