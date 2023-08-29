class SpotsController < ApplicationController

    def create
        spot = Spot.create!(spot_params)
        spot.images.attach(params[:images])
        render json: spot, status: :created
    rescue ActiveRecord::RecordInvalid => e
        render json: { errors: e.record.errors.full_messages }, status: :unprocessable_entity
    end

    def show
        spot = Spot.find_by(id: params[:id])
        if spot
            render json: spot
        else
            render json: {errors: "Spot not found"}, status: :not_found
        end
    end

    def index 
        spots = Spot.all
        render json: spots
    end

    def update
        spot = Spot.find_by(id: params[:id])
        if spot
            spot.update(spot_params)
            spot.images.attach(params[:images])
            render json: spot, status: :accepted
        else
            render json: {errors: "Spot not found"}, status: :not_found
        end
    end

    def destroy
        spot = Spot.find_by(id: params[:id])
        if spot
            spot.destroy
            head :no_content
        else
            render json: {errors: "Spot not found"}, status: :not_found
        end
    end
    
    private 

    def spot_params
        params.require(:spot).permit(:name, :lat, :lng, :about, :user_id, :address, :flat_bar, :handrail, :manual_pad, :gap, :ledge, :transition, :bank, :stairs, images: [])
    end

end
