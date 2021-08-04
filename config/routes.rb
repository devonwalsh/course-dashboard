Rails.application.routes.draw do
  resources :courses, :categories, :lessons, :registrations, :users

  get "/me", to: "users#show"
  post "/search", to: "courses#search"
  post "/signup", to: "users#create"
  post "/login", to: "sessions#create"
  post "/save", to: "courses#save"
  post "/unsave", to: "courses#unsave"
  delete "/logout", to: "sessions#destroy"
  
end
