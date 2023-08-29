class FavoritesController < ApplicationController

    def create
        favorite = Favorite.create!(favorite_params)
        render json: favorite, status: :created
    rescue ActiveRecord::RecordInvalid => e
        render json: { errrors: e.record.errors.full_message }, status: :unprocessable_entity
    end

    def destroy
        user = User.find_by(id: params[:user_id])
        favorite = user.favorites.find_by!(spot_id: params[:spot_id])
        if favorite
            favorite.destroy
            render json: user
        else
            render json: { error: "No favorite found"}, status: :not_found
        end
    end


    private

    def favorite_params
        params.permit(:user_id, :spot_id)
    end
    
end
