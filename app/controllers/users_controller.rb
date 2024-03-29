class UsersController < ApplicationController
   
    def create
        new_user = User.create!(user_params)
        session[:user_id] ||= new_user.id
        render json: new_user, serializer: UserSerializer, status: :created
    end

    def show
        user = User.find(session[:user_id])
        render json: user, serializer: UserSerializer, include: ["reviews", "reviews.book"], status: :ok
    end

    private

    def user_params
        params.permit(:name, :age, :profile_picture, :username, :password, :password_confirmation)
    end

end