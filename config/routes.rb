Rails.application.routes.draw do
  resources :sessions, only: [:create, :destroy]
  resources :users, only: [:show, :create]
  resources :courses, :categories, :lessons

  get "/me", to: "users#show"
  post "/signup", to: "users#create"
  post "/login", to: "sessions#create"
  delete "/logout", to: "sessions#destroy"
  
end
