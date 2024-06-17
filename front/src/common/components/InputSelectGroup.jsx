import { InputSelect } from '~/common/components';
export function InputSelectGroup({
	id,
	type,
	listName,
	value,
	src,
	fontColor,
	bgColor,
	onChange,
	checked,
}) {
	return (
		<>
			<InputSelect
				id={id}
				type={type}
				listName={listName}
				value={value}
				src={src}
				fontColor={fontColor}
				bgColor={bgColor}
				checked={checked}
				onChange={onChange}
			/>
		</>
	);
}
