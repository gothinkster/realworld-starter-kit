import { component$, PropFunction, QRL, useStore } from "@builder.io/qwik";
import { NavItem } from "./nav-item";
import "./feed-navigation.css";
import { callbackify } from "util";
interface ComponentState {
  activeTab: NavItem | undefined;
}

export const changeNavigation = (
  state: ComponentState,
  nav: NavItem,
  callback: (tab: NavItem) => void
) => {
  state.activeTab = nav;
  callback(nav);
};
export const FeedNavigation = component$(
  (props: { tabs: NavItem[]; navigationChange$: QRL<(tab) => void> }) => {
    const state: ComponentState = useStore({
      activeTab: undefined,
    });

    return (
      <ul class="nav-list">
        {props.tabs.map((tab) => (
          <li class={tab !== state.activeTab ? "nav-item" : "nav-item active"}>
            <a
              onClick$={() =>
                changeNavigation(state, tab, props.navigationChange$)
              }
            >
              {" "}
              {tab.label}
            </a>
          </li>
        ))}
      </ul>
    );
  }
);
