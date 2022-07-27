export default ({ onChange, placeholder, value, type = 'text', disabled = false }) => {
	return (
		<fieldset class='form-group'>
			<input
				class='form-control form-control-lg'
				type={type}
				value={value}
				disabled={disabled}
				onChange={onChange}
				placeholder={placeholder}
			/>
		</fieldset>
	)
}
