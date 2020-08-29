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
    SupFlags = #{strategy => one_for_all,
                 intensity => 0,
                 period => 1},
    ChildSpecs = [],
    {ok, {SupFlags, ChildSpecs}}.
