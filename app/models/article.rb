class Article < ApplicationRecord
  validates :title, presence: true
  validates :description, presence: true
  validates :body, presence: true
end
