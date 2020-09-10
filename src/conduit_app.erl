-module(conduit_app).

-behaviour(application).

-behaviour(supervisor).

-export([init/1, start/2, stop/1]).

start(_StartType, _StartArgs) ->
    supervisor:start_link({local, ?MODULE}, ?MODULE, []).

stop(_State) -> ok.

init([]) ->
    SupFlags = #{strategy => one_for_all},
    ChildSpecs = [#{id => conduit_elli_service,
                    start =>
                        {gleam@http@elli, start, [fun conduit:service/1, 3000]},
                    modules => [elli]},
                  #{id => conduit_pgo_pool,
                    start =>
                        {pgo_pool,
                         start_link,
                         [default,
                          #{user => "postgres", password => "postgres",
                            database => "conduit_dev"}]},
                    shutdown => 1000}],
    {ok, {SupFlags, ChildSpecs}}.
