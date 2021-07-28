Rails.application.routes.draw do
  resources :courses, :categories, :lessons, :users

  get "/me", to: "users#show"
  get "/courses", to: "courses#index"
  get "/categories", to: "categories#index"
  post "/signup", to: "users#create"
  post "/login", to: "sessions#create"
  post "/save", to: "users#save"
  delete "/logout", to: "sessions#destroy"
  delete "/unsave", to: "courses#unsave"
  
end
