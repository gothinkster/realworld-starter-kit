type ButtonProps = {
  type: "submit" | "button";
  disabled?: boolean;
  textContent?: string | number;
};

export default (props: ButtonProps) => {
  return (
    <button
      class="btn btn-lg btn-primary pull-xs-right"
      type={props.type}
      disabled={props.disabled}
      textContent={props.textContent}
    />
  );
};
