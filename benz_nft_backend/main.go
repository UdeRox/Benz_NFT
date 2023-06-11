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
	router := infrastructure.NewGinRouter()                        //router has been initialized and configured
	db := infrastructure.NewDatabase()                             // database has been initialized and configured
	ownerRepository := repository.NewOwnerRepository(db)           // repository are being setup
	ownerService := service.NewOwnerService(ownerRepository)       // service are being setup
	ownerController := controller.NewOwnerController(ownerService) // controller are being set up
	ownerRoute := routes.NewOwnerRoute(ownerController, router)    // post routes are initialized
	ownerRoute.Setup()                                             // post routes are being setup

	db.DB.AutoMigrate(&models.Owner{}) // migrating Post model to database table
	router.Gin.Run(":8000")            //server started on 8000 port

}
