require 'grape'

module Conduit
  class API < Grape::API
    version 'v1', :using => :path
    format :json

    desc 'healthcheck'
    get :ping do
      {"hello": "world"}
    end
  end
end
