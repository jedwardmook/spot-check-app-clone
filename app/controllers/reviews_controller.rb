class ReviewsController < ApplicationController

    def create
        review = Review.create!(review_params)
        render json: review, status: :created
    rescue ActiveRecord::RecordInvalid => e
        render json: { errors: e.record.errors.full_messages }, status: :unprocessable_entity
    end

    def update
        review = Review.find_by(id: params[:id])
        if review
            review.update(review_params)
            render json: review
        else
            render json: {errors: "Review not found."}, status: :not_found
        end
    end

    def destroy
        review = Review.find_by(id: params[:id])
        if review
            review.destroy
            head :no_content
        else
            render json: { errors: "Review not found"}, status: :not_found
        end
    end


    private

    def review_params
        params.permit(:spot_id, :rating, :bust_rating, :body, :user_id, :spot_name)
    end
    
end
