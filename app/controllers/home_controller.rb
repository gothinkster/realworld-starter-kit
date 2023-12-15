class HomeController < ApplicationController
  def index
    @articles = Article.includes(:user).order("created_at DESC")
  end
end
