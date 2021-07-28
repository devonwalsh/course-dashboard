Rails.application.routes.draw do
  resources :courses, :categories, :lessons, :users

  get "/me", to: "users#show"
  get "/courses", to: "courses#index"
  get "/user_courses", to: "courses#user_courses"
  get "/categories", to: "categories#index"
  post "/signup", to: "users#create"
  post "/login", to: "sessions#create"
  post "/save", to: "courses#save"
  delete "/logout", to: "sessions#destroy"
  delete "/unsave", to: "courses#unsave"
  
end
