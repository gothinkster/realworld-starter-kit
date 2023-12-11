class HomeController < ApplicationController
  def index
    @articles = Article.all
  end
end
