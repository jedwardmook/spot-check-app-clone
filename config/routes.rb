Rails.application.routes.draw do
  
  resources :favorites, only: [:create, :destroy]
  resources :reviews
  resources :spots, only: [:create, :show, :update, :destroy, :index]
  resources :users, only: [:create, :show, :update, :destroy]
  resources :sessions, only: [:create, :show, :destroy]

  patch "/users/:id/update_photo", to: "users#update_photo"
  
  # Routing logic: fallback requests for React Router.
  # Leave this here to help deploy your app later!
  get "*path", to: "fallback#index", constraints: ->(req) { !req.xhr? && req.format.html? }
end
