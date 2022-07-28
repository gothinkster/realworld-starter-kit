type TextInputProps = {
  children?: any;
  value: string;
  disabled?: boolean;
  placeholder: string;
  onBlur?: (ev: any) => void;
  onKeyUp?: (ev: any) => void;
  onChange?: (ev: any) => void;
  type?: "text" | "password";
};

export default (props: TextInputProps) => {
  return (
    <fieldset class="form-group">
      <input
        class="form-control form-control-lg"
        type={props.type}
        value={props.value}
        disabled={props.disabled}
        onBlur={props.onBlur}
        onKeyUp={props.onKeyUp}
        onChange={props.onChange}
        placeholder={props.placeholder}
      />
      {props.children}
    </fieldset>
  );
};
