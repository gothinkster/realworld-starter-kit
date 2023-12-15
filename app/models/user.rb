class User < ApplicationRecord
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable, :trackable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :validatable
  validates :username, presence: true, length: { in: 3..15, message: 'must be between 3 and 15 characters' }
  validates :email, presence: true, uniqueness: true

  has_many :articles
end
