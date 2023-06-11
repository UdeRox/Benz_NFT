package main

import (
	"benzNft/api/controller"
	"benzNft/api/repository"
	"benzNft/api/routes"
	"benzNft/api/service"
	"benzNft/infrastructure"
	"benzNft/models"
)

func init() {
	infrastructure.LoadEnv()
}

func main() {
	router := infrastructure.NewGinRouter()                     // Initialize and configure the router
	db := infrastructure.NewDatabase()                          // Initialize and configure the database
	ownerRepository := repository.NewOwnerRepository(db)        // Set up the owner repository
	ownerService := service.NewOwnerService(ownerRepository)    // Set up the owner service
	ownerController := controller.NewOwnerController(ownerService) // Set up the owner controller
	ownerRoute := routes.NewOwnerRoute(*ownerController, router)   // Initialize the owner routes
	ownerRoute.Setup()                                          // Set up the owner routes

	db.DB.AutoMigrate(&models.Owner{}, &models.Wallet{}) // Perform database migrations for Owner and Wallet models
	router.Gin.Run(":8000") // Start the server and listen on port 8000
}
