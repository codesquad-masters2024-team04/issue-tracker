import { Dropdowns } from '~/common/components';
import { InputSelectGroup } from '~/common/components';
import { useUser } from '~/common/hooks';

export function PopoverAssignee({
	dropdownTitle,
	type,
	onChange,
	checkedItems,
	...props
}) {
	const { userList } = useUser();

	return (
		<Dropdowns dropdownTitle={dropdownTitle} {...props}>
			{userList?.map((user, index) => (
				<InputSelectGroup
					id={user.loginId}
					key={index}
					type={type}
					listName='assignee'
					value={user.loginId}
					src={user.profileImage}
					checked={checkedItems.includes(user.loginId)}
					onChange={onChange}
				/>
			))}
		</Dropdowns>
	);
}
