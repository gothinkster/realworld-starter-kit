class HomeController < ApplicationController
  def index
    @article = Article.new
  end
end
