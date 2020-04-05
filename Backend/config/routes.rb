Rails.application.routes.draw do
  resources :authors, only: [:index, :show]
  resources :books, only: [:index, :show]
  resources :users, only: [:index, :show, :create]
  resources :reviews, only: [:index, :show]
end
