import { JSX } from "solid-js";
import { createStore } from "solid-js/store";
import { useNavigate } from "solid-app-router";

import Button from "./Button";
import ListErrors from "./ListErrors";

type FormState = {
  inProgress: boolean;
  errors?: string[];
};

export default (props: {
  class?: string;
  buttonText?: string;
  children?:
    | number
    | boolean
    | Node
    | JSX.ArrayElement
    | JSX.FunctionElement
    | (string & {});
  redirect?: string;
  submitFn: (event: Event) => Promise<void> | Promise<any>;
  postSubmitFn?: () => Promise<void> | void;
}) => {
  const {
    buttonText,
    submitFn,
    children,
    postSubmitFn = () => {},
    redirect = "/",
  } = props;
  const [state, setState] = createStore<FormState>({
    inProgress: false,
  });

  const navigate = useNavigate();

  const handleSubmit = async (event: Event) => {
    event.preventDefault();
    setState({ inProgress: true });
    submitFn(event)
      .then((resp) => {
        const url = resp?.slug ? `${redirect}/${resp.slug}` : redirect;
        return navigate(url);
      })
      .catch((errors: string[]) => setState({ errors }))
      .finally(() => setState({ inProgress: false }));

    return postSubmitFn();
  };

  return (
    <>
      <ListErrors errors={state.errors} />
      <form class={props.class} onSubmit={handleSubmit}>
        <fieldset>
          {children}
          <Button
            disabled={state.inProgress}
            type="submit"
            textContent={buttonText}
          />
        </fieldset>
      </form>
    </>
  );
};
