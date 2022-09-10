import { useStore, component$, useWatch$, useClientEffect$ } from '@builder.io/qwik';
import { Header } from '../header/header';
import { Logo } from '../logo/logo';

export const buttonClicked =(...args: any[]) => {
  console.log('button clicked', ...args);
}

export const getTags: () => Promise<any[]> = async () => {
  const response = await fetch('https://api.realworld.io/api/tags');
  try {
    const data = await response.json() as {tags: any[]};
    console.log('tags', data);
    return data.tags;
  } catch(err) {
    if (!response.ok) {
      console.error(response.statusText)
    }
    return [];
  }

}


export const App = component$(() => {
  const state = useStore({ tags:['tag'] });
  useClientEffect$(async () => {
   state.tags = await getTags();
  })  
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


