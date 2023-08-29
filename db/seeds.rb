User.destroy_all
User.reset_pk_sequence
Spot.destroy_all
Spot.reset_pk_sequence
Review.destroy_all
Review.reset_pk_sequence
Favorite.destroy_all
Favorite.reset_pk_sequence

puts "seeding"

user1 = User.create!(username: "tpuddd", password: "torey", password_confirmation: "torey", name: "Torey Pudwill", bio: "Teenage prodigy, game-changing video star, entrepreneur, all round advert for all that's great about skateboarding – Torey Pudwill is all these.")
user1.photo.attach(io: File.open(Rails.root.join('client', 'src', 'images', 'Users', 'torey-pudwill.avif')), filename: 'torey-pudwill.avif', content_type: "application/avif")

user2 = User.create!(username: "bigboyfoy", password: "jamie", password_confirmation: "jamie", name: "Jamie Foy", bio: "Hailing from Florida, USA, Jamie Foy is the 2017 Skater of the Year and a handrail innovator with a style all of his own.")
user2.photo.attach(io: File.open(Rails.root.join('client', 'src', 'images', 'Users', 'jamie-foy-portrait.avif')), filename: 'jamie-foy-portrait.avif', content_type: "application/avif")

user3 = User.create!(username: "johnemook", password: "passwort", password_confirmation: "passwort", name: "John Mook", bio: "I made this.")
user3.photo.attach(io: File.open(Rails.root.join('client', 'src', 'images', 'Users', 'johnny.jpeg')), filename: 'johnny.jpeg', content_type: "application/jpeg")

spot1 = Spot.create!(name: "Roberto Clemente", about: "High school that seems to allow skating. A lot of different ledges and stair sets. People will bring things to skate and leave behind.", user_id: user1.id, lat: 41.90259155680071, lng: -87.6852999486566, address: "2235 W Division St, Chicago, IL 60622, USA", flat_bar: false, handrail: true, manual_pad: true, gap: true, ledge: true, transition: false, bank: true, stairs: true)
spot1.images.attach(io: File.open(Rails.root.join('client', 'src', 'images', "RobertoClemente", 'outledge.jpeg')), filename: 'outledge.jpeg', content_type: "application/jpeg")
spot1.images.attach(io: File.open(Rails.root.join('client', 'src', 'images', "RobertoClemente", 'ramptoramp.jpeg')), filename: 'ramptoramp.jpeg', content_type: "application/jpeg")
spot1.images.attach(io: File.open(Rails.root.join('client', 'src', 'images', "RobertoClemente", 'frontledge.jpeg')), filename: 'frontledge.jpeg', content_type: "application/jpeg")
spot1.images.attach(io: File.open(Rails.root.join('client', 'src', 'images', "RobertoClemente", 'crooked.jpeg')), filename: 'crooked.jpeg', content_type: "application/jpeg")
spot1.images.attach(io: File.open(Rails.root.join('client', 'src', 'images', "RobertoClemente", 'jumpramp.jpeg')), filename: 'jumpramp.jpeg', content_type: "application/jpeg")

spot2 = Spot.create!(name: "Chase Bank Plaza", about: "Sunken plaza spot with stairs, ledges, wallrides, and more downtown." , user_id: user2.id, lat: 41.881544034764644, lng: -87.62952559295228, address: "30 S Dearborn St, Chicago, IL 60603, USA", flat_bar: true, handrail: true, manual_pad: false, gap: true, ledge: true, transition: false, bank: false, stairs: true)
spot2.images.attach(io: File.open(Rails.root.join('client', 'src', 'images', "ChaseBank", 'ledges.jpeg')), filename: 'ledges.jpeg', content_type: "application/jpeg")
spot2.images.attach(io: File.open(Rails.root.join('client', 'src', 'images', "ChaseBank", 'flatbar.jpeg')), filename: 'flatbar.jpeg', content_type: "application/jpeg")
spot2.images.attach(io: File.open(Rails.root.join('client', 'src', 'images', "ChaseBank", 'rails-ledge.jpeg')), filename: 'rails-ledges.jpeg', content_type: "application/jpeg")

spot3 = Spot.create!(name: "Slappy Curb", about: "Very minimal spot. Waxed curbs right off the 606 outside of Orkenoy." , user_id: user2.id, lat: 41.913558348335094, lng: -87.71140322541498, address: "1759 N Kimball Ave, Chicago, IL 60647, USA", flat_bar: false, handrail: false, manual_pad: true, gap: false, ledge: true, transition: false, bank: false, stairs: false)
spot3.images.attach(io: File.open(Rails.root.join('client', 'src', 'images', "SlappyCurb", 'curbs.webp')), filename: 'curbs.webp', content_type: "application/webp")

spot4 = Spot.create!(name: "Logan Skatepark", about: "Prefab park in disrepair. Pretty gross from the pigeons." , user_id: user1.id, lat: 41.928544012065, lng: -87.68922551261926, address: "Logan Blvd. Skate Park, 2430 W Logan Blvd, Chicago, IL 60647, USA", flat_bar: true, handrail: true, manual_pad: true, gap: false, ledge: true, transition: true, bank: true, stairs: true)
spot4.images.attach(io: File.open(Rails.root.join('client', 'src', 'images', "LoganSkatepark", 'spine-view.jpeg')), filename: 'spine-view.jpeg', content_type: "application/jpeg")
spot4.images.attach(io: File.open(Rails.root.join('client', 'src', 'images', "LoganSkatepark", 'curvedrail-view.jpeg')), filename: 'curvedrail-view.jpeg', content_type: "application/jpeg")
spot4.images.attach(io: File.open(Rails.root.join('client', 'src', 'images', "LoganSkatepark", 'speedbump.jpeg')), filename: 'speedbump.jpeg', content_type: "application/jpeg")

spot5 = Spot.create!(name: "Grant Skatepark", about: "Newer style plaza park in Grant Park, set up with almost anything you could want." , user_id: user3.id, lat: 41.86872145996698, lng: -87.62263543708693, address: "Grant Skate Park, 1135 S Michigan Ave, Chicago, IL 60605, USA", flat_bar: true, handrail: true, manual_pad: true, gap: true, ledge: true, transition: true, bank: true, stairs: true)
spot5.images.attach(io: File.open(Rails.root.join('client', 'src', 'images', "GrantSkatepark", 'FromStairs.jpeg')), filename: 'FromStairs.jpeg', content_type: "application/jpeg")
spot5.images.attach(io: File.open(Rails.root.join('client', 'src', 'images', "GrantSkatepark", 'opposite_side.jpeg')), filename: 'opposite_side.jpeg', content_type: "application/jpeg")
spot5.images.attach(io: File.open(Rails.root.join('client', 'src', 'images', "GrantSkatepark", 'manualpad.jpeg')), filename: 'manualpad.jpeg', content_type: "application/jpeg")
spot5.images.attach(io: File.open(Rails.root.join('client', 'src', 'images', "GrantSkatepark", 'aerial.jpeg')), filename: 'aerial.jpeg', content_type: "application/jpeg")

Review.create!(spot_name:"Slappy Curb", body:"Really not much here but still pretty fun. Good spot to warm up.", spot_id: spot3.id , user_id: user3.id, rating: 3, bust_rating: 1)
Review.create!(spot_name:"Slappy Curb", body:"Bored, but I got a nice coffee.", spot_id: spot3.id , user_id: user1.id, rating: 2, bust_rating: 2)
Review.create!(spot_name:"Grant Skatepark", body:"Super fun. Some real rippers here. Kind of a lot of people.", spot_id: spot5.id , user_id: user3.id, rating: 5, bust_rating: 1)
Review.create!(spot_name:"Grant Skatepark", body:"Has everything, including a lot of people in the way.", spot_id: spot5.id , user_id: user2.id, rating: 4, bust_rating: 0)
Review.create!(spot_name:"Logan Skatepark", body:"Pretty gross.", spot_id: spot4.id , user_id: user2.id, rating: 3, bust_rating: 0)
Review.create!(spot_name:"Logan Skatepark", body:"It's close to me so I skate it but definitely could use some love.", spot_id: spot4.id , user_id: user3.id, rating: 3, bust_rating: 1)
Review.create!(spot_name:"Chase Bank Plaza", body:"Fun spot. But I was there during the day and got moved along pretty quick", spot_id: spot2.id , user_id: user2.id, rating: 4, bust_rating: 3)
Review.create!(spot_name:"Chase Bank Plaza", body:"Good stuff. Nice for lines, but come at night and bring the lights.", spot_id: spot2.id , user_id: user1.id, rating: 4, bust_rating: 4)
Review.create!(spot_name:"Roberto Clemente", body:"A lot of variety. Opportunity to get creative.", spot_id: spot1.id , user_id: user1.id, rating: 4, bust_rating: 1)
Review.create!(spot_name:"Roberto Clemente", body:"Do the mellow high rail.", spot_id: spot1.id , user_id: user2.id, rating: 4, bust_rating: 1)

puts "seeded"