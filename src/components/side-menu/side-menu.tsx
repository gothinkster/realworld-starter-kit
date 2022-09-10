import { component$ } from '@builder.io/qwik';
import './side-menu.css';

export const SideMenu = component$(() => {
    return(
        <div className='menu'>
            <a className='menu-item'>Home</a>
            <a className='menu-item'>Sign up</a>
            <a className='menu-item'>Log in</a>

        </div>
    )
})