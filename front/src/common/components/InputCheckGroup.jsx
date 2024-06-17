import { InputSelect } from '~/common/components';
export function InputCheckGroup({ data, listName, onChange, checked }) {
	return (
		<>
			{data.map((item, index) => (
				<InputSelect
					key={index}
					type='checkbox'
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
