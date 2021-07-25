Rails.application.routes.draw do
  resources :courses, :categories, :lessons, :users

  get "/me", to: "users#show"
  get "/usercourses", to: "courses#user_courses"
  get "/usercategories", to: "categories#user_categories"
  post "/signup", to: "users#create"
  post "/login", to: "sessions#create"
  delete "/logout", to: "sessions#destroy"
  post "/save", to: "users#save"
  
end
