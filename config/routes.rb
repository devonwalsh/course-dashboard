Rails.application.routes.draw do
  resources :courses, :categories, :lessons, :registrations, :users

  get "/me", to: "users#show"
  post "/search", to: "courses#search"
  post "/signup", to: "users#create"
  post "/login", to: "sessions#create"
  delete "/logout", to: "sessions#destroy"
  
end
