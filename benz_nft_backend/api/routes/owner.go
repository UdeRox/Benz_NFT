package routes

import (
	"benzNft/api/controller"
	"benzNft/infrastructure"
)

// OwnerRoute -> Route for question module
type OwnerRoute struct {
	Controller controller.OwnerController
	Handler    infrastructure.GinRouter
}

// NewOwnerRoute -> initializes new choice rouets
func NewOwnerRoute(
	controller controller.OwnerController,
	handler infrastructure.GinRouter,

) OwnerRoute {
	return OwnerRoute{
		Controller: controller,
		Handler:    handler,
	}
}

// Setup -> setups new choice Routes
func (p OwnerRoute) Setup() {
	owner := p.Handler.Gin.Group("/owners")
	{
		owner.POST("/", p.Controller.AddOwner)
		owner.GET("", p.Controller.GetOwner)
		owner.PUT("/", p.Controller.UpdateOwner)
		owner.POST("/receipt", p.Controller.UpdateMintedReceipt)
	}
}
