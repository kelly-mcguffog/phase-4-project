class ReviewsController < ApplicationController
    before_action :authorized, only: [:create, :update, :destroy]

    def create
        current_user = User.find(session[:user_id])
        new_review = current_user.reviews.create!(review_params)
        render json: new_review, status: :created
    end

    def update
        user_review.update!(review_params)
        render json: user_review, status: :ok
    end

    def destroy
        user_review.destroy
        head :no_content
    end

    private

    def review_params
        params.require(:review).permit(:comment, :rating, :book_id, :id)

    end

    def user_review
        current_user = User.find(session[:user_id])
        current_user.reviews.find(params[:id])
    end

    def authorized
        return render json: {error: "Not Authorized"}, status: :unauthorized unless session.include? :user_id
    end
end
