class ReviewsController < ApplicationController
    # before_action :user_review, only: [:update, :destroy]
    before_action :authorized, only: [:create, :update, :destroy]


    def show
        render json: user_review, status: :ok
    end

    def create
        new_review = Review.create!(review_params)
        render json: new_review, status: :created
    end

    def update
        review = user_review.update!(review_params)
        render json: review, status: :ok
    end

    def destroy
        user_review.destroy
        head :no_content
    end

    private

    def review_params
        params.permit(:comment, :rating, :user_id, :book_id)
    end

    def user_review
        current_user = User.find(session[:user_id])
        current_user.reviews.find(params[:id])
    end

    def authorized
        return render json: {error: "Not Authorized"}, status: :unauthorized unless session.include? :user_id
    end
end
