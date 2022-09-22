import { component$, QRL, useStore } from "@builder.io/qwik";
import { NavItem } from "./nav-item";
import "./feed-navigation.css";
interface ComponentState {
  activeTab: string | undefined;
}

export const changeNavigation = (
  state: ComponentState,
  nav: string,
  callback: (tab: string) => void
) => {
  state.activeTab = nav;
  callback(nav);
};
export const FeedNavigation = component$(
  (props: {
    tabs: string[];
    navigationChange$: QRL<(tab: string) => void>;
    activeTab?: NavItem;
  }) => {
    const state: ComponentState = useStore(
      {
        activeTab: props.activeTab?.label || props.tabs[0],
      },
      { recursive: true }
    );

    return (
      <ul class="nav-list">
        {props.tabs.map((tab) => (
          <li
            class={
              tab !== props.activeTab?.label ? "nav-item" : "nav-item active"
            }
          >
            <a
              onClick$={() =>
                changeNavigation(state, tab, props.navigationChange$)
              }
            >
              {" "}
              {tab}
            </a>
          </li>
        ))}
      </ul>
    );
  }
);
