Rails.application.routes.draw do
  resources :authors, only: [:index, :show]
  resources :books, only: [:index, :show]
  resources :users, only: [:index, :show, :create]
  resources :reviews, only: [:index, :show]
  post '/login', to: 'sessions#login'
  get '/most_recent_review', to: 'reviews#most_recent_review'
end
