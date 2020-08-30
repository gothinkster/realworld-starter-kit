-module(conduit_app).

-behaviour(application).
-behaviour(supervisor).

-export([start/2, stop/1, init/1]).

start(_StartType, _StartArgs) ->
    supervisor:start_link({local, ?MODULE}, ?MODULE, []).

stop(_State) ->
    ok.

%% child_spec() = #{id => child_id(),       % mandatory
%%                  start => mfargs(),       % mandatory
%%                  restart => restart(),    % optional
%%                  shutdown => shutdown(),  % optional
%%                  type => worker(),        % optional
%%                  modules => modules()}   % optional
init([]) ->
    SupFlags = #{strategy => one_for_all},
    ChildSpecs = [
        #{
            id => conduit,
            start => {gleam@http@elli, start, [fun conduit:service/1, 3000]},
            modules => [elli]
        }
    ],
    {ok, {SupFlags, ChildSpecs}}.
