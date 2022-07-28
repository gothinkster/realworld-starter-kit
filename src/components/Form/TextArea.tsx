type TextAreaProps = {
  children?: any;
  value: string;
  disabled?: boolean;
  placeholder: string;
  onChange?: (ev: any) => void;
  type?: "text" | "password";
};

export default (props: TextAreaProps) => {
  return (
    <fieldset class="form-group">
      <textarea
        class="form-control form-control-lg"
        rows={props.rows}
        placeholder={props.placeholder}
        value={props.value}
        onChange={props.onChange}
        disabled={props.disabled}
      />
    </fieldset>
  );
};
