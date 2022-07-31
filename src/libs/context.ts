import { createContext} from '@builder.io/qwik';
import { components } from './api-schema';

export const SessionContext = createContext<{
  user?: components["schemas"]["User"]
}>('realworld-session-context');
