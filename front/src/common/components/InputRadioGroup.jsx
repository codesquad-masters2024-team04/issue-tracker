import { InputSelect } from '~/common/components';
export function InputRadioGroup({ data, listName, checked, onChange }) {
	return (
		<>
			{data.map((item, index) => (
				<InputSelect
					key={index}
					type='radio'
					listName={listName}
					value={item.value}
					src={item.src}
					checked={checked}
					onChange={onChange}
				/>
			))}
		</>
	);
}
