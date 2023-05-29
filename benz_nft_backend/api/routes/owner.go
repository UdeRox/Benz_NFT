package routes

import (
	"benzNft/api/controller"
	"benzNft/infrastructure"
)

//OwnerRoute -> Route for question module
type OwnerRoute struct {
	Controller controller.OwnerController
	Handler    infrastructure.GinRouter
}

//NewOwnerRoute -> initializes new choice rouets
func NewOwnerRoute(
	controller controller.OwnerController,
	handler infrastructure.GinRouter,

) OwnerRoute {
	return OwnerRoute{
		Controller: controller,
		Handler:    handler,
	}
}

//Setup -> setups new choice Routes
func (p OwnerRoute) Setup() {
	owner := p.Handler.Gin.Group("/owners")
	{
		owner.GET("/", p.Controller.GetOwners)
		owner.POST("/", p.Controller.AddOwner)
		owner.GET("/:wallet", p.Controller.GetOwner)
		owner.DELETE("/:id", p.Controller.DeleteOwner)
		owner.PUT("/:id", p.Controller.UpdateOwner)
	}
}