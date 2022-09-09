import { useStore, component$, useWatch$, useClientEffect$ } from '@builder.io/qwik';
import { Logo } from '../logo/logo';
//import  fetch from 'node-fetch';

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
      {/* <Logo /> */}
      <ul>
        {state.tags.map(tag => <li>{tag}</li>)}
      </ul>
      <h1 class="text-3xl mb-2">This is where realworld app goes</h1>
      <button onClick$={ (...args) => buttonClicked(args)}>Click</button>
    </div>
  );
});


