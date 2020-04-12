Rails.application.routes.draw do
  resources :authors, only: [:index, :show, :create]
  resources :books, only: [:index, :show, :create]
  resources :users, only: [:index, :show, :create]
  resources :reviews, only: [:index, :show, :create]
  resources :favorites, only: [:index, :show, :create]

  post '/login', to: 'sessions#login'
  get '/most_recent_two_reviews', to: 'reviews#most_recent_two_reviews'
end
