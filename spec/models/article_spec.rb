require 'rails_helper'

RSpec.describe Article, type: :model do
  describe '記事の新規投稿' do
    it '記事のタイトルが空では登録できない' do
      article = Article.new(title: nil, description: 'Test description', body: 'Test body')
      expect(article).to_not be_valid
      expect(article.errors[:title]).to include("can't be blank")
    end

    it '説明が空では登録できない' do
      article = Article.new(title: 'Test title', description: nil, body: 'Test body')
      expect(article).to_not be_valid
      expect(article.errors[:description]).to include("can't be blank")
    end

    it '本文が空では登録できない' do
      article = Article.new(title: 'Test title', description: 'Test description', body: nil)
      expect(article).to_not be_valid
      expect(article.errors[:body]).to include("can't be blank")
    end
  end
end
