class ReviewsController < ApplicationController
    def index
        render json: Review.all, status: :ok
    end
    def show
        review = Review.find(params[:id])
        render json: review
    end
    def create
        new_review = Review.create!(review_params)
        render json: new_review, status: :created
    end

    def update
        review = Review.find(params[:id])
        review.update(review_params)
        render json: review
    end

    def destroy
        review = Review.find(params[:id])
        if review
          review.destroy
          head :no_content
        else
          render json: {error: "review not found"}, status: :not_found
        end
    end

    private

    def review_params
        params.permit(:comment, :rating, :user_id, :book_id)
    end
end
