export default (_props) => {
  const props = mergeProps({ disabled: false, rows: "8" }, _props);
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
