Rails.application.routes.draw do
  resources :authors, only: [:index]
  resources :books, only: [:index]
  resources :readers, only: [:index]
  resources :reviews, only: [:index]
end
