Rails.application.routes.draw do
  devise_for :users
  root 'home#index'

  resources :articles, except: [:show]
  get '/article/:id', to: 'articles#show', as: 'show_article'
  resources :users, only: :show
  get "up" => "rails/health#show", as: :rails_health_check
end
