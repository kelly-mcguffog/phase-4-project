Rails.application.routes.draw do
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
  post '/signup', to: 'users#create'
  get '/me', to: 'users#show'
  post '/login', to: 'sessions#create'
  delete '/logout', to: 'sessions#destroy'
  get '/books', to: 'books#index' 
  get '/books/:id', to: 'books#show'
  post '/books/:id/reviews', to: 'reviews#create'
  get '/reviews', to: 'reviews#index'
  # get '/books/:book_id/reviews', to: 'reviews#show'
  patch '/books/:book_id/reviews/:id', to: 'reviews#update'
  delete '/books/:book_id/reviews/:id', to: 'reviews#destroy'



  # resources :books, only: [:index, :show, :create, :update, :destroy]
  # get '/reviews', to: 'reviews#index'
  # get '/reviews/:id', to: 'reviews#show'
  
end