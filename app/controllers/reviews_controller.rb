class ReviewsController < ApplicationController
    def index
        render json: Review.all, status: :ok
    end
    def show
        review = Review.find(params[:id])
        render json: review, status: :ok
    end
    def create
        new_review = Review.create!(review_params)
        render json: new_review, status: :created
    end

    def edit
        Review.find(params[:id])
    end
    def update
        review = Review.find(params[:id])
        review.update(review_params)
        render json: review, status: :ok
    end

    def destroy
        review = Review.find(params[:id])
        review.destroy
        head :no_content
    end

    private

    def review_params
        params.permit(:comment, :rating, :user_id, :book_id)
    end
end
