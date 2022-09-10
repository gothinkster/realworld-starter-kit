import { useStore, component$, useWatch$, useClientEffect$ } from '@builder.io/qwik';
import { Header } from '../header/header';
import { Logo } from '../logo/logo';
import axios from 'axios';
export const buttonClicked =(...args: any[]) => {
  console.log('button clicked', ...args);
}

export const getTags = async () => {
  const response = await axios.get('https://api.realworld.io/api/tags');
  return response.data.tags;
}

export const App = component$(async () => {

  const state = useStore({ tags:['tag'] });

  const tags = await getTags();
  state.tags = tags;
  return (
    <div class="my-app p-20">
      <Header></Header>
      {/* <Logo /> */}
      <ul>
        {state.tags.map(tag => <li>{tag}</li>)}
      </ul>
      <button onClick$={ (...args) => buttonClicked(args)}>Click</button>
    </div>
  );
});


