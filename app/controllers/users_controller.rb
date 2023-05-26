class UsersController < ApplicationController
   
    def create
        new_user = User.create!(user_params)
        session[:user_id] ||= new_user.id
        render json: new_user, status: :created
    end

    def show
        user = User.find(session[:user_id])
        render json: user, include: ["reviews", "reviews.book"], status: :ok
    end

    def destroy
        user = User.find(params[:id])
        user.destroy
        head :no_content
    end

    private

    def user_params
        params.permit(:name, :age, :profile_picture, :username, :password, :password_confirmation)
    end

end