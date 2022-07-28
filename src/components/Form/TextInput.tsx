type TextInputAttributes = {
	children?: any
	value: string
	disabled?: boolean
	placeholder: string
	onBlur?: (ev: any) => void
	onKeyUp?: (ev: any) => void
	onChange?: (ev: any) => void
	type?: 'text' | 'password'
}

export default ({
	value,
	onBlur,
	onKeyUp,
	onChange,
	children,
	placeholder,
	type = 'text',
	disabled = false
}: TextInputAttributes) => {
	return (
		<fieldset class='form-group'>
			<input
				class='form-control form-control-lg'
				type={type}
				value={value}
				disabled={disabled}
				onBlur={onBlur}
				onKeyUp={onKeyUp}
				onChange={onChange}
				placeholder={placeholder}
			/>
			{children}
		</fieldset>
	)
}
