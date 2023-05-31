class SessionsController < ApplicationController

    def create
      user = User.find_by(username: params[:username])
      if user && user.authenticate(params[:password])
        session[:user_id] ||= user.id
        render json: user, include: ["reviews", "reviews.book"], status: :ok
      else
        render json: { error: "Username or password not found. Please try again." }, status: :unauthorized
      end
    end
  
    def destroy
      # session.delete
      # render status: :no_content

      session.delete :user_id
      head :no_content
    end
end