export default ({ onChange, placeholder, value, disabled = false, rows = '8' }) => {
	return (
		<fieldset class='form-group'>
			<textarea
				class='form-control form-control-lg'
				rows={rows}
				placeholder={placeholder}
				value={value}
				onChange={onChange}
				disabled={disabled}
			></textarea>
		</fieldset>
	)
}
