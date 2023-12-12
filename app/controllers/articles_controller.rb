class ArticlesController < ApplicationController
  skip_before_action :verify_authenticity_token

  def new
    @article = Article.new
  end

  def create
    @article = Article.new(article_params)
    if @article.save
      redirect_to root_path
    else
      render :new
    end
  end

  def edit
    @article = Article.find(params[:id])
  end

def update
  @article = Article.find(params[:id])
  @article.update(article_params)

  if @article.update(article_params)
    redirect_to root_path
  else
    render :edit
  end

end

  def show
    @article = Article.find(params[:id])
  end

  def destroy
    @article = Article.find(params[:id])
    @article.destroy
    redirect_to root_path
  end

  private

  def article_params
    params.require(:article).permit(:title, :description, :body)
  end
end
