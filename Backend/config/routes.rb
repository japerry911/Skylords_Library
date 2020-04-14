Rails.application.routes.draw do
  resources :authors, only: [:index, :show, :create]
  resources :books, only: [:index, :show, :create]
  resources :users, only: [:index, :show, :create, :update]
  resources :reviews, only: [:index, :show, :create, :destroy]
  resources :favorites, only: [:index, :show, :create, :destroy]

  post '/login', to: 'sessions#login'
  get '/most_recent_five_reviews', to: 'reviews#most_recent_five_reviews'
end
