class ArticlesController < ApplicationController
  def new
    @article = Article.new
  end

  def create
    @article = Article.new(article_params)
    if @article.save
      redirect_to article_path
    else
      render :new
    end
  end

  def edit
  end

  def show
  end

  private

  def article_params
    params.require(:article).permit(:title, :description, :body, :created_at, :update_at)
  end
end
