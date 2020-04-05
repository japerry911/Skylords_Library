Rails.application.routes.draw do
  resources :authors, only: [:index, :show]
  resources :books, only: [:index, :show]
  resources :readers, only: [:index, :show]
  resources :reviews, only: [:index, :show]
end
