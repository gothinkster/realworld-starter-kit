type ButtonProps = {
	type: 'submit' | 'button'
	disabled?: boolean
	textContent?: string | number
}

export default ({ type = 'submit', disabled = false, textContent = 'Submit' }: ButtonProps) => {
	return (
		<button
			class='btn btn-lg btn-primary pull-xs-right'
			type={type}
			disabled={disabled}
			textContent={textContent}
		/>
	)
}
