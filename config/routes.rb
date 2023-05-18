Rails.application.routes.draw do
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
  
  post '/signup', to: 'users#create'
  get '/me', to: 'users#show'
  post '/login', to: 'sessions#create'
  delete '/logout', to: 'sessions#destroy'

  resources :reviews, only: [:destroy]
  resources :books, only: [:index, :show, :update, :create, :destroy] do
    resources :reviews, only: [:index, :update, :create]
  end
  
end