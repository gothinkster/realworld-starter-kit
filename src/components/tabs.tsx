import { component$ } from "@builder.io/qwik"

export interface TabsProps {
  tabList: {
    title: string
    active: boolean
    href: string
  }[]
}

export default component$((props: TabsProps) => (
  <ul class="nav nav-pills outline-active">
    {props.tabList.map(tab => (
      <li className="nav-item"  >
        <a class={`nav-link ${tab.active ? "active" : ""}`} href={tab.href}>{tab.title}</a>
      </li>
    ))}
  </ul>
))
