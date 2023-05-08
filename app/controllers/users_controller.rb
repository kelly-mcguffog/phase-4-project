class UsersController < ApplicationController
    rescue_from ActiveRecord::RecordInvalid, with: :user_data_invalid
    rescue_from ActiveRecord::RecordNotFound, with: :user_unauthorized

    def create
        new_user = User.create!(user_params)
        session[:user_id] ||= new_user.id
        render json: new_user, status: :created
    end

    def show
        render json: User.find(session[:user_id]), status: :ok
    end

    def index
        render json: User.all, status: :ok
    end

    def edit
        User.find(params[:id])
    end

    def update
        user = User.find(params[:id])
        user.update(user_params)
        render json: user
    end

    def destroy
        user = User.find(params[:id])
        user.destroy
        head :no_content
    end

    private

    def user_params
        params.permit(:name, :age, :profile_picture, :username, :password, :password_confirmation, :user)
    end

    def user_data_invalid(error_hash)
        render json: { errors: error_hash.record.errors.full_messages }, status: :unprocessable_entity
    end
    def user_unauthorized
        render json: { error: "Please login to view your this page." }, status: :unauthorized
    end
end