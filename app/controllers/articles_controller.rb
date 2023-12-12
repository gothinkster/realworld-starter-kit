class ArticlesController < ApplicationController
  skip_before_action :verify_authenticity_token
  before_action :set_article, except:[:new, :create]
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
  end

def update
  @article.update(article_params)

  if @article.update(article_params)
    redirect_to root_path
  else
    render :edit
  end

end

  def show
  end

  def destroy
    
    @article.destroy
    redirect_to root_path
  end

  private

  def article_params
    params.require(:article).permit(:title, :description, :body)
  end

  def set_article 
    @article = @article = Article.find(params[:id])
  end
end
